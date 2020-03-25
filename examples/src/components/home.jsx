import React from 'react';
import PageLink from './../components/_common/pageLink';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs';

//import Markdown from 'react-markdown';

const Home = () => {

  /*
  let [ markDown, setMarkDown ] = useState('');

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/miscalencu/Npm-React-Digital-Grid/master/README.md?token=ACYBHE66BT6CPMEERF3AVTK6POP5M`)
    .then(response => response.text())
    .then(content => setMarkDown(content));
  }, []);
  */

  return (
    <>
      <h1>Welcome to the React Digital Grid component</h1>
      <p>This is a React DataGrid component with features like:</p>
      <ul>
        <li><PageLink to={`/examples/simple`}>flexible formatting</PageLink></li>
        <li><PageLink to={`/examples/skins`}>skins</PageLink></li>
        <li><PageLink to={`/examples/paging`}>pagination</PageLink></li>
        <li><PageLink to={`/examples/sorting`}>sorting</PageLink></li>
        <li><PageLink to={`/examples/expandable`}>expandable content</PageLink></li>
        <li><PageLink to={`/examples/selection`}>selection</PageLink></li>
        <li><PageLink to={`/examples/events`}>events</PageLink></li>
      </ul>
      <p>You can checkout the <PageLink to={`/examples/full`}>full features here.</PageLink></p>
      <h1>How to install it</h1>
      <pre className='code'>
          npm install --save react-digital-grid
      </pre>
      <h1>How to use it</h1>
      <SyntaxHighlighter language="javascript|html" style={foundation}>
        { `
  <Grid 
    data={data}
  > 
    <Column header='Id' className='left' field='guid' />
    <Column header='Name' className='bold' field='name' />
    <Column header='Company' className='bold' field='company' />
    <Column 
          header='Email' 
          field='email'
          renderer={item => {
            return <a href={\`mailto:\${item.email}\`}>{item.email}</a>;
          }}
    />
  </Grid>
          `
        }
      </SyntaxHighlighter>
      <h1>Documentation</h1>
      <p>
        You can find a  list with all the supported parameters at: <br />
        <a href="https://github.com/miscalencu/Npm-React-Digital-Grid#parameters">https://github.com/miscalencu/Npm-React-Digital-Grid#parameters</a>
      </p>
    </>
  );
};

export default Home;
