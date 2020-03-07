import React, { useState } from 'react';
import Simple from './examples/simple';
import Expandable from './examples/expandable';
import Full from './examples/full';

const Examples = (props) => {

    let Example = null;
    let title = 'Not found';
    const [ code, setCode ] = useState("Loading source code...");

    switch(props.match.params.example) {
        case 'simple':
            title = 'Simple example';
            Example = Simple;
            break;
        case 'expandable':
            title = 'Expandable example';
            Example = Expandable;
            break;
        case 'full':
            title = 'Full options example';
            Example = Full;
            break;
        default:
            break;
    }

    if(Example)
    {
        fetch(`${process.env.PUBLIC_URL}/examples/${props.match.params.example}.txt`)
            .then(response => response.text())
            .then(content => setCode(content));
    }

    return (
        <>
            <h1>{title}</h1>
            <Example />

            <h1 style={{marginTop:'20px'}}>Code</h1>
            <pre>
                {code}
            </pre>
        </>
    );
}

export default Examples;