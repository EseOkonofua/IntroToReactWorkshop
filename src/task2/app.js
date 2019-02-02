import React, { Component } from 'react';
import PokemonList from '../constants/pokemonList';


//TASK 2: CREATE A COMPONENT That takes an array of item objects [{name, value}], creates a select box with these given names and values.
// It will take a choice property, to represent the current choice of the select box.
// It also takes an id to identify it.
// It takes a function that is used to handle when the value of the select box changes.
function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' 
        //Fill out these sections with the props variable
        id={null/**Enter code here */} 
        onChange={null/**Enter code here */} 
        value={1/**Enter code here */}>
            {          
                /** use the map function on the pokemon list to create option tags */
                props.list.map ( (data, index) => { 
                    var name = data.name;   //Use me
                    var value = data.value  //Use me
                    return <option key={index} value={1/**Enter code here */}>{null/**Enter code here */}</option>
                })
            }                        
        </select>
    );
}

export default class App extends Component {
    render() {
        return ( 
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={1}></PokemonPicker>
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={2} />
                </section>
            </div>
        );
    }

    handleChange() {}
}

/**
 *                              LEARNING ZONE
 */
/**
 *  JSX can handle arrays of elements. We can embed multiple elements/components through an array.
 *  Elements in the array are placed in the page on the same level.
 *  Any elements or components in the array must be given a unique key property.
 */ 
 // Example:
var myHeaders = [<h4 key={1}>Hi</h4>,<h3 key={2}>Hi</h3>,<h2 key={3}>Hi</h2>,<h1 key={4}>Hi</h1>];
function ArrayExmaple(props) {
    return myHeaders;
}

 /**
  *  In react development a common way of creating dynamic elements is to use the array map function. 
  *  Map a data array to an array of elements or components.
  */
 // Example:
var names = ["hannah", "angela", "stacy"];
function MapExample(props) {
    return (
        <div>{ names.map( (name, index) => <h1 key={index}>{name}</h1>)}</div>
    );
}  