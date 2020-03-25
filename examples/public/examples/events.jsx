import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

const Events = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ selectedData, setSelectedData ] = useState({});

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

  const handleOnCellClick = (field, valPlain, dataItem, ev) => {
    setSelectedData({
      field: field,
      valPlain: valPlain,
      dataItem: dataItem
    });
  }

  return (
    <>
      <div style={{ float: 'left' }}>
        <Grid 
          loading={loading}
          data={data}
          className='example-grid'
          onCellClick={handleOnCellClick}
        > 
          <Column header='Id' isClickable className='left link' field='guid' />
          <Column header='Name' isClickable className='bold link' field='name' />
          <Column header='Company' isClickable className='bold link' field='company' />
          <Column header='Age' isClickable className='link' field='age' />
          <Column header='Phone' isClickable className='italic link' field='phone' />
          <Column 
            isClickable
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
          {JSON.stringify(selectedData, null, 4)}
        </pre>
      </div>
    </>
  );
};

export default Events;