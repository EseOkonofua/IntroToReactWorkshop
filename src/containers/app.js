import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../pokemonList';

function PokemonPicker(props) {
    return (
        <select onChange={props.handleChange} value={props.choice}>
            {
                props.pokemonList.map ( data =>{ 
                    return <option key={data.id} value={data.id}>{data.name}</option>;
                })
            }                        
        </select>
    );
}

function CardHolder(props) {
    return <div></div>;
}

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            PokemonList,
            PokemonOne: 1,
            PokemonTwo: 2,
            PokemonOneData: null,
            PokemonTwoData: null
        };

        this.pokeAPI = {
            host: "https://pokeapi.co/api/v2/"
        }
    }

    componentWillMount(){
        this.loadPokemonOneData();
        this.loadPokemonTwoData();
    }

    render() {
        return (
            <div className="app">
                <section className='pokemon_pickers'>
                    <PokemonPicker handleChange={this.handleChangeOne.bind(this)} pokemonList={this.state.PokemonList} choice={this.state.PokemonOne} />
                    <PokemonPicker handleChange={this.handleChangeTwo.bind(this)} pokemonList={this.state.PokemonList} choice={this.state.PokemonTwo} />
                </section>
                <section className='card_holders'>
                    <CardHolder />
                </section>
            </div>
        );
    }

    handleChangeOne(event) {
        this.setState({ PokemonOne: event.target.value }, () => this.loadCardOne());
    }

    handleChangeTwo(event) {
        this.setState({ PokemonTwo: event.target.value }, () => this.loadCardTwo());
    }

    loadPokemonOneData() {
        this.getPokemon(this.state.PokemonOne).then( res => {
            console.log(this.getPokemonData(res.data));
            this.setState({ PokemonOneData: this.getPokemonData(res.data) });
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            console.log(this.getPokemonData(res.data));
            this.setState({ PokemonTwoData: this.getPokemonData(res.data) });
        });
    }

    getPokemon(id) {
        return axios.get(this.pokeAPI.host+`pokemon/${id}`);
    }

    getPokemonData(data) {
        var {name, sprites, stats, types} = data;
        return {name, sprites, stats, types};
    }
}
