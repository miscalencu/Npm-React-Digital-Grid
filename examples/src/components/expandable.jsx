import React from 'react';
import { Grid, Column } from 'react-digital-grid';

const Expandable = () => {
  const data = [
    { Id: 1, Column1: 'Jane', Column2: 'Doe' },
    { Id: 2, Column1: 'John', Column2: 'Doe' }
  ];

  return (
    <Grid
      data={data}
      isExpandable={true}
      expandedRowContent={row => (
        <>
          <p>This is some content for row: {row.Id}</p>
          <p>You can add even another grid here.</p>
        </>
      )}
    >
      <Column header='Id' field='Id'></Column>
      <Column header='Column 1' field='Column1'></Column>
      <Column header='Column 2' field='Column2'></Column>
    </Grid>
  );
};

export default Expandable;
