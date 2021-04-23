import java.sql.*;
import java.util.Scanner;

public class SQlToJava 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    static String connectionURL = "jdbc:sqlserver://localhost:1433;databaseName=CS380_Test2;integratedsecurity=true";
    
    // used to establish the driver location
    static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    public static void main (String[] args)
    {
        Scanner scan = new Scanner(System.in);

        System.out.println("Which recipe do you want to count the ingredients for?");
        String input = scan.nextLine();
        countIngredientsInRecipe(input);
    }

    public static void countIngredientsInRecipe(String recipeName)
    {
        recipeName = "'" + recipeName + "'";
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            String query = "SELECT COUNT(ingredientId) AS numIngredients " 
            + "FROM Recipes INNER JOIN RI ON Recipes.recipeId = RI.recipeId "
            + "WHERE Recipes.recipeName = " + recipeName + ";";

            //String query = "SELECT * FROM Recipes;";

            try (Statement statement = connection.createStatement(); ResultSet result = statement.executeQuery(query))
            {
                while (result.next())
                {
                    System.out.println(result.getString(1));
                }
                
            }
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
