import React, {Component} from 'react';
import PropTypes from 'prop-types';

class recipe extends Component{

  getStyle = () => {
    return {
      background: '#E3EFFF',
      padding: '40px',
      border: '1px black solid',
      margin:'1%'
    }
  }
  render()
  {
    return(
      <div style={this.getStyle()}>
        <p>{this.props.recipe.name}</p>
        <ol>
          {this.props.recipe.ingredientList.map((index, value)=>{
          return <li key={value}>{index}</li>
          })}


        </ol>
      </div>
    );

  }

}

export default recipe;
