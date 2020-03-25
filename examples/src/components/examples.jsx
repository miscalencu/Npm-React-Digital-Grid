import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import Simple from './examples/simple';
import Skins from './examples/skins';
import Paging from './examples/paging';
import Expandable from './examples/expandable';
import Sorting from './examples/sorting';
import Events from './examples/events';
import Selection from './examples/selection';
import Full from './examples/full';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faTimes } from '@fortawesome/free-solid-svg-icons';

import { _data } from 'scripts/all';

const Examples = (props) => {

    let { example } = props.match.params;
    let Example = null;
    let title = 'Not found';
    const [ code, setCode ] = useState("Loading source code...");
    const [ modalShow, setModalShow ] = useState(false);
    const [ modalDataShow, setModalDataShow ] = useState(false);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/examples/${example}.jsx`)
            .then(response => response.text())
            .then(content => {
                setCode(content);
                _data.get(
                    {
                        url: `${process.env.PUBLIC_URL}/data/${example === 'full' ? 'generated.json' : 'generated_simple.json'}`,
                        pageNr: 1,
                        pageSize: 10,
                        orderBy: '?',
                        orderDir: 'ASC'
                    }, (data) => setData(data)
                );
            });
    }, [example]);

    switch(example) {
        case 'simple':
            title = 'Simple, basic';
            Example = Simple;
            break;
        case 'skins':
            title = 'Different skins';
            Example = Skins;
            break;
        case 'paging':
            title = 'Pagination';
            Example = Paging;
            break;  
        case 'expandable':
            title = 'Expandable content';
            Example = Expandable;
            break;
        case 'sorting':
            title = 'Sorting columns';
            Example = Sorting;
            break;
        case 'events':
            title = 'Available events';
            Example = Events;
            break;
        case 'selection':
            title = 'Rows selection';
            Example = Selection;
            break;
        case 'full':
            title = 'Full options enabled';
            Example = Full;
            break;
        default:
            return null;
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
            <h1>
                {title}
                <button onClick={() => setModalDataShow(true)} style={{ marginLeft: '5px' }}>
                    Show Data Preview <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
                </button>
            </h1>
            <Example />
            <h1 style={{padding: '30px 0 5px 0', clear: 'both'}}>
                Grid Code
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
            >
                <button onClick={() => setModalShow(false)}>
                    Close Full Page Source Code <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
                <SyntaxHighlighter language="javascript|html" style={tomorrowNight}>
                    {code}
                </SyntaxHighlighter>
            </Modal>

            <Modal
                isOpen={modalDataShow}
                onRequestClose={() => setModalDataShow(false)}
                style={{ content: {top: '85px', padding: '5px' }}}
            >
                <button onClick={() => setModalDataShow(false)}>
                    Close Data Preview <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>
                <SyntaxHighlighter language="json" style={tomorrowNight}>
                    {JSON.stringify(data, 0, 4)}
                </SyntaxHighlighter>
            </Modal>
        </>
    );
}

export default Examples;