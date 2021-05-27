import React, {Component} from 'react';
import './App.css'
import RecipeSearch from './components/recipeSearch';
import RecipeList from './components/recipelist';

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
        <header className="App-header">
          <h1 className="App-h1">Recipe Finder</h1>
          <RecipeSearch recipeSearch={this.recipeSearch}/>
          <RecipeList recipes={this.state.recipes} />
        </header>
      </div>
    );
  }
}

export default App;
