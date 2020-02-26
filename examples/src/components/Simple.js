import React from 'react';
import { Grid, Column } from 'react-digital-grid';

const Simple = () => {
  const gridData = {
    dataItems: [
      { Id: 1, FirstName: 'George', LastName: 'Miscalencu' },
      { Id: 2, FirstName: 'John', LastName: 'Doe' }
    ]
  };

  return (
    <Grid data={gridData.dataItems}>
      <Column header='Id' dataField='Id'></Column>
      <Column header='First Name' dataField='FirstName'></Column>
      <Column header='Last Name' dataField='LastName'></Column>
    </Grid>
  );
};

export default Simple;
