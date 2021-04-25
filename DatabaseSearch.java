import java.sql.*;
import java.util.Scanner;
import java.util.ArrayList;

public class DatabaseSearch 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    static String connectionURL = "jdbc:sqlserver://localhost:1433;databaseName=CS380_Test2;integratedsecurity=true";
    
    // used to establish the driver location
    static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    public static void main(String[] args)
    {
        Scanner scan = new Scanner(System.in);

        ArrayList<String> recipes = selectAllRecipes();
        ArrayList<String> ingredients = selectAllIngredients();
        ArrayList<String> ingredientsToLookFor = new ArrayList<String>();
        
        System.out.println("What ingredients do you want to look for? (Enter nothing to finish the list)");
        for (String x : ingredients)
        {
            System.out.println(x);
        }
        System.out.println("--------------------------------------------------------------------------------------------");

        while (true)
        {
            String input = scan.nextLine();

            if (input.equals(""))
                break;
            else
                ingredientsToLookFor.add(input);
        }

        ArrayList<String> recipesFound = new ArrayList<String>();

        for (int i = 0, recNum = 0; i < recipes.size(); i++)
        {
            for (int j = 0; j < ingredientsToLookFor.size(); j++)
            {
                String name = findIngredientsInRecipe(ingredientsToLookFor, recipes.get(i));

                if (!name.equals(""))
                {
                    if (recNum == 0)
                    {
                        recipesFound.add(recNum, name);
                        recNum++;
                    }
                    else if (recipesFound.get(recNum - 1).equals(name))
                        continue;
                    else
                    {
                        recipesFound.add(recNum, name);
                        recNum++;
                    }
                }
            }
        }

        if (recipesFound.isEmpty())
            System.out.println("No recipes are able to be made with the ingredients requested");
        else
        {
            System.out.println("The recipe(s) that can be made with the requested ingredients are: ");
            for (String x : recipesFound)
                System.out.println(x);
        }
        


        scan.close();
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
            String query = "SELECT ingredientName FROM Ingredients;";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    ingredients.add(result.getString(1));
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

    // finds all recipeNames in the database
    static ArrayList<String> selectAllRecipes()
    {
        ArrayList<String> recipes = new ArrayList<String>();
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query string
            String query = "SELECT recipeName FROM Recipes;";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    recipes.add(result.getString(1));
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

    // counts all ingredients in a given recipe
    static int countIngredientsInRecipe(String recipeName)
    {
        //recipeName = "'" + recipeName + "'";        
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {            
            Class.forName(className);

            // query string
            String query = "SELECT COUNT(ingredientId) AS numIngredients " 
            + "FROM Recipes INNER JOIN RI ON Recipes.recipeId = RI.recipeId "
            + "WHERE Recipes.recipeName = ?;";

            // execute statement and print result
            try (PreparedStatement statement = connection.prepareStatement(query))
            {
                statement.setString(1, recipeName);

                ResultSet result = statement.executeQuery();

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

    // searches for ingredients in a given recipe. Returns the recipe name
    static String findIngredientsInRecipe(ArrayList<String> ingredients, String recipeName)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {            
            Class.forName(className);

            int numIngredients = countIngredientsInRecipe(recipeName);

            // prepared statement string
            String query = "SELECT Ingredients.ingredientName " +
            " FROM (Recipes INNER JOIN RI ON Recipes.recipeId = RI.recipeId) INNER JOIN Ingredients ON  RI.ingredientId = Ingredients.ingredientId " +
            " WHERE recipeName = ? AND Ingredients.ingredientName = ?;";

            try (PreparedStatement statement = connection.prepareStatement(query))
            {
                int ingredientsFound = 0;
                // look for ingredients in the current recipe
                for (int i = 0; i < ingredients.size(); i++)
                {
                    String curIngredient = ingredients.get(i);
                    statement.setString(1, recipeName);
                    statement.setString(2, curIngredient);
                    ResultSet result = statement.executeQuery();

                    while (result.next())
                    {
                        if (!result.getString(1).equals(""))
                        {
                            ingredientsFound++;
                        }
                    }   
                }

                if (ingredientsFound == numIngredients)
                {
                    return recipeName;
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
}
