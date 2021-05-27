CREATE TABLE Recipes (
    recipeId INT PRIMARY KEY,
    recipeName NVARCHAR(max)
);

CREATE TABLE Ingredients (
    ingredientId INT PRIMARY KEY,
    ingredientName NVARCHAR(max)
);

CREATE TABLE RI (
    ingredientName NVARCHAR(max),
    ingredientId INT FOREIGN KEY REFERENCES Ingredients(ingredientId),
    recipeId INT FOREIGN KEY REFERENCES Recipes(recipeId)    
);


INSERT INTO Recipes VALUES(1, 'Recipe 1');
INSERT INTO Recipes VALUES(2, 'Recipe 2');
INSERT INTO Recipes VALUES(3, 'Recipe 3');

INSERT INTO Ingredients VALUES(1, 'Milk');
INSERT INTO Ingredients VALUES(2, 'Pasta');
INSERT INTO Ingredients VALUES(3, 'Cheese');
INSERT INTO Ingredients VALUES(4, 'Oil');

INSERT INTO Ingredients VALUES(5, 'Chocolate Chips');
INSERT INTO Ingredients VALUES(6, 'Flour');
INSERT INTO Ingredients VALUES(7, 'Sugar');
INSERT INTO Ingredients VALUES(8, 'Nuts');
INSERT INTO Ingredients VALUES(9, 'Vanilla');

INSERT INTO Ingredients VALUES(10, 'Salt');
INSERT INTO Ingredients VALUES(11, 'Pepper');
INSERT INTO Ingredients VALUES(12, 'Chicken');
INSERT INTO Ingredients VALUES(13, 'Water'); 
INSERT INTO Ingredients VALUES(14, 'Rice');

INSERT INTO RI VALUES('Milk', 1, 1);
INSERT INTO RI VALUES('Pasta', 2, 1);
INSERT INTO RI VALUES('Cheese', 3, 1);
INSERT INTO RI VALUES('Oil', 4, 1);

INSERT INTO RI VALUES('Chocolate Chips', 5, 2);
INSERT INTO RI VALUES('Flour', 6, 2);
INSERT INTO RI VALUES('Sugar', 7, 2);
INSERT INTO RI VALUES('Nuts', 8, 2);
INSERT INTO RI VALUES('Vanilla', 9, 2);

INSERT INTO RI VALUES('Salt', 10, 3);
INSERT INTO RI VALUES('Pepper', 11, 3);
INSERT INTO RI VALUES('Chicken', 12, 3);
INSERT INTO RI VALUES('Water', 13, 3);
INSERT INTO RI VALUES('Rice', 14, 3);
INSERT INTO RI VALUES('Oil', 4, 3);
