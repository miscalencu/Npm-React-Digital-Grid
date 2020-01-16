import React, { Component } from 'react';

export default class MainMenu extends Component {

    render() {
        return (
            <ul>
                <li><a href="/">Home</a></li>
                <li>Basic Features
                    <ul>
                        <li><a href="/simple">Simple</a></li>
                        <li><a href="/templates">Templates</a></li>
                        <li><a href="/paging">Paging</a></li>
                        <li><a href="/sorting">Sorting</a></li>
                    </ul>    
                </li>
                <li>Advanced Features
                    <ul>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/selection">Selection</a></li>
                        <li><a href="/expand">Expandable content</a></li>
                    </ul>    
                </li>
            </ul>
        );
    };
};