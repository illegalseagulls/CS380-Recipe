import React, {Component} from 'react';


export class recipeSearch extends Component{

  state = {
    name: '',
    ingredientList: []
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.ingredientList.length > 0)
    {
      this.props.recipeSearch('this.state.name', this.state.ingredientList.split(','));
    }
    //this.props.recipeSearch('this.state.name', this.state.ingredientList.split(','));
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  render() {
    return(
    <form onSubmit={this.onSubmit}>
      <input type="text" name="ingredientList" value={this.state.ingredientList} onChange={this.onChange} placeholder="Type Ingredients Here Seperated by a Comma..."  />
      <input type="submit" value="Submit" className="btn" />
    </form>
  )
  }
}

export default recipeSearch;
