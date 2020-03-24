import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

const Paging = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ dataCount, setDataCount ] = useState(0);
  const [ pageNr, setPageNr ] = useState(1);
  const [ pageSize, setPageSize ] = useState(10);

  const loadData = (pageSize, pageNr) => {
    _data.get(
    {
        url: `${process.env.PUBLIC_URL}/data/generated_simple.json`,
        pageNr: pageNr,
        pageSize: pageSize
    }, (data, count) => {
      setData(data);
      setDataCount(count);
      setPageNr(pageNr);
      setPageSize(pageSize);
      setLoading(false);
    });
  }

  useEffect(() => {
      loadData(pageSize, pageNr);
  }, [pageNr, pageSize]);

  return (
    <Grid 
      loading={loading}
      data={data}
      dataCount={dataCount}
      pageNr={pageNr}
      pageSize={pageSize}
      className='example-grid'
      onStateChange={newState =>
        loadData(newState.pageSize, newState.pageNr)
      }
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

export default Paging;
