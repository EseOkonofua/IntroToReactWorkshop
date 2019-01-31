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
 *  Variables Can hold elements, components & jsx. They can then be accessed in JSX using the curly brackets {}:
 *  ex.
 *  var header = <h1>This is my Header</h1>;
 * 
 *  render() {
 *      return header; //This will show "This is my Header" in the html.
 *  }
 *  or 
 *  render() {
 *      return ( <div> {header} </div> );
 *  }
 * 
 *  Functions can also create components or jsx to be rendered.
 *  Functions will have access to the properties passed into a component, through the first argument of the function.
 *  ex.   
 *  function MyHeader(props) {
 *     return (<h1>{props.title}</h1>);
 *  }
 * 
 *  render() {
 *      return <MyHeader title='This is my header'></MyHeader> //This will render "This is my Header" in the html.
 *  }
 * 
 *  Classes that extend React's Component are the main form of rendering full components.
 *  A class can access its properties from it's constructor and will render any JSX returned by it's interal render() function.
 *  ex.
 *  Wrap the props around the super function in the constructor to propagate access throughout the class.
 *  class MyHeader extends Component {
 *      constructor(props) {
 *          super(props);
 *      }    
 * 
 *      render() {
 *          return (<div>{props.title}</div>);
 *      }
 *  }
 */


