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
    constructor(props) {
        super(props);

        this.state = {
            PokemonOne: 1,
            PokemonTwo: 2,
            PokemonOneData: null,
            PokemonTwoData: null
        };

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
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonOne}></PokemonPicker>
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonTwo} ></PokemonPicker>
                </section>
            </div>
        );
    }

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
            this.setState({ PokemonOneData: data }, () => console.log(this.state.PokemonOneData));
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            var data = res.data;
            this.setState({ PokemonTwoData: data }, () => console.log(this.state.PokemonTwoData));
        });
    }

    //TASK 3.3: Finally write event handler for the PokemonPickers.
    // After we change a value in the pokemon picker, we must update the state of that pokemon in the app
    // Write a function that will set the state of our corresponding pokemon to the value in it's picker.
    // Pass a callback function to load the corresponding pokemon data after the state is set.
    handleChange(event) {
        var myValue = event.target.value;
        if(event.target.id === 'pokemonOne')
            this.setState({ PokemonOne: myValue }, () => this.loadPokemonOneData());
        if(event.target.id === 'pokemonTwo')
            this.setState({ PokemonTwo: myValue }, () => this.loadPokemonTwoData());
    }
}
