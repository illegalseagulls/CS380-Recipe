import java.sql.*;

public class CreateDatabase 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    // starts with no database name, will be updated after database is created
    private static String URL = "jdbc:mysql://localhost:3307";
    private static String user = "root";
    private static String pass = "root";

    // creates a database with user input for the name, then fills the database with tables.
    public void createDatabase()
    {
        try (Connection connection = DriverManager.getConnection(URL, user, pass))
        {
            //Class.forName(className);

            String create = "CREATE DATABASE IF NOT EXISTS RecipeFinder";

            try (Statement statement = connection.createStatement())
            {
                statement.executeUpdate(create);

                // update connectionURL
                URL = "jdbc:mysql://localhost:3307/RecipeFinder";
                System.out.println("Database created successfully!");

                // create the tables
                createTables();
            }

            connection.close();
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    // method to create the tables necessary for the database
    private void createTables()
    {
        // connect to database
        try (Connection connection = DriverManager.getConnection(URL, user, pass))
        {
            //Class.forName(className);

            // query Strings
            String recipes = "CREATE TABLE IF NOT EXISTS Recipes (" + 
            "recipeId INT NOT NULL, recipeName NVARCHAR(100), PRIMARY KEY (recipeId)" +
            ");";

            String ingredients = "CREATE TABLE IF NOT EXISTS Ingredients (" + 
            "ingredientId INT NOT NULL, ingredientName NVARCHAR(100), PRIMARY KEY (ingredientId)" +
            ");";

            String ri = "CREATE TABLE IF NOT EXISTS RI (" + 
            "ingredientName NVARCHAR(100), ingredientId INT, recipeId INT, FOREIGN KEY (ingredientId) REFERENCES Ingredients(ingredientId), " + 
            "FOREIGN KEY (recipeId) REFERENCES Ingredients(recipeId)" +
            ");";

            try (Statement stmt = connection.createStatement()/*; Statement stmt2 = connection.createStatement(); Statement stmt3 = connection.createStatement()*/)
            {
                // run the queries
                stmt.executeUpdate(recipes);
                stmt.executeUpdate(ingredients);
                stmt.executeUpdate(ri);

                System.out.println("Table creation complete!");
            }

            connection.close();
        }

        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
