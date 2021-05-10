import java.sql.*;

public class CreateDatabase 
{
    // use to establish a connection to the database. Replace 'databaseName' with proper database
    // starts with no database name, will be updated after database is created
    // jdbc:sqlserver://localhost:1433;databaseName=<databaseName>;integratedsecurity=true
    private static String connectionURL = "jdbc:sqlserver://127.0.0.1:1433; userName=testUser;password=testUser"; 

    // used to establish the driver location
    private static String className = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

    // creates a database with user input for the name, then fills the database with tables.
    public void createDatabase()
    {
        try
        {
            Class.forName(className);

            Connection connection = DriverManager.getConnection(connectionURL);

            String create = "IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'RecipeFinder') CREATE DATABASE RecipeFinder";

            try (Statement statement = connection.createStatement())
            {
                statement.executeUpdate(create);

                // update connectionURL
                connectionURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=RecipeFinder;userName=testUser;password=testUser";
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
            String users = "IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U')) BEGIN " +
            "CREATE TABLE Users (" + 
            "userId INT NOT NULL PRIMARY KEY, nameOfUser NVARCHAR(max)" + 
            "); END";

            String recipes = "IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Recipes]') AND type in (N'U')) BEGIN " +
            "CREATE TABLE Recipes (" + 
            "recipeId INT NOT NULL PRIMARY KEY, recipeName NVARCHAR(max), clientId INT FOREIGN KEY REFERENCES Users(userId)" +
            "); END";

            String ingredients = "IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Ingredients]') AND type in (N'U')) BEGIN " +
            "CREATE TABLE Ingredients (" + 
            "ingredientId INT NOT NULL PRIMARY KEY, ingredientName NVARCHAR(max)" +
            "); END";

            String ri = "IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RI]') AND type in (N'U')) BEGIN " +
            "CREATE TABLE RI (" + 
            "ingredientName NVARCHAR(max), ingredientId INT FOREIGN KEY REFERENCES Ingredients(ingredientId), " + 
            "recipeId INT FOREIGN KEY REFERENCES Recipes(recipeId)" +
            "); END";

            try (Statement stmt = connection.createStatement()/*; Statement stmt2 = connection.createStatement(); Statement stmt3 = connection.createStatement()*/)
            {
                // run the queries                
                stmt.executeUpdate(users);
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
