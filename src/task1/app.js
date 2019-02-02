import React, { Component } from 'react';


/**
 * TASK 1: Create and Export a class that will render a Hello World & Display it on the html page
 * This will ultimatley be the main container of our pokemon app.
 * Name the class App.
 */

export default class App extends Component {
    render() {
        /** Enter code here */
    }
}


/**                      
 *              LEARNING ZONE
 */

/*
 *  JSX is react's "markup" language for dyanmic UI generation. It is a mixture of HTML and javascript. Allowing developers
 *  to use familiar HTML syntax but with the power of embedding javascript expressions within the html.
 *  Variables Can hold elements, components & jsx. They can then be accessed in JSX using the curly brackets {}:
 */  
// Example:
 var header = <h1>This is my Header</h1>;
 function VariableExample(props){
     return header;
     // or return (<div>{header}</div>);
 }

 /*
 *  In a react environemtn, functions can also be used to create components or jsx to be rendered.
 *  Components can be passed properties and functions
 *  will have access to the properties passed through the first argument.
 */  
// Example:   
function MyHeaderFunction(props) {
    return (<h1>{props.title}</h1>);
}
function FunctionExample(props) {
    return <MyHeaderFunction title='This is my Title'></MyHeaderFunction>;
}
 
/* 
 *  Classes that extend React's Component are the main form of rendering full components.
 *  A class can access its properties from it's constructor and will render any JSX returned by it's interal render() function.
 *  Wrap the props around the super function in the constructor to allow props to be accessible through "this".
 */
class MyHeaderClass extends Component {
    constructor(props) {
        super(props);
    }    

    render() {
        return (<div>{this.props.title}</div>);
    }
}

function ClassExample(props) {
    return <MyHeaderClass title='This is my title'></MyHeaderClass>
}


