import React, { useState } from 'react';
import Modal from 'react-modal';

import Simple from './examples/simple';
import Skins from './examples/skins';
import Expandable from './examples/expandable';
import Full from './examples/full';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faTimes } from '@fortawesome/free-solid-svg-icons';

const Examples = (props) => {

    let Example = null;
    let title = 'Not found';
    const [ code, setCode ] = useState("Loading source code...");
    const [ modalShow, setModalShow ] = useState(false);

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

    Modal.setAppElement(document.getElementById('app'))

    const extractGrid = (code) => {

        let content = [];
        let start = false;
        let stop = false;
        code.split('\n').forEach(line => {
            if(line.indexOf('<Grid') !== -1) {
                content.push('');
                start = true;
            }
            if(start && !stop) 
                content.push(line);

            if(line.indexOf('</Grid') !== -1) {
                stop = true;
                content.push('');
                content.push('');
            }
        });

        return content.join('\n');
    }

    return (
        <>
            <h1>{title}</h1>
            <Example />
            <h1 style={{padding: '30px 0 5px 0', clear: 'both'}}>
                Code
                <button onClick={() => setModalShow(true)} style={{ marginLeft: '5px' }}>
                    Show Full Page Source Code <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
                </button>
            </h1>
            <SyntaxHighlighter language="javascript|html" style={tomorrowNight}>
                {extractGrid(code)}
            </SyntaxHighlighter>

            <Modal
                isOpen={modalShow}
                onRequestClose={() => setModalShow(false)}
                style={{ content: {top: '85px', padding: '5px' }}}
                contentLabel="Full Page Source Code"
            >
                <button onClick={() => setModalShow(false)}>
                    Close Full Page Source Code <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
                <SyntaxHighlighter language="javascript|html" style={tomorrowNight}>
                    {code}
                </SyntaxHighlighter>
            </Modal>
        </>
    );
}

export default Examples;