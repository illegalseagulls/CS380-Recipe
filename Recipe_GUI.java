// Kahle Broadnax
// George Kim

import java.util.*;
public class Recipe_GUI {


   //method for obtaining string ingredients
   public static String getIngredient() {
   
      System.out.println("What ingredient(s) would you like to search for? Use commas and no spaces to separate ingredients and amount separated with :");
      
      Scanner sc = new Scanner(System.in);   
      String str = sc.nextLine();
      
      sc.close();
      
   
      System.out.println("Ingredients entered, performing conversion and check");
      
      return str;
   }
   
   //method for comma seperating ingredients, and converting into a list of predefined integers
    public static Map<String,Integer> checkIngredient(String str) {
      
        str = str.toLowerCase();
        str = str.replaceAll("\\s+","");
        String ingredientList[] = str.split(",");

        HashMap<String,Integer> userInput = new HashMap<String,Integer>();//used to stored temp value of userInput

        for (String part : ingredientList) { //to split the string and digit from array

            String userData[] = part.split(":");

            String ingreName = userData[0].trim();
            int ingreAmount = Integer.parseInt(userData[1].trim());

            userInput.put(ingreName, ingreAmount); // added each ingredients to hashmap with amount
        }
        ingredientList= userInput.keySet().toArray(new String[0]); // added keys of hashmap into array

        LinkedHashSet<String> ingredientI= new LinkedHashSet<String>(); //The temp list of ingredients in the database
        HashMap<String,Integer> ingredientR= new HashMap<String,Integer>(); // The hashmap of usable ingredients <String usable ingredients, amount of said ingredient>

        ingredientI.add("milk"); // temp addition into temp database.
        ingredientI.add("pasta");
        ingredientI.add("cheese");
        ingredientI.add("oil");
        ingredientI.add("chocolatechips");
        ingredientI.add("flour");
        ingredientI.add("sugar");
        ingredientI.add("nuts");
        ingredientI.add("vanilla");
        ingredientI.add("salt");
        ingredientI.add("pepper");
        ingredientI.add("chicken");
        ingredientI.add("water");
        ingredientI.add("rice");

        for (int i = 0; i<ingredientList.length; i++) { //checks if ingredient is in database
            if(ingredientI.contains(ingredientList[i])) {
                if(ingredientR.containsKey(ingredientList[i]))
                    ingredientR.put(ingredientList[i],ingredientR.get(ingredientList[i])+ userInput.get(ingredientList[i]));//adds into hashmap with amounts
                else
                    ingredientR.put(ingredientList[i],0+ userInput.get(ingredientList[i]));// if there is no ingredient key then add one with ingredient amount.
            }
            else System.out.println("Ingredient "+ingredientList[i]+" not found.");//in cases where not found

        }

        System.out.println("Ingredient conversion and check complete");
        return ingredientR;
   }
   
   //method for determining the recipe(s) to display
   //currently placeholder inclusive (ingredients 1-4 refer to recipe 1, ingredients 5-9 refer to recipe 2, ingredients 10-14 refer to recipe 3)
   public static String[] getRecipe(Map<String,Integer> userList) {
   
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
        Map<String,Integer> test2 = checkIngredient(test);
        String[] test3 = getRecipe(test2);

   
   }

}
