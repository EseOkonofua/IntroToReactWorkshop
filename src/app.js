import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from './constants/pokemonList';
import PokemonTypesMap from './constants/pokemonTypes';

//STEP 7: write a Pokemon Card component that will take a "pokemon" property which is given pokemon data and render the information.
//It will also take a "vs" property, which is the pokemonData to be compared to.
//If there is no pokemon data...Let the component render an empty pokemon card
function PokemonCard(props) {
    if (props.pokemon) {
        var arrowUp = <span className='arrows'>&#8593;</span>;
        var arrowDown = <span className='arrows'>&#8595;</span>;

        var comparisonArray = null;
        if(props.vs) {
            comparisonArray = [];
            props.pokemon.stats.map( (item, index) => comparisonArray.push(item.base_stat - props.vs.stats[index].base_stat) )
        }

        return (
            <div  className='pokemonCard'>
                <h1 className='pokemonName'>{props.pokemon.name}</h1>
                <div className='pokemonImageContainer'>
                    <img className='pokemonImage' src={props.pokemon.sprites.front_default}></img>
                </div>
                <div className='pokemonTypes'>
                    {
                        props.pokemon.types.map ((item, index) => { 
                            var myTypeStyle = { backgroundColor: PokemonTypesMap[item.type.name] };
                            return (<label className='type' style={myTypeStyle} key={index}>{item.type.name}</label>)
                        })
                    }
                </div>
                <hr/>
                <div className='pokemonStats'>
                    {props.pokemon.stats.map( (item, index ) => {
                        var arrow = null;
                        var arrowStyle = null;
                        var color = null;
                        if(comparisonArray) {
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
    else {
        return (
            <div className='pokemonCard pokemonCard--Empty'>
            <h1>POKEMON!</h1>
                <img className='pokeball' src="https://img.icons8.com/color/48/000000/pokeball-2.png"></img>
            </div>
        );
    } 
}

//STEP 2: CREATE A COMPONENT That takes an array of items [{name, value}], creates a select box with these given names and values.
// It will take a choice property, to represent the current choice of the select box.
// It also takes an id to identify it.
// It takes a function that is used to handle when the value of the select box changes.

//STEP 2.1: Learn about props and passing props to components
// Learn about arrays and how they behave in JSX.
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

//Main container of App. Will hold structure of application and sub-components
//STEP 1: COMPONENTS, functions, variables holding JSX
//PPT: Examples of rendering components using COMPONENTS, FUNCTIONS & Plain variables.
//Step 1.1: Create a class that extends Component from React package.
export default class App extends Component {
    //STEP 3: CONSTRUCTOR and STATE
    //In the constructor we will define the state of our component.
    //We will also bind any functions that will be passed to other components to our component state
    //we can define some constants/properties also.
    //We can get access to passed on properties in the constructor.
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

    //STEP 5: LIFE CYCLE FUNCTIONS OF A component class
    //ComponentWillMount is good for loading asynchronous data.
    //ComponentWillUnMount, ComponentDidMount, ComponentWillUpdate etc...
    componentWillMount() {
        this.loadPokemonOneData();
        this.loadPokemonTwoData();
    }

    //Step 1.2: Render a container element that will hold all the subcomponents and sections. 
    //Use "hello world" to show that component is rendering properly.
    render() {
        return (
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonOne} />
                    <PokemonCard pokemon={this.state.PokemonOneData} />
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonTwo} />
                    <PokemonCard pokemon={this.state.PokemonTwoData} vs={this.state.PokemonOneData} />
                </section>
            </div>
        );
    }


    //STEP 6: Finally write event handler for the PokemonPickers.
    //Talk about event returned object.
    //Useful target property.
    handleChange(event) {
        if(event.target.id === 'pokemonOne')
            this.setState({ PokemonOne: event.target.value }, () => this.loadPokemonOneData());
        if(event.target.id === 'pokemonTwo')
            this.setState({ PokemonTwo: event.target.value }, () => this.loadPokemonTwoData());
    }

    //STEP 5: Write functions that will update the state of the react app for each Pokemon data
    // Introducing this.setState , Talk aabout it's asynchronous properties.
    loadPokemonOneData() {
        this.getPokemon(this.state.PokemonOne).then( res => {
            this.setState({ PokemonOneData: res.data });
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            this.setState({ PokemonTwoData: res.data });
        });
    }


    //STEP 4: USE THE AXios package to load the pokemon data given an id
    getPokemon(id) {
        return axios.get(this.pokeAPI.host+`pokemon/${id}`);
    }
}
