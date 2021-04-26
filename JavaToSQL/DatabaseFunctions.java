import java.sql.*;
import java.util.*;

public class DatabaseFunctions 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    private static String connectionURL = "jdbc:sqlserver://localhost:1433;databaseName=RecipeFinder;integratedsecurity=true";
    
    // used to establish the driver location
    final private static String CLASSNAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    // function to insert a new recipe into the database. Takes in the recipeName and ingredient list
    // need to check if the ingredient already exists in Ingredients. If so, then don't insert into Ingredients, but still update RI with a new connection to a recipe
    // find max key of ingredient and recipe tables
    public void insertRecipe(String recipeName, ArrayList<String> ingredients)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

            // insert statement
            String insertRec = "INSERT INTO Recipes VALUES(?,?);";
            String insertIng = "INSERT INTO Ingredients VALUES(?,?);";
            String riInsert = "INSERT INTO RI VALUES(?,?,?)";

            // loop through ingredients list, checking if the ingredient exists. If it does, don't update the Ingredients table
            try (PreparedStatement stmt1 = connection.prepareStatement(insertRec); PreparedStatement stmt2 = connection.prepareStatement(insertIng); 
                PreparedStatement stmt3 = connection.prepareStatement(riInsert))
            {
                int maxKeyRecipes = findMaxKey("Recipes") + 1;
                stmt1.setInt(1, maxKeyRecipes);
                stmt1.setString(2, recipeName);
                stmt1.executeUpdate();
                System.out.println("Recipe added to Recipes table");

                for (int i = 0; i < ingredients.size(); i++)
                {
                    // ingredient is in database
                    if (isIngredientInDatabase(ingredients.get(i)))
                    {                        
                        int ingredientKey = findIngredientKey(ingredients.get(i));
                        stmt3.setString(1, ingredients.get(i));
                        stmt3.setInt(2, ingredientKey);
                        stmt3.setInt(3, maxKeyRecipes);
                        stmt3.executeUpdate();
                        System.out.println("RI table updated");
                    }

                    // ingredient isn't in database; add it
                    else
                    {
                        int maxKeyIng = findMaxKey("Ingredients") + 1;
                        stmt2.setInt(1, maxKeyIng);
                        stmt2.setString(2, ingredients.get(i));
                        stmt2.executeUpdate();
                        System.out.println("Ingredient added to Ingredients table");

                        stmt3.setString(1, ingredients.get(i));
                        stmt3.setInt(2, maxKeyIng);
                        stmt3.setInt(3, maxKeyRecipes);
                        stmt3.executeUpdate();
                        System.out.println("RI table updated");
                    }
                }
            }
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }
    } // end insertRecipe
    
    // finds the maxKey of a given table
    private int findMaxKey(String tableName)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

            // query string
            String query= "";

            if (tableName.equals("Recipes"))
            {
                query = "SELECT MAX(recipeId) FROM Recipes;"; 
            }

            else
            {
                query = "SELECT MAX(ingredientId) FROM Ingredients;"; 
            }
            
            // run statement and return the result
            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    return result.getInt(1);
                }
            }
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }


        return 0;
    } // end findMaxKey

    // method to check if an ingredient exists in the database before adding to the Ingredients table
    // returns true if it exists
    private boolean isIngredientInDatabase(String ingredientName)
    {
        // connect to database
        try(Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

            //query string
            String query = "SELECT ingredientName FROM Ingredients WHERE ingredientName = ?;";

            try (PreparedStatement statement = connection.prepareStatement(query))
            {
                statement.setString(1, ingredientName);

                ResultSet result = statement.executeQuery();

                while(result.next())
                {
                    if (!result.getString(1).equals(""))
                        return true;
                }
            }

            connection.close();
        }

        catch(Exception e)
        {
            e.printStackTrace();
        }

        return false;
    } // end isIngredientInDatabase

    private int findIngredientKey(String ingredientName)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

            // query string
            String query = "SELECT ingredientId FROM Ingredients WHERE ingredientName = ?;";

            try (PreparedStatement statement = connection.prepareStatement(query))
            {
                statement.setString(1, ingredientName);

                ResultSet result = statement.executeQuery();

                while (result.next())
                    return result.getInt(1);
            }
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }

        return 0;
    } // end findIngredientKey

    // searches for ingredients in a given recipe. Returns the recipe name
    public String findIngredientsInRecipe(ArrayList<String> ingredients, String recipeName)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {            
            Class.forName(CLASSNAME);

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
    } // end findIngredientsInRecipe

    // finds all ingredients in the database
    public ArrayList<String> selectAllIngredients()
    {
        ArrayList<String> ingredients = new ArrayList<String>();
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

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
    } // end selectAllIngredients

    // finds all recipeNames in the database
    public ArrayList<String> selectAllRecipes()
    {
        ArrayList<String> recipes = new ArrayList<String>();
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(CLASSNAME);

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
    } // end selectAllRecipes

    // counts all ingredients in a given recipe
    private int countIngredientsInRecipe(String recipeName)
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {            
            Class.forName(CLASSNAME);

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
    } // end countIngredientsInRecipe
}
