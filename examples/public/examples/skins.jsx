import React, { useState } from 'react';
import { Grid, Column } from 'react-digital-grid';
import '../../styles/bootstrap-ui.css'

const Skins = () => {

  const data = [
    { Id: 1, FirstName: 'Jane', LastName: 'Down', Email: 'jane.down@unknown.com', Age: 26 },
    { Id: 2, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@unknown.com', Age: 41 }
  ];

  const skins = [
    { val: '', text: 'None' },
    { val: 'default', text: 'Default Skin' },
    { val: 'bootstrap', text: 'Bootstrap' }
  ];

  const [ skin, setSkin ] = useState('default');

  return (
    <>
      <div className='form'>
        <div className='form-group'>
          <label>Skin</label>
          <select value={skin} onChange={e => setSkin(e.target.value)}>
            {skins.map(option => {
              return (
                <option key={option.val} value={option.val}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className={ skin === "bootstrap" ? "bootstrap-ui" : ""}>
        <Grid 
          data={data}
          skin={skin}> 
          <Column header='Id' field='Id' />
          <Column header='First Name' field='FirstName' />
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
      </div>
    </>
  );
};

export default Skins;
