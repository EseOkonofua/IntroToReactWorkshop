import React, { Component } from 'react';
import PokemonList from '../constants/pokemonList';


//TASK 2: CREATE A COMPONENT That takes an array of item objects [{name, value}], creates a select box with these given names and values.
// It will take a choice property, to represent the current choice of the select box.
// It also takes an id to identify it.
// It takes a function that is used to handle when the value of the select box changes.
function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' 
        id={props.id} 
        onChange={props.handleChange} 
        value={props.choice}>
            {
                props.list.map ( (data, index) => { 
                    var name = data.name;   
                    var value = data.value; 
                    return <option key={index} value={value}>{name}</option>;
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