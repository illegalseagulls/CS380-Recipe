import React from 'react';
import { addRecipe } from './Queries';


class AddRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeName: '', curIngredient: '', amount: '', unit: 'N/A', directions: '', databaseDirections: '',
            recipeDisplayName: '', ingredientList: [], directionDisplay: ''
        };
    }

    // Recipe Name Methods
    handleRecipeNameChange = (event) => {
        event.preventDefault();
        this.setState({ recipeName: event.target.value })
    }

    handleRecipeSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        this.setState({ recipeDisplayName: this.state.recipeName, recipeName: '' });
    }

    // Ingredient Methods
    handleIngredientNameChange = (event) => {
        event.preventDefault();
        this.setState({ curIngredient: event.target.value });
    }

    handleAmountChange = (event) => {
        event.preventDefault();
        this.setState({ amount: event.target.value });
    }

    handleUnitChange = (event) => {
        event.preventDefault();
        this.setState({ unit: event.target.value });
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

        let trimIng = this.state.curIngredient.trim();
        let trimAmt = this.state.amount.trim();

        let newVal = '';
        if (this.state.unit === 'N/A') {
            newVal = trimAmt + ' ' + trimIng;
        }
        else {
            newVal = trimAmt + this.state.unit + ' ' + trimIng;
        }

        this.setState({
            ingredientList: this.state.ingredientList.concat([newVal]), unit: '', amount: '', curIngredient: ''
        });
    }

    // Directions methods
    handleDirectionsChange = (event) => {
        event.preventDefault();
        this.setState({ directions: event.target.value });
    }

    handleDirectionsSubmit = (event) => {
        event.preventDefault();
        var newDir = this.state.directions.replace(/(\r\n|\n|\r)/gm, '|');
        this.setState({ directionDisplay: this.state.directions, databaseDirections: newDir });
    }

    // Display submit
    handleDisplaySubmit = (event) => {
        event.preventDefault();
        addRecipe(this.state.recipeDisplayName, this.state.ingredientList, this.state.databaseDirections);
        this.setState({ directionDisplay: '', recipeDisplayName: '', ingredientList: [], databaseDirections: '' });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Add Recipe</h1>
                <div style={{ position: 'fixed', left: 100, padding: 0, margin: 0, overflowY: 'scroll', width: '100%' }}>
                    <div style={{ display: 'inline-block', float: 'left', marginRight: 300 }}>
                        {/* Recipe Name Add */}
                        <h2>Add Recipe Name</h2>
                        <div style={{ marginBottom: 30, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, height: 70, width: 500 }}>
                            <form style={{ marginTop: 20 }} onSubmit={this.handleRecipeSubmit}>
                                <label>Recipe Name:
                                <input type='text' style={{ marginLeft: 5 }} value={this.state.value} onChange={this.handleRecipeNameChange} />
                                </label>
                                <input type='submit' value='Submit' style={{ marginLeft: 20 }} />
                            </form>
                        </div>

                        {/* Ingredient Add */}
                        <h2>Input Ingredients</h2>
                        <div style={{ marginBottom: 30, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, height: 100, margin: 0, }}>
                            <form style={{ marginTop: 20 }} onSubmit={this.handleIngredientSubmit} >
                                <div>
                                    <label>Ingredient Name:</label>
                                    <input type='text' style={{ marginLeft: 5 }} onChange={this.handleIngredientNameChange} />
                                </div>
                                <div>
                                    <label>Amount:</label>
                                    <input type='text' style={{ marginLeft: 5 }} onChange={this.handleAmountChange} />
                                    <label style={{ marginLeft: 10 }}>Unit: </label>
                                    <select style={{ marginLeft: 5 }} onChange={this.handleUnitChange}>
                                        <option label='N/A'>N/A</option>
                                        <option label='tsp'>tsp</option>
                                        <option label='Tbsp'>Tbsp</option>
                                        <option label='cup'>cup</option>
                                        <option label='oz'>oz</option>
                                    </select>
                                </div>
                                <input type='submit' value='Add Ingredient' style={{ marginLeft: 190, marginTop: 5 }} />
                            </form>
                        </div>

                        {/* Directions Add */}
                        <h2>Input Directions</h2>
                        <div style={{ marginBottom: 50, borderStyle: 'solid', borderColor: 'black', borderWidth: 1, height: 350 }}>
                            <form style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }} >
                                <div>
                                    <textarea style={{ height: 275, width: 490 }} onChange={this.handleDirectionsChange} />
                                </div>
                                <button style={{ marginLeft: 200, marginTop: 5 }} onClick={this.handleDirectionsSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/* Display Recipe */}
                    <div style={{ display: 'inline-block', float: 'left', }}>
                        <h2>Display of Recipe
                            <button style={{ marginLeft: 50 }} onClick={this.handleDisplaySubmit}>Save Recipe</button>
                        </h2>
                        <div style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 1, width: 600, height: 700 }}>
                            <h2>Recipe Name: {this.state.recipeDisplayName}</h2>
                            <h2>Ingredient List:</h2>
                            {this.state.ingredientList.map((ingredient) => (
                                <div>
                                    <li key={ingredient} style={{ marginLeft: 10 }}>{ingredient}
                                        <button style={{ marginLeft: 50 }} onClick={() => this.removeIngredient({ ingredient })}>Remove</button>
                                    </li>
                                </div>
                            ))}
                            <h2>Directions:</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.directionDisplay}
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddRecipe