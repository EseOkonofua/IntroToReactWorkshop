import React, { Component } from 'react';

//PPT: Examples of rendering components using COMPONENTS, FUNCTIONS & Plain variables.


/**
 * TASK 1: Create and Export a class that will render a Hello World & Display it on the html page
 * This will ultimatley be the main container of our pokemon app.
 * Name the class App
 */

 export default class App extends Component {
    render(){
        return <div className='container'>Hello World</div>;
    }
 }