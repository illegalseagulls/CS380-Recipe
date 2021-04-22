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
      
      String ingredientList[] = str.split(",");
      
      int ingredientInt[] = new int[ingredientList.length];
      
      for (int i = 0; i<ingredientList.length; i++) {
         if (ingredientList[i].equals("milk")) {
            ingredientInt[i] = 1;
         }
         else if(ingredientList[i].equals("pasta")) {
            ingredientInt[i] = 2;
         }
         else if(ingredientList[i].equals("cheese")) {
            ingredientInt[i] = 3;
         }
         else if(ingredientList[i].equals("oil")) {
            ingredientInt[i] = 4;
         }
         else if(ingredientList[i].equals("chocolate chips")) {
            ingredientInt[i] = 5;
         }
         else if(ingredientList[i].equals("flour")) {
            ingredientInt[i] = 6;
         }
         else if(ingredientList[i].equals("sugar")) {
            ingredientInt[i] = 7;
         }
         else if(ingredientList[i].equals("nuts")) {
            ingredientInt[i] = 8;
         }
         else if(ingredientList[i].equals("vanilla")) {
            ingredientInt[i] = 9;
         }
         else if(ingredientList[i].equals("salt")) {
            ingredientInt[i] = 10;
         }
         else if(ingredientList[i].equals("pepper")) {
            ingredientInt[i] = 11;
         }
         else if(ingredientList[i].equals("chicken")) {
            ingredientInt[i] = 12;
         }
         else if(ingredientList[i].equals("water")) {
            ingredientInt[i] = 13;
         }
         else if(ingredientList[i].equals("rice")) {
            ingredientInt[i] = 14;
         }
         else {
            System.out.println("Ingredient "+ingredientList[i]+" not found.");
         }
         
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
               recipeID[1] = 1;
         }
         else if (ingredientInt[i] == 5 || ingredientInt[i] == 6 || ingredientInt[i] == 7 || ingredientInt[i] == 8 || ingredientInt[i] == 9) {
               recipeID[2] = 1;
         }
         else if (ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] == 12 || ingredientInt[i] == 13 || ingredientInt[i] == 14) {
               recipeID[3] = 1;
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