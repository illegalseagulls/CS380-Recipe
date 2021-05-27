-- Count how many ingredients are in a recipe
SELECT recipeId, COUNT(ingredientId) AS numIngredients
FROM RI 
GROUP BY recipeId;

-- Find the ingredient name
CREATE PROCEDURE findIngredient @name NVARCHAR(max)
AS
SELECT * FROM Ingredients WHERE ingredientName = @name;
GO 

-- Find the recipe name
CREATE PROCEDURE findRecipeName @ingName NVARCHAR(max)
AS
SELECT recipeName 
FROM (Ingredients INNER JOIN RI ON Ingredients.ingredientId = RI.ingredientId)
INNER JOIN Recipes ON RI.recipeId = Recipes.recipeId
WHERE Ingredients.ingredientName = @ingName;
GO