import React, { useState } from 'react';

import Simple from './examples/simple';
import Skins from './examples/skins';
import Expandable from './examples/expandable';
import Full from './examples/full';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Examples = (props) => {

    let Example = null;
    let title = 'Not found';
    const [ code, setCode ] = useState("Loading source code...");

    switch(props.match.params.example) {
        case 'simple':
            title = 'A simple example';
            Example = Simple;
            break;
        case 'expandable':
            title = 'Expandable content';
            Example = Expandable;
            break;
        case 'full':
            title = 'Full options enabled';
            Example = Full;
            break;
        case 'skins':
            title = 'Choosing different skins';
            Example = Skins;
            break;            
        default:
            break;
    }

    if(Example)
    {
        fetch(`${process.env.PUBLIC_URL}/examples/${props.match.params.example}.jsx`)
            .then(response => response.text())
            .then(content => setCode(content));
    }

    return (
        <>
            <h1>{title}</h1>
            <Example />

            <h1 style={{marginTop:'20px'}}>Code</h1>
            <SyntaxHighlighter language="javascript|html" style={tomorrowNight}>
                {code}
            </SyntaxHighlighter>
        </>
    );
}

export default Examples;