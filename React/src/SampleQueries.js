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

async function getUserId() {
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

async function getRecipeId(recipeName) {
  return db.collection('recipes').where('recipeName', '==', recipeName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

async function getIngId(ingredientName) {
  return db.collection('ingredients').where('ingredientName', '==', ingredientName.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

async function checkIfIngredientExists(name) {
  return db.collection('ingredients').where('ingredientName', '==', name.toLowerCase()).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.exists);
  })
}

async function addRecipe(recipeName, ingredientList) {
  // array for ingredients
  var str = ingredientList.split(',');
  var iList = [];
  iList = iList.concat(str);

  // add recipe to database with correct user id, ingredient list, and place everything correctly into RI
  // also find max id? maybe don't use pre-generated id's and instead create them myself

  // get userId
  var arr = await getUserId();
  var custUId = arr[0];

  // add recipe
  db.collection("recipes").add({
    recipeName: recipeName.toLowerCase(),
    //recipeId: 3,
    userId: custUId
  });

  console.log("Recipes Collection updated!");

  // add iList to ingredients collection. Check for duplicates
  for (var i = 0; i < iList.length; i++) {

    var exists = await checkIfIngredientExists(iList[i]);

    if (exists[0]) {
      console.log("Ingredient already in database: " + iList[i]);
    }

    else {
      db.collection("ingredients").add({
        ingredientName: iList[i].toLowerCase(),
        //ingredientId: 3,
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



//const auth = firebase.auth();
//const analytics = firebase.analytics();

class SampleQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipeName: '', ingredientList: '' };

  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert('Recipe: ' + this.state.recipeName + '\nIngredients: ' + this.state.ingredientList);
    addRecipe(this.state.recipeName, this.state.ingredientList);
  };

  handleRecipeChange = (event) => {
    this.setState({ recipeName: event.target.value });
  }

  handleIngredientListChange = (event) => {
    this.setState({ ingredientList: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recipe App Skeleton</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Recipe Name:
            <input type="text" value={this.state.value} onChange={this.handleRecipeChange} />
            </label>
            {/* <input type="submit" value="Add Recipe" /> */}

            <label>
              Ingredient Name (Split each ingredient with commas):
            <textarea value={this.state.value} onChange={this.handleIngredientListChange} />
            </label>
            <input type="submit" value="Add Recipe" />

          </form>
        </div>

        {/* <div>
          <form onSubmit={this.submitIngredients}>


          </form>
        </div> */}
      </React.Fragment>
    );
  }
}



export default SampleQueries;
