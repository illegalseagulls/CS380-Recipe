import java.sql.*;
import java.util.Scanner;
import java.util.ArrayList;

public class SQlToJava 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    static String connectionURL = "jdbc:sqlserver://localhost:1433;databaseName=CS380_Test2;integratedsecurity=true";
    
    // used to establish the driver location
    static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    public static void main (String[] args)
    {
        Scanner scanQuery = new Scanner(System.in);
        Scanner scan = new Scanner(System.in);

        // prompt user for input and run proper query
        while (true) 
        {
            System.out.println("Which query do you want to run? (Enter -1 to exit program)" + 
                "\n1. countIngredientsInRecipe" + "\n2. findIngredient" + "\n3. findRecipeName");
            int querySelector = scanQuery.nextInt();
            
            if (querySelector == -1)
            {
                break;
            }          

            else if (querySelector == 1)
            {
                ArrayList<String> recipes = selectAllRecipes();
                System.out.println("Which recipe do you want to count the ingredients for?");
                for (int i = 0; i < recipes.size(); i++)
                {
                    System.out.println(recipes.get(i));
                }

                String input = scan.nextLine();
                int out = countIngredientsInRecipe(input);

                if (out == 0)
                {
                    System.out.println("No ingredient exists in the database");
                }

                else
                {
                    System.out.println(input + " has " + out + " ingredients");
                }

            }

            else if (querySelector == 2)
            {
                ArrayList<String> ingredients = selectAllIngredients();

                System.out.println("Which ingredient do you want to find?");
                for (int i = 0; i < ingredients.size(); i++)
                {
                    System.out.println(ingredients.get(i));
                }

                String input = scan.nextLine();
                String out = findIngredient(input);

                if (out.equals(""))
                {
                    System.out.println("No ingredient exists in the database");
                }

                else
                {
                    System.out.println(out);
                }
            }

            else if (querySelector == 3)
            {
                ArrayList<String> ingredients = selectAllIngredients();

                System.out.println("Which ingredient do you want the corresponding recipe for? ");
                for (int i = 0; i < ingredients.size(); i++)
                {
                    System.out.println(ingredients.get(i));
                }

                String input = scan.nextLine();
                String out = findRecipeName(input);

                if (out.equals(""))
                {
                    System.out.println("No ingredient exists in the database");
                }

                else
                {
                    System.out.println(out);
                }
            }

            System.out.println();
        }
        scanQuery.close();
        scan.close();
        
    }

    // counts all ingredients in a recipe
    public static int countIngredientsInRecipe(String recipeName)
    {
        recipeName = "'" + recipeName + "'";        
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {            
            Class.forName(className);

            // query string
            String query = "SELECT COUNT(ingredientId) AS numIngredients " 
            + "FROM Recipes INNER JOIN RI ON Recipes.recipeId = RI.recipeId "
            + "WHERE Recipes.recipeName = " + recipeName + ";";

            // execute statement and print result
            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    return result.getInt(1);
                }
                
            }

            connection.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return 0;
    }

    // finds an ingredient's name and key based on the name
    public static String findIngredient(String name)
    {
        name = "'" + name + "'";
        
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query string
            String query = "SELECT * FROM Ingredients WHERE ingredientName = " + name + ";";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    return result.getInt(1) + ". " + result.getString(2);
                }
            }

            connection.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return "";
    }

    // finds the recipe that an ingredient belongs to
    public static String findRecipeName(String ingredientName)
    {
        ingredientName = "'" + ingredientName + "'";

        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query string
            String query = "SELECT recipeName FROM (Ingredients INNER JOIN RI ON Ingredients.ingredientId = RI.ingredientId) "
            + "INNER JOIN Recipes ON RI.recipeId = Recipes.recipeId WHERE Ingredients.ingredientName = " + ingredientName + ";";
            
            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    return result.getString(1);
                }
            }

            connection.close();
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }

        return "";
    }

    // finds all ingredients in the database
    public static ArrayList<String> selectAllIngredients()
    {
        ArrayList<String> ingredients = new ArrayList<String>();
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query string
            String query = "SELECT * FROM Ingredients;";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    String cur = result.getInt(1) + ". " + result.getString(2);
                    ingredients.add(cur);
                }
            }

            connection.close();
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }

        return ingredients;
    }

    // finds all the recipes in the database
    public static ArrayList<String> selectAllRecipes()
    {
        ArrayList<String> recipes = new ArrayList<String>();
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query string
            String query = "SELECT * FROM Recipes;";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    String cur = result.getInt(1) + ". " + result.getString(2);
                    recipes.add(cur);
                }
            }

            connection.close();
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }

        return recipes;
    }

}
