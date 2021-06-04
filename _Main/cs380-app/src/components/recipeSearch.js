import React, { Component } from 'react';
import { findIngredientsInRecipe } from './Queries'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'


class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = { curIngredient: '', ingredientList: [], recipesToDisplay: [] };
  }

  handleIngredientNameChange = (event) => {
    event.preventDefault();
    this.setState({ curIngredient: event.target.value });
  }

  removeIngredient(str) {
    var tempList = [...this.state.ingredientList];
    var index = tempList.indexOf(str.ingredient);
    if (index !== - 1) {
      tempList.splice(index, 1);
      this.setState({ ingredientList: tempList });
    }
  }

  handleIngredientSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    this.setState({
      ingredientList: this.state.ingredientList.concat([this.state.curIngredient]), curIngredient: ''
    });
  }

  async getRecipes() {
    var temp = await findIngredientsInRecipe(this.state.ingredientList);
    this.setState({ recipesToDisplay: temp });
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.getRecipes();
    this.setState({ ingredientList: [], curIngredient: '' })
  }

  render() {
    return (
      <React.Fragment>

        <div style={{ position: 'fixed', left: 100, padding: 0, margin: 0, overflowY: 'scroll', width: '100%', height: '100%' }}>
          <h1 style={{ marginRight: 125 }}>Search Recipe based on Ingredients</h1>
          {/* Ingredient Input */}
          <div className="topleft" style={{ display: 'inline-block', float: 'left', marginRight: 0 }}>
            <h2 style={{ marginRight: 100 }}>Input Ingredients to Search For
            <button style={{ marginLeft: 50 }} onClick={this.handleSearchSubmit}>Search</button>
            </h2>
            <div style={{ marginBottom: 30, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, height: 700, width: 600 }}>
              <form style={{ marginTop: 20 }} onSubmit={this.handleIngredientSubmit} >
                <div>
                  <label>Ingredient Name:</label>
                  <input type='text' style={{ marginLeft: 5 }} onChange={this.handleIngredientNameChange} value={this.state.curIngredient} />
                  <input type='submit' value='Add Ingredient' style={{ marginLeft: 50 }} />
                </div>
              </form>

              {/* Ingredient List display */}
              <h2>Ingredients to be Searched for:</h2>
              {this.state.ingredientList.map((ingredient) => (
                <div key={ingredient}>
                  <li key={ingredient} style={{ marginLeft: 10 }}>{ingredient}
                    <button style={{ marginLeft: 50 }} onClick={() => this.removeIngredient({ ingredient })} key={ingredient}>Remove</button>
                  </li>
                </div>
              ))}
            </div>
          </div>

          <div className="right">
            <h2 style={{ marginRight: 125 }}>Recipes found</h2>
            <div style={{ marginleft: 0, paddingleft: 0, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, width: 600, height: 700, overflowY: 'scroll' }}>

              {/* Add ternary operator to handle null */}

              {this.state.recipesToDisplay.map((element) => (
                <Accordion key={element.recipeName} style={{ marginBottom: 10 }} >
                  <AccordionSummary expandIcon={<Icon>expand_more</Icon>} style={{ backgroundColor: 'grey' }} >
                    <Typography>{element.recipeName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: 'inline-block' }}>
                    <h3>Ingredients</h3>
                    {element.ingredients.map((ingredient) => (
                      <li key={ingredient} style={{ marginLeft: 10 }}>
                        {ingredient}
                      </li>
                    ))}
                  </AccordionDetails>
                  <AccordionDetails style={{ display: 'inline-block' }}>
                    <h3>Directions</h3>
                    <Typography style={{ whiteSpace: 'pre-line' }}>
                      {element.recipeDirections}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>

          </div>
        </div>
        {/* <div>
          <form onSubmit={this.onSubmit}>
            <input type="text" name="ingredientList" value={this.state.ingredientList} onChange={this.onChange} placeholder="Type Ingredients Here Seperated by a Comma..." />
            <input type="submit" value="Submit" className="btn" />
          </form>
        </div>
        */}
      </React.Fragment>
    )
  }
}

export default RecipeSearch;
