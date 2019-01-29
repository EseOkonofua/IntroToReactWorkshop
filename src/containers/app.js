import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../pokemonList';
import PokemonTypesMap from '../pokemonTypes';

function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' id={props.id} 
        
        onChange={props.handleChange} value={props.choice}>
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
        var arrowUp = <span className='arrows'>&#8593;</span>;
        var arrowDown = <span className='arrows'>&#8595;</span>;

        var compArr = null;
        if(props.vs) {
            compArr = [];
            props.pokemon.stats.map( (item, index) => compArr.push(item.base_stat - props.vs.stats[index].base_stat) )
        }

        return (
            <div  className='pokemonCard'>
                <h1 className='pokemonName'>{props.pokemon.name}</h1>
                <div class='pokemonImageContainer'>
                    <img className='pokemonImage' src={props.pokemon.sprites.front_default}></img>
                </div>
                <div className='pokemonTypes'>
                    {
                        props.pokemon.types.map ((item, index) => { 
                            var myTypeStyle = {
                                display: 'inline-block',
                                textAlign: 'center',
                                minWidth: '55px',
                                padding: '2px',
                                marginRight: '5px',
                                borderRadius: '5px',
                                border: '1px solid white',
                                color: 'white',
                                backgroundColor: PokemonTypesMap[item.type.name]
                            };

                            return (<label style={myTypeStyle} key={index}>{item.type.name}</label>)
                        })
                    }
                </div>
                <div className='pokemonStats'>
                    {props.pokemon.stats.map( (item, index ) => {
                        var arrow = null;
                        var arrowStyle = null;
                        var color = null;
                        if(compArr) {
                            if(compArr[index] > 0) {
                                color = 'green';
                                arrow = arrowUp;
                            }
                            else if(compArr[index] < 0) {
                                color = 'red';
                                arrow = arrowDown;
                            }
                            arrowStyle = { color };
                        }

                        return (
                            <div className='stat' key={index}>
                                <h3 className='statName'>{item.stat.name}</h3>
                                <div style={arrowStyle} className='statNumber'>
                                    <span>{item.base_stat}</span>
                                    {arrow}
                                </div>                            
                            </div>
                        )
                    })}
                </div>
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
                    <PokemonCard pokemon={this.state.PokemonTwoData} vs={this.state.PokemonOneData} />
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
            this.setState({ PokemonOneData: this.getPokemonData(res.data) });
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
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
