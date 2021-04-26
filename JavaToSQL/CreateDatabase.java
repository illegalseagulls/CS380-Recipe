import java.sql.*;

public class CreateDatabase 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    // starts with no database name, will be updated after database is created
    // jdbc:sqlserver://localhost:1433;databaseName=<databaseName>;integratedsecurity=true
    private static String connectionURL = "jdbc:sqlserver://localhost:1433;integratedsecurity=true"; 

    // used to establish the driver location
    private static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    // creates a database with user input for the name, then fills the database with tables.
    public void createDatabase()
    {
        try
        {
            Class.forName(className);

            Connection connection = DriverManager.getConnection(connectionURL);

            String create = "CREATE DATABASE RecipeFinder";

            try (Statement statement = connection.createStatement())
            {
                statement.executeUpdate(create);

                // update connectionURL
                connectionURL = "jdbc:sqlserver://localhost:1433;databaseName=RecipeFinder;integratedsecurity=true";
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
        try (Connection connection = DriverManager.getConnection(connectionURL))
        {
            Class.forName(className);

            // query Strings
            String recipes = "CREATE TABLE Recipes (" + 
            "recipeId INT NOT NULL PRIMARY KEY, recipeName NVARCHAR(max)" +
            ");";

            String ingredients = "CREATE TABLE Ingredients (" + 
            "ingredientId INT NOT NULL PRIMARY KEY, ingredientName NVARCHAR(max)" +
            ");";

            String ri = "CREATE TABLE RI (" + 
            "ingredientName NVARCHAR(max), ingredientId INT FOREIGN KEY REFERENCES Ingredients(ingredientId), " + 
            "recipeId INT FOREIGN KEY REFERENCES Recipes(recipeId)" +
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
