// Kahle Broadnax
//
import java.util.*;
import java.io.*;
public class Recipe_GUIv003B {


   //method for obtaining string ingredients
   public static String getIngredient() {
   
      System.out.println("What ingredient(s) would you like to search for? Use commas to seperate ingredients");
      
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
        
        //Ingredients added from Recipe 1, Lasagna Roll up
        ingredientI.put("lasagna",15);
        ingredientI.put("beef",16);
        ingredientI.put("marinarasauce",17);
        ingredientI.put("onion",18);
        ingredientI.put("garlic",19);
        ingredientI.put("oregano",20);
        ingredientI.put("ricotta",21);
        ingredientI.put("egg",22);
        ingredientI.put("parmesan",23);
        ingredientI.put("mozzarella",24);
        ingredientI.put("parsley",25);
        
        //Ingreidents added from Recipe 2, Chicken Tetrazzini (duplicates not included)
        //how should specific ingredients be handled, such as "cream of chicken soup"?
        ingredientI.put("linguini",26);
        ingredientI.put("butter",27);
        ingredientI.put("chickenbreast",28);
        ingredientI.put("creamofchickensoup",29);
        ingredientI.put("sourcream",30);
        ingredientI.put("chickenbroth",31);
        
        //Ingredients added from Recipe 3, Chicken Parmesan Pasta
        ingredientI.put("italianseasoning",32);
        ingredientI.put("garlicpowder",33);
        ingredientI.put("yellowonion",34);
        ingredientI.put("shortcutpasta",35);
        ingredientI.put("basil",36);
        
        //Ingredients added from Recipe 4, Ravioli Bake
        ingredientI.put("ravioli",37);
        
        //Ingredients added from Recipe 5, Shrimp Scampi
        ingredientI.put("shrimp",38);
        ingredientI.put("oliveoil",39);
        ingredientI.put("whitewine",40);
        ingredientI.put("lemon",41);
        
        //Ingredients added from Recipe 6, Coconut Shrimp
        ingredientI.put("cornstarch",42);
        ingredientI.put("vegetableoil",43);
        ingredientI.put("coconutmilk",44);
        ingredientI.put("condensedmilk",45);
        ingredientI.put("mayonnasie",46);
        
        //Ingredients added from Recipe 7, Shrimp and Broccoli
        ingredientI.put("soysauce",47);
        ingredientI.put("oystersauce",48);
        ingredientI.put("ricevinegar",49);
        ingredientI.put("sesameoil",50);
        ingredientI.put("brownsugar",51);
        ingredientI.put("sriracha",52);
        ingredientI.put("broccoli",53);
        ingredientI.put("greenonion",54);
        ingredientI.put("sesameseed",55);
        
        //Ingredients added from Recipe 8, Vanilla Crepes
        ingredientI.put("eggyolk",56);
        ingredientI.put("allpurposeflour",57);
        
        //Ingredients added from Recipe 9, Bacon
        ingredientI.put("bacon",58);
        
        //Ingredients added from Recipe 10, Garlic Naan
        ingredientI.put("whitesugar",59);
        ingredientI.put("activedryyeast",60);
        ingredientI.put("plainyogurt",61);
        ingredientI.put("breadflour",62);
        ingredientI.put("cilantro",63);
        
        

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
   //currently placeholder inclusive (ingredients refer to recipes)
   //I intended the int[] to be a true false false  (0 or 1), should it just be boolean?
   public static boolean[] getRecipe(int[] ingredientInt) {
   
      boolean recipeID[] = new boolean[10];
   
      //This method might be a bit ugly and long, but it will work
      //Brute force checks all the ingredients to see if any match the recipes
      for (int i = 0; i<ingredientInt.length; i++) {
         if (ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] >= 15 && ingredientInt[i] <= 25) {
               recipeID[0] = true; // George - caught a small bug, recipe is going out of bound should be 0-2 instead of 1-3 for arrays.
         }
         else if (ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] == 23 || ingredientInt[i] == 24 || ingredientInt[i] >= 26 && ingredientInt[i] <= 31) {
               recipeID[1] = true;
         }
         else if (ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] == 23 || ingredientInt[i] == 24 || ingredientInt[i] == 25 || ingredientInt[i] == 28
               || ingredientInt[i] == 19 || ingredientInt[i] >= 32 && ingredientInt[i] <= 36) {
               recipeID[2] = true;
         }
         else if (ingredientInt[i] == 17 || ingredientInt[i] == 23 || ingredientInt[i] == 24 || ingredientInt[i] == 37) {
               recipeID[3] = true;
         }
         else if (ingredientInt[i] == 19 || ingredientInt[i] == 32 || ingredientInt[i] == 27 || ingredientInt[i] == 23 || ingredientInt[i] == 25 || ingredientInt[i] >= 38 && ingredientInt[i] <= 41) {
               recipeID[4] = true;
         }
         else if (ingredientInt[i] == 38 || ingredientInt[i] == 10 || ingredientInt[i] == 11 || ingredientInt[i] >= 42 && ingredientInt[i] <= 46) {
               recipeID[5] = true;
         }
         else if (ingredientInt[i] == 38 || ingredientInt[i] == 42 || ingredientInt[i] >= 47 && ingredientInt[i] <= 55) {
               recipeID[6] = true;
         }
         else if (ingredientInt[i] == 56 || ingredientInt[i] == 57 || ingredientInt[i] == 1 || ingredientInt[i] == 9 || ingredientInt[i] == 10 || ingredientInt[i] == 27) {
               recipeID[7] = true;
         }
         else if (ingredientInt[i] == 58) {
               recipeID[8] = true;
         }
         else if (ingredientInt[i] >= 59 && ingredientInt[i] <= 63 || ingredientInt[i] == 10 || ingredientInt[i] == 19 || ingredientInt[i] == 27) {
               recipeID[9] = true;
         }
         else {
            System.out.println("No compatible recipes found for "+ingredientInt[i]+".");
         }
      }
  
      return recipeID;
   }
   
   public static void readRecipe(boolean[] recipeID) {
   
      //Change this directory to wherever you have the recipes stored
      File dir = new File("C:\\Users\\rhawk\\Documents\\College\\CS 380\\Code\\Sprint 1\\Sprint 1\\RecipeList");
      File[] dirListing = dir.listFiles();

      for (int i = 0; i < dirListing.length - 1; i++)
      {
        if (dirListing[i].compareTo(dirListing[i + 1]) < 0)
        {
            // swap to put them in order
            File temp = dirListing[i];
            dirListing[i] = dirListing[i + 1];
            dirListing[i + 1] = temp;
        }
      }

      File temp;
      
      //Checks if the boolean[] recipeID is true, and gets the corresponding recipe number (dirListing and recipeID are equal length)
      //Then prints out the file line by line. Does it all in one go.
      for (int i = 0; i<recipeID.length; i++) {
         if(recipeID[i] == true) {
            System.out.println();
            temp = dirListing[i];
            
            try {
               Scanner scan = new Scanner(temp);
               while(scan.hasNextLine()) {
                  String data = scan.nextLine();
                  System.out.println(data); 
               }
            
            }
            catch (FileNotFoundException e) {
               System.out.println("An error has occurred, could not find recipe file.");
               e.printStackTrace();
            }
         }//end of if statment
      }
   
   }





   public static void main(String[] args) 
   {
       /* File[] a = new File[2];
       a[0] = new File("C:\\Users\\rhawk\\Documents\\College\\CS 380\\Code\\Sprint 1\\Sprint 1\\RecipeList\\1_LasagnaRollUp.txt");
       a[1] = new File("C:\\Users\\rhawk\\Documents\\College\\CS 380\\Code\\Sprint 1\\Sprint 1\\RecipeList\\10_GarlicNaan.txt");

       System.out.println(a[0].compareTo(a[1]));

       if (a[0].compareTo(a[1]) > 0)
    {
        System.out.println(a[0] + "\n" + a[1]);
    }
    else
    {
        System.out.println(a[1] + "\n" + a[0]);
    } */
    
       String test = getIngredient();
       int[] test2 = checkIngredient(test);
       boolean[] test3 = getRecipe(test2);
       
       System.out.println("Recipe 1-10 availability:");
       for (int i = 0; i<test3.length; i++) {
          System.out.println("Recipe "+(i+1)+":"+test3[i]);
       }
       
      readRecipe(test3);
      
      }

}