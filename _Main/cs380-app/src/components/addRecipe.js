import React from 'react';


class AddRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeName: '', curIngredient: '', amount: '', unit: '', ingredientList: '', directions: '',
            recipeDisplayName: '', directionDisplay: ''
        };
    }

    handleRecipeSubmit = (event) => {
        event.preventDefault();
        this.setState({ recipeDisplayName: this.state.recipeName });
        this.setState({ recipeName: '' });
    }

    handleDirectionsSubmit = (event) => {
        event.preventDefault();
        this.setState({ directionDisplay: this.state.directions });
        this.setState({ directions: '' });
    }

    handleRecipeNameChange = (event) => {
        event.preventDefault();
        this.setState({ recipeName: event.target.value })
    }

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

    handleIngredientSubmit = (event) => {
        event.preventDefault();
        const newVal = this.state.curIngredient + this.state.amount + this.state.unit;
        this.setState({ ingredientList: newVal })

        this.setState({ curIngredient: '' })
        this.setState({ amount: '' })
        this.setState({ unit: '' })

        console.log(this.state.ingredientList);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Add Recipe</h1>
                <div style={{ position: 'fixed', left: 100, padding: 0, margin: 0 }}>
                    <div style={{ display: 'inline-block', float: 'left', marginRight: 300 }}>
                        {/* Recipe Name Add */}
                        <h2>Add Recipe Name</h2>
                        <div style={{ marginBottom: 30, borderStyle: 'solid', borderColor: 'black', borderWidth: 4, height: 70, width: 500 }}>
                            <form style={{ marginTop: 20 }} onSubmit={this.handleRecipeSubmit}>
                                <label>Recipe Name:
                                <input type='text' style={{ marginLeft: 5 }} value={this.state.value} onChange={this.handleRecipeNameChange} />
                                </label>
                                {/* <button style={{ marginLeft: 20 }}>Submit</button> */}
                                <input type='submit' value='Submit' style={{ marginLeft: 20 }} />
                            </form>
                        </div>

                        {/* Ingredient Add */}
                        <h2>Input Ingredients</h2>
                        <div style={{ marginBottom: 30, borderStyle: 'solid', borderColor: 'black', borderWidth: 4, height: 100, margin: 0, }}>
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
                                        <option label='tsp'>tsp</option>
                                        <option label='Tbsp'>Tbsp</option>
                                        <option label='cup'>cup</option>
                                        <option label='oz'>oz</option>
                                    </select>
                                </div>
                                {/* <button style={{ marginLeft: 200, marginTop: 5 }} onClick={() => console.log("Ingredient name Submitted")}>Submit</button> */}
                                <input type='submit' value='Submit' style={{ marginLeft: 200, marginTop: 5 }} />
                            </form>
                        </div>

                        {/* Directions Add */}
                        <h2>Input Directions</h2>
                        <div style={{ marginBottom: 50, borderStyle: 'solid', borderColor: 'black', borderWidth: 4, height: 350 }}>
                            <form style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }} >
                                <div>
                                    <textarea style={{ height: 275, width: 490 }} />
                                </div>
                                <button style={{ marginLeft: 200, marginTop: 5 }} onClick={() => console.log("Directions submitted")}>Submit</button>
                            </form>
                        </div>
                    </div>

                    {/* Display Recipe */}
                    <div style={{ display: 'inline-block', float: 'left', }}>
                        <h2>Display of Recipe</h2>
                        <div style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 4, width: 600, height: 700 }}>
                            <h2>{this.state.recipeDisplayName}</h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddRecipe