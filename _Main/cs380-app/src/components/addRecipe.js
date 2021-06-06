import React from 'react';
import { addRecipe } from './Queries';
import './addRecipe.css'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

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

    submitButton = {
        backgroundColor: '#1B2845',
        color: 'white',
        marginLeft: 20,
        top: 5
    };

    submitButton2 = {
        backgroundColor: '#1B2845',
        color: 'white',
        marginLeft: 150,
        marginTop: 5
    };

    submitButton3 = {
        backgroundColor: '#1B2845',
        color: 'white',
        marginLeft: 50,
    };


    render() {
        return (
            <div className='wrapper'>
                <h1>Add Recipe</h1>
                <div className='addWrapper'>
                    {/* Recipe Name Add */}
                    <h2>Add Recipe Name</h2>
                    <div className='recipeName'>
                        <form
                            style={{ marginTop: 5 }}
                            onSubmit={this.handleRecipeSubmit}
                        >
                            <TextField
                                id='recipeName'
                                label='Recipe Name'
                                variant='outlined'
                                onChange={this.handleRecipeNameChange}
                                autoComplete='off'
                            />
                            <Button
                                type='submit'
                                value='Submit'
                                style={this.submitButton}
                                variant='contained'
                            > Submit </Button>
                        </form>
                    </div>

                    {/* Ingredient Add */}
                    <h2>Input Ingredients</h2>
                    <div className='ingredientAdd'>
                        <form
                            style={{ marginTop: 20 }}
                            onSubmit={this.handleIngredientSubmit}
                        >
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
                                <TextField
                                    id='amount'
                                    label='Amount of Ingredient'
                                    variant='outlined'
                                    onChange={this.handleAmountChange}
                                    autoComplete='off'
                                />
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
                                <Button
                                    type='submit'
                                    value='Add Ingredient'
                                    variant='contained'
                                    style={this.submitButton}
                                >Add Ingredient</Button>
                            </div>
                        </form>
                    </div>

                    {/* Directions Add */}
                    <h2>Input Directions</h2>
                    <div className='addDirections'>
                        <form
                            style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }}
                        >
                            <div>
                                <textarea
                                    className="customTextArea"
                                    onChange={this.handleDirectionsChange} value={this.state.directions}
                                />
                            </div>
                            <Button
                                style={this.submitButton2}
                                onClick={this.handleDirectionsSubmit}
                                variant='contained'
                            >Submit Directions</Button>
                        </form>
                    </div>
                </div>

                {/* Display Recipe */}
                <div className='displayWrapper'>
                    <h2>Display of Recipe
                            <Button
                            style={this.submitButton3}
                            onClick={this.handleDisplaySubmit}
                            variant='contained'
                        >Save Recipe</Button>
                    </h2>
                    <div className='recipeDisplayBox'>
                        <h2>Recipe Name: {this.state.recipeDisplayName}</h2>
                        <h2>Ingredient List:</h2>
                        {this.state.ingredientList.map((ingredient) => (
                            <div key={ingredient}>
                                <li key={ingredient} style={{ marginLeft: 10 }}>{ingredient}
                                    <IconButton
                                        key={ingredient}
                                        style={{ marginLeft: 50, color: '#1B2845' }}
                                        onClick={() => this.removeIngredient({ ingredient })}
                                    ><DeleteIcon /></IconButton>
                                </li>
                            </div>
                        ))}
                        <h2>Directions:</h2>
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.directionDisplay}
                        </p>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddRecipe