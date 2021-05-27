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



export function getAllRecipes() {
  return db.collection('recipes').get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('recipeName'));
  });
}


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
}

// function to get recipeId
export function getRecipeId(recipeName) {
  return db.collection('recipes').where('recipeName', '==', recipeName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

// function to get ingredient id
export function getIngId(ingredientName) {
  return db.collection('ingredients').where('ingredientName', '==', ingredientName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

// checks if ingredient is already in database
function checkIfIngredientExists(name) {
  return db.collection('ingredients').where('ingredientName', '==', name.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.exists);
  })
}

// function to add a recipe and it's ingredient list to firestore
export async function addRecipe(recipeName, ingredientList) {
  // array for ingredients
  var str = ingredientList.split(',');
  var iList = [];
  iList = iList.concat(str);

  for (var i = 0; i < iList.length; i++) {
    str = iList[i].trim();
    iList[i] = str;
  }

  // add recipe to database with correct user id, ingredient list, and place everything correctly into RI
  // also find max id? maybe don't use pre-generated id's and instead create them myself

  // get userId
  var arr = await getUserId();
  var custUId = arr[0];

  // add recipe
  db.collection("recipes").add({
    recipeName: recipeName.toLowerCase(),
    userId: custUId
  });

  console.log("Recipes Collection updated!");

  // add iList to ingredients collection. Check for duplicates
  for (i = 0; i < iList.length; i++) {

    var exists = await checkIfIngredientExists(iList[i]);

    if (exists[0]) {
      console.log("Ingredient already in database: " + iList[i]);
    }

    else {
      db.collection("ingredients").add({
        ingredientName: iList[i].toLowerCase(),
      });
    }
  }

  console.log("Ingredients Collection Updated");

  // add everything to RI table

  // loop through iList for names.
  // find docId of both recipe and ingredients
  var tId = await getRecipeId(recipeName);
  var recId = tId[0];

  for (i = 0; i < iList.length; i++) {
    tId = await getIngId(iList[i]);
    var ingId = tId[0];

    db.collection('RI').add({
      ingredientName: iList[i].toLowerCase(),
      ingredientId: ingId,
      recipeId: recId
    });
  }

  console.log("RI Collections Upgraded");
}

export function isIngredientInRecipe(ingredientId, recipeId) {
  return db.collection("RI").where("ingredientId", '==', ingredientId).where("recipeId", '==', recipeId).get().then(snapshot => {
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => doc.get("ingredientName"));
    }
  });
}

// userId is commented out since there are not any 'real' users in database. However this will need to be tracked later on
export async function findIngredientsInRecipe(ingredientList/*, userId*/) {
  // split ingredient list
  var str = ingredientList.split(',');
  var iList = [];
  iList = iList.concat(str);

  for (var i = 0; i < iList.length; i++) {
    str = iList[i].trim();
    iList[i] = str;
  }

  // get the userId * TO BE UNCOMMENTED ONCE WE ADD USERS TO DATABASE *
  /*var arr = await getUserId();
  var userId = arr[0];*/

  // get all recipes
  var recArr = await getAllRecipes();

  for (i = 0; i < recArr.length; i++) {
    var arr = await getRecipeId(recArr[i]);
    var recId = arr[0];

    for (var j = 0; j < iList.length; j++) {
      // ensures ingredient exists within the database
      var exists = await checkIfIngredientExists(iList[j]);

      // if it does exist, then get the ingredient id and check to see if the ingredient id appears in the recipe id
      if (exists[0]) {
        arr = await getIngId(iList[j]);
        var ingId = arr[0];

        // check if the ingredientId has the current recipeId, if so, store it.
        arr = await isIngredientInRecipe(ingId, recId);

        if (arr) {
          console.log('Ingredient : ' + arr[0] + " found in recipe: " + recArr[i]);
        }
      }
    }
  }

  console.log("Searched");
}