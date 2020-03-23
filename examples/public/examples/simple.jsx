import React from 'react';
import { Grid, Column } from 'react-digital-grid';

const Simple = () => {
  const data = [
    { Id: 1, FirstName: 'Jane', LastName: 'Down', Email: 'jane.down@unknown.com', Age: 26 },
    { Id: 2, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@unknown.com', Age: 41 }
  ];

  return (
    <Grid data={data}> 
      <Column header='Id' field='Id' />
      <Column header='First Name' className='bold' field='FirstName' />
      <Column header='Last Name' field='LastName' />
      <Column header='Age' field='Age' />
      <Column 
            header='Email' 
            field='Email'
            renderer={item => {
              return <a href={`mailto:${item.Email}`}>{item.Email}</a>;
            }}
      />
    </Grid>
  );
};

export default Simple;
