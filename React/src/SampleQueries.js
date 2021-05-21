import React from 'react';
import './App.css';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDtmo26nxOTfNtsf8tpzspZfPYH3D4ys8I",
  authDomain: "cs380-test-server.firebaseapp.com",
  projectId: "cs380-test-server",
  storageBucket: "cs380-test-server.appspot.com",
  messagingSenderId: "1039800964256",
  appId: "1:1039800964256:web:3018dc27eeafdc60b465c5",
  measurementId: "G-0FY3VXS4MX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
else {
  firebase.app();
}

require("firebase/firestore");

var db = firebase.firestore();



function getAllRecipes() {
  return db.collection('recipes').get().then(snapshot => {
    return snapshot.docs.map(doc => doc.get('recipeName'));
  });
}


// function to get userId
function getUserId() {
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
function getRecipeId(recipeName) {
  return db.collection('recipes').where('recipeName', '==', recipeName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

// function to get ingredient id
function getIngId(ingredientName) {
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
async function addRecipe(recipeName, ingredientList) {
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

function isIngredientInRecipe(ingredientId, recipeId) {
  return db.collection("RI").where("ingredientId", '==', ingredientId).where("recipeId", '==', recipeId).get().then(snapshot => {
    if (!snapshot.empty) {
      return snapshot.docs.map(doc => doc.get("ingredientName"));
    }
  });
}

// userId is commented out since there are not any 'real' users in database. However this will need to be tracked later on
async function findIngredientsInRecipe(ingredientList/*, userId*/) {
  // split ingredient list
  var str = ingredientList.split(',');
  var iList = [];
  iList = iList.concat(str);

  for (var i = 0; i < iList.length; i++) {
    str = iList[i].trim();
    iList[i] = str;
  }

  // get the userId * TO BE REMOVED ONCE WE ADD USERS TO DATABASE *
  /*var arr = await getUserId();
  var userId = arr[0];*/

  // get all recipes
  var recArr = await getAllRecipes();

  for (var i = 0; i < recArr.length; i++) {
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

        /*console.log(arr2[0]); */
        if (arr) {
          console.log('Ingredient : ' + arr[0] + " found in recipe: " + recArr[i]);
        }
      }
    }
  }

  console.log("Searched");
}

//const auth = firebase.auth();
//const analytics = firebase.analytics();

class SampleQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipeNameAdd: '', ingredientListAdd: '', ingredientListSearch: '' };

  }

  handleSubmitAdd = (event) => {
    event.preventDefault();
    alert('Recipe: ' + this.state.recipeNameAdd + '\nIngredients: ' + this.state.ingredientListAdd);
    addRecipe(this.state.recipeNameAdd, this.state.ingredientListAdd);
  };

  handleRecipeAddChange = (event) => {
    this.setState({ recipeNameAdd: event.target.value });
  }

  handleIngredientListAddChange = (event) => {
    this.setState({ ingredientListAdd: event.target.value });
  }

  handleIngredientListSearchChange = (event) => {
    event.preventDefault();
    this.setState({ ingredientListSearch: event.target.value });
  }

  handleSubmitSearch = (event) => {
    event.preventDefault();
    findIngredientsInRecipe(this.state.ingredientListSearch);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recipe App Skeleton</h1>
        <div>
          <form onSubmit={this.handleSubmitAdd}>
            <label>
              Recipe Name:
            <input type="text" value={this.state.value} onChange={this.handleRecipeAddChange} />
            </label>

            <label>
              Ingredient Name (Split each ingredient with commas):
            <textarea value={this.state.value} onChange={this.handleIngredientListAddChange} />
            </label>
            <input type="submit" value="Add Recipe" />
          </form>

          <form onSubmit={this.handleSubmitSearch}>
            <label>
              Ingredients to be searched (Split each with commas):
              <textarea value={this.state.value} onChange={this.handleIngredientListSearchChange} />
            </label>
            <input type="submit" value="Search for Ingredients" />
          </form>

        </div>
      </React.Fragment>
    );
  }
}



export default SampleQueries;
