import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

const Sorting = () => {

  const[ gridProps, setGridProps ] = useState({
      loading: true,
      data: [],
      dataCount: 0,
      pageNr: 1,
      pageSize: 10,
      orderBy: 'name',
      orderDir: 'ASC'
  });

  const loadData = (pageSize, pageNr, orderBy, orderDir) => {
    setGridProps(Object.assign(gridProps, { loading: true }));
    _data.get(
    {
        url: `${process.env.PUBLIC_URL}/data/generated_simple.json`,
        pageNr: pageNr,
        pageSize: pageSize,
        orderBy: orderBy,
        orderDir: orderDir
    }, (data, count) => {
      setGridProps({
        loading: false,
        data: data,
        dataCount: count,
        pageNr: pageNr,
        pageSize: pageSize,
        orderBy: orderBy,
        orderDir: orderDir
      })
    });
  }

  useEffect(() => {
      loadData(gridProps.pageSize, gridProps.pageNr, gridProps.orderBy, gridProps.orderDir);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid 
      {...gridProps}
      className='example-grid'
      onStateChange={newState =>
        loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)
      }
      > 
      <Column header='Id' sortable className='left' field='guid' />
      <Column header='Name' sortable className='bold' field='name' />
      <Column header='Company' sortable className='bold' field='company' />
      <Column header='Age' sortable field='age' />
      <Column header='Phone' sortable className='italic' field='phone' />
      <Column sortable
            header='Email' 
            field='email'
            renderer={item => {
              return <a href={`mailto:${item.email}`}>{item.email}</a>;
            }}
      />
    </Grid>
  );
};

export default Sorting;
