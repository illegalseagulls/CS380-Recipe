import React, {Component} from 'react';
import Recipe from './recipe';
import PropTypes from 'prop-types';


export class recipelist extends Component{
  render(){
    return this.props.recipes.map((recipe)=> (
      <Recipe recipe={recipe}/>
    ));
  }
}

export default recipelist;
