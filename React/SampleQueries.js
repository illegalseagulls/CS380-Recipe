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

var recipesRef = db.collection("recipes");
var ingredientsRef = db.collection("ingredients");
var RIref = db.collection("RI");
var usersRef = db.collection("users");

function setRecipe(recipeName) {
  recipesRef.doc("Recipe2").set({
    name: "Recipe 4", recipeId: "3"
  });
}


async function getUserId() {
  // user 1 or 2's recipe
  var uId = Math.floor(Math.random() * 2) + 1;

  return db.collection('users').where('userId', '==', uId).get().then(snapshot => {
    return snapshot.docs.map(doc => doc.id);
  })
}

async function addRecipe(recipeName, ingredientList) {
  // array for ingredients
  var str = ingredientList.split(',');
  var iList = [];
  iList = iList.concat(str);

  // add recipe to database with correct user id, ingredient list, and place everything correctly into RI

  // get userId
  var arr = await getUserId();
  var custUId = arr[0];
  console.log(custUId);

  // add recipe
  db.collection("recipes").add({
    recipeName: recipeName,
    recipeId: 3,
    userId: custUId
  });

  // add ingredients to ingredients collection. Check for duplicates


}


//const auth = firebase.auth();
//const analytics = firebase.analytics();

class App extends React.Component {

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



export default App;
