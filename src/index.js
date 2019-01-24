import React from "react";
import ReactDOM from "react-dom";

import App from './containers/app'
// Step 1: Create Base of Application.
function getName() {
    return "Intro to React App - Pokedex";
}

// React uses a compiled markup language called JSX.
// It allows coupling of the UI with state data.
// Can embed valid Javascript expressions into the markup using curly bracket {}
let app = () => {
    var title = "Intro to React App - Pokedex";
    return <h1>{getName()}</h1>;
}

// With JSX You can pass attributes using quotes for string data <img src="image.jpg" /> 
// Or using curly brackets for expresssions:                    <img src={image.src} />
// React uses camelCase for HTML attributes ex. class = className, tabindex = tabIndex.

//Step 2: Render the element into container of given Id.
ReactDOM.render(
  <App/>,
  document.getElementById("app")
);