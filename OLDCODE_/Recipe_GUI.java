// Kahle Broadnax
//
import java.util.*;
public class Recipe_GUI {


   //method for obtaining string ingredients
   public static String getIngredient() {
   
      System.out.println("What ingredient(s) would you like to search for? Use commas and no spaces to seperate ingredients");
      
      Scanner sc = new Scanner(System.in);   
      String str = sc.nextLine();
      
      sc.close();
      
   
      System.out.println("Ingredients entered, peforming conversion and check");
      
      return str;
   }
   
   //method for comma seperating ingredients, and converting into a list of predefined integers
   public static int[] checkIngredient(String str) {   
      
        str = str.toLowerCase();
        str = str.replaceAll("\\s+","");

        String ingredientList[] = str.split(",");
        LinkedHashSet<Integer> removeDup= new LinkedHashSet<Integer>(); //remove duplicates and ingredient not on database
        
        HashMap<String,Integer> ingredientI = new HashMap<String, Integer>();// changed to hashmap
        ingredientI.put("milk",1);
        ingredientI.put("pasta",2);
        ingredientI.put("cheese",3);
        ingredientI.put("oil",4);
        ingredientI.put("chocolatechips",5);
        ingredientI.put("flour",6);
        ingredientI.put("sugar",7);
        ingredientI.put("nuts",8);
        ingredientI.put("vanilla",9);
        ingredientI.put("salt",10);
        ingredientI.put("pepper",11);
        ingredientI.put("chicken",12);
        ingredientI.put("water",13);
        ingredientI.put("rice",14);

        for (int i = 0; i<ingredientList.length; i++) { //checks if ingredient is in database
            if(ingredientI.containsKey(ingredientList[i])) {
                removeDup.add(ingredientI.get(ingredientList[i]));//adds to hashset which removes duplicates 
            }
            else System.out.println("Ingredient "+ingredientList[i]+" not found.");//in cases where not found

        }
        int ingredientInt[]= new int[removeDup.size()];
        int index=0;
        for(Integer i : removeDup ) { // used to add the hashset values into int array.
            ingredientInt[index++] = i;
        }


        System.out.println("Ingredient conversion and check complete");

        return ingredientInt;
   }
   
   //method for determining the recipe(s) to display
   //currently placeholder inclusive (ingredients 1-4 refer to recipe 1, ingredients 5-9 refer to recipe 2, ingredients 10-14 refer to recipe 3)
   public static int[] getRecipe(int[] ingredientInt) {
   
      int recipeID[] = new int[3];
   
      for (int i = 0; i<ingredientInt.length; i++) {
         if (ingredientInt[i] == 1 || ingredientInt[i] == 2 || ingredientInt[i] == 3 || ingredientInt[i] == 4) {
               recipeID[0] = 1; // George - caught a small bug, recipe is going out of bound should be 0-2 instead of 1-3 for arrays.
         }
         else if (ingredientInt[i] == 5 || ingredientInt[i] == 6 || ingredientInt[i] == 7 || ingredientInt[i] == 8 || ingredientInt[i] == 9) {
               recipeID[1] = 1;
         }
         else if (ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] == 12 || ingredientInt[i] == 13 || ingredientInt[i] == 14) {
               recipeID[2] = 1;
         }
         else {
            System.out.println("No compatible recipes found for "+ingredientInt[i]+".");
         }
      }
  
      return recipeID;
   }



   public static void main(String[] args) {
   
   String test = getIngredient();
   int[] test2 = checkIngredient(test);
   int[] test3 = getRecipe(test2);
   
   System.out.println("Recipe 1,2 and 3 availability: "+test3[0]+", "+test3[1]+", "+test3[2]);
   
   }

}
