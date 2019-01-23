import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                <Header title="Ese's React/Redux Template"/>
                    {this.props.children}
                <Footer message ='The bare necessities needed to get started with your react-redux web project.'/>
            </div>
        );
    }
}
