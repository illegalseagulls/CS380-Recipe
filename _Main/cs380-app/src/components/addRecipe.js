import React from 'react';
import { addRecipe } from './Queries';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


class AddRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeName: '', curIngredient: '', amount: '', unit: 'N/A', directions: '', databaseDirections: '', databaseIngredientList: [],
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
        var tempList2 = [...this.state.databaseIngredientList];
        var index = tempList.indexOf(str.ingredient);
        if (index !== - 1) {
            tempList.splice(index, 1);
            tempList2.splice(index, 1);
            this.setState({ ingredientList: tempList, databaseIngredientList: tempList2 });
        }
    }

    handleIngredientSubmit = (event) => {
        event.preventDefault();
        event.target.reset();

        let trimIng = this.state.curIngredient.trim();
        let trimAmt = this.state.amount.trim();

        var newVal = '';
        var databaseVal = '';
        if (this.state.unit === 'N/A') {
            if (this.state.amount === '') {
                newVal = trimIng;
                databaseVal = '0 ' + this.state.unit + ' ' + trimIng;
            }
            else {
                newVal = trimAmt + ' ' + trimIng;
                databaseVal = trimAmt + ' ' + this.state.unit + ' ' + trimIng;
            }

        }
        else {
            newVal = trimAmt + ' ' + this.state.unit + ' ' + trimIng;
            databaseVal = trimAmt + ' ' + this.state.unit + ' ' + trimIng;
        }

        this.setState({
            ingredientList: this.state.ingredientList.concat([newVal]), unit: 'N/A', amount: '', curIngredient: '',
            databaseIngredientList: this.state.databaseIngredientList.concat([databaseVal])
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
        addRecipe(this.state.recipeDisplayName, this.state.databaseIngredientList, this.state.databaseDirections);
        this.setState({ directionDisplay: '', recipeDisplayName: '', ingredientList: [], databaseDirections: '', databaseIngredientList: [], });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Add Recipe</h1>
                <div style={{ position: 'fixed', left: 100, padding: 0, margin: 0, overflowY: 'scroll', width: '100%' }}>
                    <div style={{ display: 'inline-block', float: 'left', marginRight: 300 }}>
                        {/* Recipe Name Add */}
                        <h2>Add Recipe Name</h2>
                        <div style={{ marginBottom: 30, /*borderStyle: 'solid', borderColor: 'black', borderWidth: 1,*/ height: 70, width: 500 }}>
                            <form style={{ marginTop: 5 }} onSubmit={this.handleRecipeSubmit}>
                                <TextField id='recipeName' label='Recipe Name' variant='outlined' onChange={this.handleRecipeNameChange} autoComplete='off' />
                                <Button type='submit' value='Submit' style={{ marginLeft: 20, top: 5 }} variant='contained' > Submit </Button>
                            </form>
                        </div>

                        {/* Ingredient Add */}
                        <h2>Input Ingredients</h2>
                        <div style={{ marginBottom: 30, /*borderStyle: 'solid', borderColor: 'black', borderWidth: 1,*/ height: 100, marginBottom: 50 }}>
                            <form style={{ marginTop: 20 }} onSubmit={this.handleIngredientSubmit} >
                                <div>
                                    <TextField
                                        id='ingredientName'
                                        label='Ingredient Name'
                                        variant='outlined'
                                        onChange={this.handleIngredientNameChange} autoComplete='off'
                                        style={{ marginBottom: 10 }}
                                    />
                                </div>
                                <div>
                                    <TextField id='amount' label='Amount of Ingredient' variant='outlined' onChange={this.handleAmountChange} autoComplete='off' />
                                    <FormControl variant='outlined' >
                                        <InputLabel id='unitLabel'>Unit</InputLabel>
                                        <Select
                                            labelId='unitLabel'
                                            id='unitSelector'
                                            value={this.state.unit ? this.state.unit : 'N/A'}
                                            onChange={this.handleUnitChange}
                                            label='Unit'
                                            style={{ marginLeft: 5, width: 100 }}
                                        >
                                            <MenuItem value={'N/A'}>N/A</MenuItem>
                                            <MenuItem value={'tsp'}>tsp</MenuItem>
                                            <MenuItem value={'Tbsp'}>Tbsp</MenuItem>
                                            <MenuItem value={'cup'}>cup</MenuItem>
                                            <MenuItem value={'oz'}>oz</MenuItem>
                                            <MenuItem value={'lb'}>lb</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button type='submit' value='Add Ingredient' variant='contained' style={{ marginLeft: 20, top: 10 }}>Add Ingredient</Button>
                                </div>
                            </form>
                        </div>

                        {/* Directions Add */}
                        <h2>Input Directions</h2>
                        <div style={{ marginBottom: 50, /*borderStyle: 'solid', borderColor: 'black', borderWidth: 1,*/ height: 350 }}>
                            <form style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }} >
                                <div>
                                    <textarea style={{ height: 275, width: 490 }} onChange={this.handleDirectionsChange} value={this.state.directions} />
                                </div>
                                <Button style={{ marginLeft: 150, marginTop: 5 }} onClick={this.handleDirectionsSubmit} variant='contained' >Submit Directions</Button>
                            </form>
                        </div>
                    </div>

                    {/* Display Recipe */}
                    <div style={{ display: 'inline-block', float: 'left', }}>
                        <h2>Display of Recipe
                            <Button style={{ marginLeft: 50 }} onClick={this.handleDisplaySubmit} variant='contained'>Save Recipe</Button>
                        </h2>
                        <div style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 1, width: 600, height: 700 }}>
                            <h2>Recipe Name: {this.state.recipeDisplayName}</h2>
                            <h2>Ingredient List:</h2>
                            {this.state.ingredientList.map((ingredient) => (
                                <div key={ingredient}>
                                    <li key={ingredient} style={{ marginLeft: 10 }}>{ingredient}
                                        <button key={ingredient} style={{ marginLeft: 50 }} onClick={() => this.removeIngredient({ ingredient })}>Remove</button>
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
            </React.Fragment >
        );
    }
}

export default AddRecipe