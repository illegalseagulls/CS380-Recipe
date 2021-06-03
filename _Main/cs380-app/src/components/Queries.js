import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyA8u3UAYQmLUjVpz32DdLEuBBTt0dCS2wE",
  authDomain: "fb-recipe-app.firebaseapp.com",
  databaseURL: "https://fb-recipe-app-default-rtdb.firebaseio.com",
  projectId: "fb-recipe-app",
  storageBucket: "fb-recipe-app.appspot.com",
  messagingSenderId: "839444028341",
  appId: "1:839444028341:web:04218c1a903ea2f29d17fc",
  measurementId: "G-NM1YVGWCZY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
else {
  firebase.app();
}

require("firebase/firestore");

var db = firebase.firestore();



export function getAllRecipeNames() {
  return db.collection('recipes').get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('recipeName'));
  });
} // end getAllRecipeNames


// function to get userId
export function getUserId() {
  // user 1 or 2's recipe
  var uId = Math.floor(Math.random() * 2) + 1;

  var name;
  if (uId === 1) {
    name = 'testUser';
  }
  else {
    name = 'testUser2';
  }

  return db.collection('users').where('userName', '==', name).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
} // end getUserId

// function to get recipeId (WILL NEED TO MAKE SURE ONLY RETURNS MATCHING USER)
export function getRecipeId(recipeName) {
  return db.collection('recipes').where('recipeName', '==', recipeName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
} // end getRecipeId

// function to get ingredient id
export function getIngId(ingredientName) {
  return db.collection('ingredients').where('ingredientName', '==', ingredientName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
} // end getIngId

// checks if ingredient is already in database
function checkIfIngredientExists(name) {
  return db.collection('ingredients').where('ingredientName', '==', name.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.exists);
  })
} // end checkIfIngredientExists

// function to get ingredientCount field (WILL NEED TO MAKE SURE ONLY RETURNS MATCHING USER)
function getIngredientCount(recName) {
  return db.collection('recipes').where('recipeName', '==', recName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('ingredientCount'));
  })
} // end getIngredientCount

function isIngredientInRecipe(ingredientId, recipeId) {
  return db.collection("RI").where("ingredientId", '==', ingredientId).where("recipeId", '==', recipeId).get().then(snapshot => {
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => doc.get("ingredientName"));
    }
  });
} // end isIngredientInRecipe

function getAllRecipeId() {
  return db.collection('recipes').get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
} // end getAllRecipeId

function getAllDirections() {
  return db.collection('recipes').get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('directions'));
  })
} // end getAllDirections

function getIngredientsInRecipe(recId) {
  return db.collection('RI').where('recipeId', '==', recId).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('amount') + ' ' + doc.get('ingredientName'));
  })
} // getIngredientsInRecipe

function getRecipeName(recId) {
  return db.collection('recipes').doc(recId).get().then(snapshot => {
    return snapshot.get('recipeName');
  })
} // end getRecipeName

function getRecipeDirections(recId) {
  return db.collection('recipes').doc(recId).get().then(snapshot => {
    return snapshot.get('directions');
  })
} // end getRecipeDirections

// function to add a recipe and it's ingredient list to firestore
// input: (str, str[], str)
export async function addRecipe(recipeName, ingredientList, dir) {

  // add recipe to database with correct user id, ingredient list, and place everything correctly into RI
  // also find max id? maybe don't use pre-generated id's and instead create them myself

  // get userId
  var arr = await getUserId();
  var custUId = arr[0];

  // add recipe
  db.collection("recipes").add({
    recipeName: recipeName.toLowerCase(),
    userId: custUId,
    ingredientCount: ingredientList.length,
    directions: dir,
  });

  console.log("Recipes Collection updated!");

  // add ingredientList to ingredients collection. Check for duplicates
  for (var i = 0; i < ingredientList.length; i++) {

    var firstSpace = ingredientList[i].indexOf(' ');
    var name = ingredientList[i].slice(firstSpace + 1, ingredientList[i].length);
    var exists = await checkIfIngredientExists(name);

    if (exists[0]) {
      console.log("Ingredient already in database: " + ingredientList[i]);
    }

    else {
      db.collection("ingredients").add({
        ingredientName: name.toLowerCase(),
      });
    }
  }

  console.log("Ingredients Collection Updated");

  // add everything to RI table

  // loop through ingredientList for names.
  // find docId of both recipe and ingredients
  var tId = await getRecipeId(recipeName);
  var recId = tId[0];

  for (i = 0; i < ingredientList.length; i++) {
    firstSpace = ingredientList[i].indexOf(' ');
    var amt = ingredientList[i].slice(0, firstSpace);
    name = ingredientList[i].slice(firstSpace + 1, ingredientList[i].length);

    tId = await getIngId(name);
    var ingId = tId[0];

    db.collection('RI').add({
      ingredientName: name.toLowerCase(),
      amount: amt,
      ingredientId: ingId,
      recipeId: recId
    });
  }

  console.log("RI Collections Upgraded");
  alert("Recipe added to Database!")
} // end addRecipe

// userId is commented out since there are not any 'real' users in database. However this will need to be tracked later on
// input: str []
export async function findIngredientsInRecipe(ingredientList/*, userId*/) {

  // get the userId * TO BE UNCOMMENTED ONCE WE ADD USERS TO DATABASE *
  /*var arr = await getUserId();
  var userId = arr[0];*/

  // get all recipes
  var recArr = await getAllRecipeNames();
  var recipeIds = [];

  for (var i = 0; i < recArr.length; i++) {
    var arr = await getRecipeId(recArr[i]);
    var recId = arr[0];
    arr = await getIngredientCount(recArr[i]);
    var recipeIngCount = arr[0];
    var ingCountFound = 0;

    for (var j = 0; j < ingredientList.length; j++) {
      // ensures ingredient exists within the database
      var exists = await checkIfIngredientExists(ingredientList[j]);

      // if it does exist, then get the ingredient id and check to see if the ingredient id appears in the recipe id
      if (exists[0]) {
        arr = await getIngId(ingredientList[j]);
        var ingId = arr[0];

        // check if the ingredientId has the current recipeId, if so, store it.
        arr = await isIngredientInRecipe(ingId, recId);

        if (arr) {
          ingCountFound++;
        }
      }
    }

    console.log(recArr[i] + ": " + ingCountFound + " : " + recipeIngCount);

    // If all the ingredients in the recipe are found, return it
    if (ingCountFound >= recipeIngCount) {
      recipeIds.push(recId);
    }
  }

  console.log("Searched");

  var result = await getSearchedRecipesInfo(recipeIds);

  return result;
} // end findIngredientsInRecipe

// gets all display info
export async function getRecipeDisplayInfo() {
  // Go through recipes collection, find the document id, and grab recipeName and directions string. Then, loop through RI finding the ingredients where recipeId === recipeId

  var allRecId = await getAllRecipeId(); // all recipeIds
  var allRecName = await getAllRecipeNames(); // all recipeNames
  var allDirections = await getAllDirections(); // all directions

} // end of getRecipeDisplayInfo

// gets display info for searched recipes
export async function getSearchedRecipesInfo(recipeIdList) {

  var result = [];
  // get recipeName directions, and ingredientList
  for (var i = 0; i < recipeIdList.length; i++) {
    var name = await getRecipeName(recipeIdList[i]);
    var tempDirections = await getRecipeDirections(recipeIdList[i]);
    var directions = tempDirections.replace(/(\|)/g, '\n');
    var ingredientList = await getIngredientsInRecipe(recipeIdList[i]);
    result.push({ recipeName: name, recipeDirections: directions, ingredients: ingredientList });
  }

  console.log(result);
  return result;
}
