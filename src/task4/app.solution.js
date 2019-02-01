import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from '../constants/pokemonList';
import PokemonTypesMap from '../constants/pokemonTypes';

// TASK 4: write a Pokemon Card component that will take a "pokemon" property which is given pokemon data and render the information.
// It will also take a "vs" property, which is the pokemonData to be compared to.
// If there is no pokemon data...the component will render an empty pokemon card.
function PokemonCard(props) {
    //Check to see if there is pokemon data given
    if (props.pokemon) {
        //Elements that we will use for our arrows
        var arrowUp = <span className='arrows'>&#8593;</span>;
        var arrowDown = <span className='arrows'>&#8595;</span>;

        // Null elements will not be rendered in react app.
        var comparisonArray = null;

        //check to see if we have a value to compare
        if(props.vs) {
            comparisonArray = [];

            // TASK 4.1
            // Map the stats array to push the difference between the pokemon stats
            // Add elements into arrays using the push function
            // array.push(element)
            props.pokemon.stats.map( (item, index) => { 
                var pokemonStat = item.base_stat;
                var vsStat = props.vs.stats[index].base_stat;
                comparisonArray.push(pokemonStat - vsStat); 
            });
        }

        //TASK 4.2 Render the Pokemon name and Pokemon Image given the variables.
        var pokemonName = props.pokemon.name;
        var pokemonSpriteSource = props.pokemon.sprites.front_default;
        return (
            <div  className='pokemonCard'>
                <h1 className='pokemonName'>{pokemonName}</h1>
                <div className='pokemonImageContainer'>
                    <img className='pokemonImage' src={pokemonSpriteSource}></img>
                </div>
                <div className='pokemonTypes'>
                    {
                        // TASK 4.3: Render the Pokemon type list given the variables
                        props.pokemon.types.map ((item, index) => { 
                            var myTypeStyle = { backgroundColor: PokemonTypesMap[item.type.name] };
                            var typeName = item.type.name;
                            return (<label className='type' style={myTypeStyle} key={index}>{typeName}</label>)
                        })
                    }
                </div>
                <hr/>
                <div className='pokemonStats'>
                    {
                        // TASK 4.4: Render the pokemon stats given the variables
                        props.pokemon.stats.map( (item, index ) => {
                            var arrow = null;      //Use this 
                            var arrowStyle = null; //Use this 
                            var color = null;

                            //Check again if we are comparing pokemon
                            if(comparisonArray) {
                                //Set styles and arrow type based on the difference
                                if(comparisonArray[index] > 0) {
                                    color = 'green';
                                    arrow = arrowUp;
                                }
                                else if(comparisonArray[index] < 0) {
                                    color = 'red';
                                    arrow = arrowDown;
                                }
                                arrowStyle = { color };
                            }
                            var statName = item.stat.name;    //Use this
                            var statNumber = item.base_stat;  //Use this

                            return (
                                <div className='stat' key={index}>
                                    <h3 className='statName'>{statName}</h3>
                                    <div style={arrowStyle} className='statNumber'>
                                        <span>{statNumber}</span>
                                        {arrow}
                                    </div>                            
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        //DEFAULT POKEMON CARD
        return (
            <div className='pokemonCard pokemonCard--Empty'>
            <h1>POKEMON!</h1>
                <img className='pokeball' src="https://img.icons8.com/color/48/000000/pokeball-2.png"></img>
            </div>
        );
    } 
}

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

    /** NEW! */
    // React has a number of component lifecycle functions that will each be called at different stages of a 
    // components life.
    // Component will mount is perfect for loading initial data because it is invoked 
    componentDidMount() {
        this.loadPokemonOneData();
        this.loadPokemonTwoData();
    }

    /** NEW! */
    // Added PokemonCard component into the mix
    render() {
        return ( 
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonOne}></PokemonPicker>
                    <PokemonCard pokemon={this.state.PokemonOneData} />
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonTwo} ></PokemonPicker>
                    <PokemonCard pokemon={this.state.PokemonTwoData} vs={this.state.PokemonOneData} />
                </section>
            </div>
        );
    }

    getPokemon(id) {
        return axios.get(this.pokeAPI.host+`pokemon/${id}`);
    }

    loadPokemonOneData() {
        this.getPokemon(this.state.PokemonOne).then( res => {
            var data = res.data;
            this.setState({ PokemonOneData: data });
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            var data = res.data;
            this.setState({ PokemonTwoData: data });
        });
    }

    handleChange(event) {
        if(event.target.id === 'pokemonOne')
            this.setState({ PokemonOne: event.target.value }, () => this.loadPokemonOneData());
        if(event.target.id === 'pokemonTwo')
            this.setState({ PokemonTwo: event.target.value }, () => this.loadPokemonTwoData());
    }
}
