import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css'
import RecipeSearch from './components/recipeSearch';
import RecipeList from './components/recipelist';
import AddRecipe from './components/addRecipe'

class App extends React.Component {

  state = {
    recipes: [
      {
      name: '',
      ingredientList: []
    }
    ]
  }

  recipeSearch = (name, ingredientList) => {
    const newRecipe = {
      name: name,
      ingredientList: ingredientList
    }
    this.setState({recipes: [...this.state.recipes, newRecipe]})
  }

  render() {
    return (
      <div className="App">
      <Router>
        <nav>
          <ul>
            <li className="leftItems"><a href="/">Search Recipe</a></li>
            <li className="leftItems"><a href="/components/addRecipe">Add Recipe</a></li>
            <li className="leftItems"><a href="#">My Recipes</a></li>
            <li className="leftItems"><a href="#">Profile</a></li>
          </ul>
        </nav>
        <Route exact path="/" render={props => (
          <div>
          <h1 className="App-h1">Recipe Finder</h1>
          <header className="App-recipesearch">
            <section>
              <RecipeSearch recipeSearch={this.recipeSearch}/>
            </section>

          </header>
          </div>
        )}/>
        <Route path="/components/addRecipe" component={AddRecipe}/>
        </Router>
      </div>
    );
  }
}

export default App;
