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

/**
 *  Variables Can hold elements, components & jsx. They can then be accessed in JSX using the curly brackets {}:
 *  JSX is react's "language" for dyanmic frontend generation. It is a mixture of HTML and javascript. Allowing developers
 *  to use familiar HTML syntax but with the power of embedding javascript expressions within the html.
 */  
// Example:
 var header = <h1>This is my Header</h1>;
 function VariableExample(props){
     return header;
     // or return (<div>{header}</div>);
 }

 /*
 *  Functions can also create components or jsx to be rendered.
 *  Functions will have access to the properties passed into a component, through the first argument of the function.
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
 *  Wrap the props around the super function in the constructor to propagate access throughout the class.
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


