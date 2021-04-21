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
INSERT INTO RI VALUES('Pasta', 1, 2);
INSERT INTO RI VALUES('Cheese', 1, 3);
INSERT INTO RI VALUES('Oil', 1, 4);

INSERT INTO RI VALUES('Chocolate Chips', 2, 5);
INSERT INTO RI VALUES('Flour', 2, 6);
INSERT INTO RI VALUES('Sugar', 2, 7);
INSERT INTO RI VALUES('Nuts', 2, 8);
INSERT INTO RI VALUES('Vanilla', 2, 9);

INSERT INTO RI VALUES('Salt', 3, 10);
INSERT INTO RI VALUES('Pepper', 3, 11);
INSERT INTO RI VALUES('Chicken', 3, 12);
INSERT INTO RI VALUES('Water', 3, 13);
INSERT INTO RI VALUES('Rice', 3, 14);
INSERT INTO RI VALUES('Oil', 3, 4);