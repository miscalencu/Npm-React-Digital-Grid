import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

const Expandable = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

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
  return (
    <Grid
      data={data}
      loading={loading}
      isExpandable={true}
      className='example-grid'
      expandedRowContent={row => (
        <>
          <p>This is some content for row: {row.guid}</p>
          <p>The entire data item is available.</p>
          <p>You can add even another grid here.</p>
        </>
      )}
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
  );
};

export default Expandable;
