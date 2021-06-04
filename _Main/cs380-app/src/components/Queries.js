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

function getRecipeIngredients(recId) {
  return db.collection('recipes').doc(recId).get().then(snapshot => {
    return snapshot.get('ingredients');
  })
}

// function to add a recipe and it's ingredient list to firestore
// input: (str, str[], str)
export async function addRecipe(recipeName, ingredientList, dir) {

  // adds recipe to recipes collection

  // get userId
  var arr = await getUserId();
  var custUId = arr[0];

  var newIngredients = [];
  for (var i = 0; i < ingredientList.length; i++) {
    var splitIndex = ingredientList[i].indexOf(' ', ingredientList[i].indexOf(' ') + 1);
    var tempAmt = ingredientList[i].slice(0, splitIndex + 1);
    var tempName = ingredientList[i].slice(splitIndex + 1, ingredientList[i].length);
    var amt = tempAmt.trim();
    var name = tempName.trim().toLowerCase();
    newIngredients.push(amt + ' ' + name);
  }

  // add to recipes collection
  db.collection('recipes').add({
    recipeName: recipeName.toLowerCase(),
    userId: custUId,
    directions: dir,
    ingredients: newIngredients
  });

  alert("Recipe added to Database!")
} // end addRecipe

// input: str []
// searches whole database
export async function findIngredientsInRecipe(ingredientList) {

  // get all recipes
  var recArr = await getAllRecipeNames();
  var recipeIds = await getAllRecipeId();

  // split ingredient list
  /*
  var ingArr = [];
  for (var i = 0; i < ingredientList.length; i++) {
    var splitIndex = ingredientList[i].indexOf(' ', ingredientList[i].indexOf(' ') + 1);
    var tempName = ingredientList[i].slice(splitIndex + 1, ingredientList[i].length);
    var name = tempName.trim();

    ingArr.push(name);
  }*/

  // get ingredient list of a recipe. Check if ingredients are found

  var idsFound = []
  // loops through recipes
  for (var i = 0; i < recipeIds.length; i++) {
    var tempRecIngredients = await getRecipeIngredients(recipeIds[i]);
    var recIngredients = [];

    // split up recIngredients properly
    for (var j = 0; j < tempRecIngredients.length; j++) {
      var splitIndex = tempRecIngredients[j].indexOf(' ', tempRecIngredients[j].indexOf(' ') + 1);
      var tempName = tempRecIngredients[j].slice(splitIndex + 1, tempRecIngredients[j].length);
      var name = tempName.trim();

      recIngredients.push(name);
    }

    var ingCountFound = 0;
    // check if ingredients are found
    for (j = 0; j < ingredientList.length; j++) {
      if (recIngredients.includes(ingredientList[j])) {
        ingCountFound++;
      }
    }

    console.log(recArr[i] + ': ' + ingCountFound + ' : ' + recIngredients.length);

    if (ingCountFound >= recIngredients.length) {
      idsFound.push(recipeIds[i]);
    }
  }

  console.log("Searched");

  var result = await getSearchedRecipesInfo(idsFound);
  return result;
} // end findIngredientsInRecipe

// input: str [], str
// searches only user's recipes
export async function findIngredientsInUsersRecipes(ingredientList, userId) {

} // end findIngredientsInUsersRecipes

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

    // remove any 0s and N/A substrings from ingredient list
    var tempIngredients = await getRecipeIngredients(recipeIdList[i]);

    var ingredientList = [];
    for (var j = 0; j < tempIngredients.length; j++) {
      var splitIndex = tempIngredients[j].indexOf(' ', tempIngredients[j].indexOf(' ') + 1);
      var tempAmt = tempIngredients[j].slice(0, splitIndex + 1);
      var tempName = tempIngredients[j].slice(splitIndex + 1, tempIngredients[j].length);

      var amt = tempAmt.trim();
      var ingName = tempName.trim();

      if (amt.substring(0) === '0') {

        if (amt.substring(ingName.indexOf(' ')) === 'N/A') {
          ingredientList.push(ingName);
        }

        else {
          ingredientList.push(amt.substring(0) + ' ' + ingName);
        }
      }
      else {
        ingredientList.push(ingName);
      }
    }

    result.push({ recipeName: name, recipeDirections: directions, ingredients: ingredientList });
  }

  console.log(result);
  return result;
}
