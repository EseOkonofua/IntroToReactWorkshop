import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../pokemonList';

function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' id={props.id} onChange={props.handleChange} value={props.choice}>
            {
                props.pokemonList.map ( data => { 
                    return <option key={data.id} value={data.id}>{data.name}</option>;
                })
            }                        
        </select>
    );
}

function PokemonCard(props) {

    if (props.pokemon) {
        var myStyle = {
            backgroundImage: `url(${props.pokemon.sprites.front_default}) `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '45%'
        };

        return (
            <div  className='pokemonCard'>
                <h1>{props.pokemon.name}</h1>
                <div style={myStyle} className='pokemonImage'></div>
                <div className='pokemonTypes'>
                    {props.pokemon.types.map ((item, index) => <label key={index}>{item.type.name}</label>)}
                </div>
                <div className='pokemonStats'></div>
            </div>
        );
    }
    else 
        return (
        <div className='pokemonCard--Empty'>
            <img src="https://img.icons8.com/color/48/000000/pokeball-2.png"></img>
        </div>
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

        this.PokemonList = PokemonList;
        this.pokeAPI = {
            host: "https://pokeapi.co/api/v2/"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.loadPokemonOneData();
        this.loadPokemonTwoData();
    }

    render() {
        return (
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} pokemonList={this.PokemonList} choice={this.state.PokemonOne} />
                    <PokemonCard pokemon={this.state.PokemonOneData} />
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} pokemonList={this.PokemonList} choice={this.state.PokemonTwo} />
                    <PokemonCard pokemon={this.state.PokemonTwoData} />
                </section>
            </div>
        );
    }

    handleChange(event) {
        if(event.target.id === 'pokemonOne')
            this.setState({ PokemonOne: event.target.value }, () => this.loadPokemonOneData());
        if(event.target.id === 'pokemonTwo')
            this.setState({ PokemonTwo: event.target.value }, () => this.loadPokemonTwoData());
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
