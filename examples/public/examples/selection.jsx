import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

const Selection = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ selectionInfo, setSelectionInfo ] = useState({});

  useEffect(() => {
      _data.get(
          {
              url: `${process.env.PUBLIC_URL}/data/generated_simple.json`,
              pageNr: 1,
              pageSize: 10
          }, (data) => {
            setData(data);
            setLoading(false);
          }
      );
  }, []);

  let onSelectionChange = (selectedKeys, selectedItems, selectedLast) => {
    setSelectionInfo({
        selectedKeys : selectedKeys,
        selectedItems: (selectedItems.length === 1) ? selectedItems : '... all data available here ...',
        selectedLast : selectedLast
      })
    };

  return (
    <>
      <div style={{ float: 'left' }}>
        <Grid 
          loading={loading}
          data={data}
          keyField='guid'
          className='example-grid'
          isSelectable
          onSelectionChange={onSelectionChange}
        > 
          <Column header='Id' className='left' field='guid' />
          <Column header='Name' className='bold' field='name' />
          <Column header='Company' className='bold' field='company' />
          <Column header='Age' field='age' />
          <Column header='Phone' className='italic' field='phone' />
          <Column 
                header='Email' 
                field='email'
                renderer={item => {
                  return <a href={`mailto:${item.email}`}>{item.email}</a>;
                }}
          />
        </Grid>
      </div>
      <div className='info'>
        <b>Clicked cell:</b> 
        <pre>
          {JSON.stringify(selectionInfo, null, 4)}
        </pre>
      </div>
    </>
  );
};

export default Selection;