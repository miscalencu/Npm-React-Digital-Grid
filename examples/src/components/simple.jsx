import React from 'react';
import { Grid, Column } from 'react-digital-grid';

const Simple = () => {
  const data = [
    { Id: 1, FirstName: 'George', LastName: 'Miscalencu' },
    { Id: 2, FirstName: 'John', LastName: 'Doe' }
  ];

  return (
    <Grid data={data}>
      <Column header='Id' field='Id'></Column>
      <Column header='First Name' field='FirstName'></Column>
      <Column header='Last Name' field='LastName'></Column>
    </Grid>
  );
};

export default Simple;
