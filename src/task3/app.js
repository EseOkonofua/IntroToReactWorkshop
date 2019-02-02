import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../constants/pokemonList';

function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' 
        id={props.id} 
        onChange={props.handleChange} 
        value={props.choice}>
            {
                props.list.map ( (data, index) => { 
                    return <option key={index} value={data.value}>{data.name}</option>;
                })
            }                        
        </select>
    );
}

export default class App extends Component {
    /** NEW! */
    // class constructor is used to create the state of the app.
    // It will also be used to hold component constants
    constructor(props) {
        super(props);

        //App state. Variables that will change and affect the app.
        this.state = {
            PokemonOne: 1,
            PokemonTwo: 2,
            PokemonOneData: null,
            PokemonTwoData: null
        };

        //static component variables
        this.pokeAPI = {
            host: "https://pokeapi.co/api/v2/"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    /** TASK 3.1
     *  Update the pokemon picker choice property to use the state of the app.
     */
    render() {
        return ( 
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={1/** Enter code here */}></PokemonPicker>
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={2/** Enter code here */} ></PokemonPicker>
                </section>
            </div>
        );
    }

    /** NEW! */
    //getPokemon function will call the Pokemon API, get data and return a promise to handle the data.
    getPokemon(id) {
        return axios.get(this.pokeAPI.host+`pokemon/${id}`);
    }

    /**
     * TASK 3.2: Write functions that will update the state of the react app for each Pokemon data
     * after getting the data from the pokemon API.
     * Pass a call back function that will output the corresponding pokemon data from state into the console
     * using console.log().
     */
    loadPokemonOneData() {
        this.getPokemon(this.state.PokemonOne).then( res => {
            var data = res.data;
            /** Enter code here */
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            var data = res.data;
            /** Enter code here */
        });
    }

    //TASK 3.3: Finally write event handler for the PokemonPickers.
    // After we change a value in the pokemon picker, we must update the state of that pokemon in the app
    // Write a function that will set the state of our corresponding pokemon to the value in it's picker.
    // Pass a callback function to load the corresponding pokemon data after the state is set.
    handleChange(event) {
        var myValue = event.target.value;
        if(event.target.id === 'pokemonOne') {
            /** Enter code here */
        }
        if(event.target.id === 'pokemonTwo') {
            /** Enter code here */
        }    
    }
}


/** 
 *                          LEARNING ZONE 
 * 
 * React components handle state using the state object that is defined within the controller.
 * changes made to a state variable will affect what is being show in the UI.
 * In order to change the state of a component we must use setState function.
 * the first argument of the setState function is the object with the corresponding state varibles you'd like to update.
 * the second argument of the setState function is a callback function for after the state has updated,
 * given that setState calls are asynchronous.
*/
// Example:
class StateExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    finishLoading() {
        this.setState({isLoading: false}, () => this.doSomethingAfterLoad());
    }

    doSomethingAfterLoad() {}
}