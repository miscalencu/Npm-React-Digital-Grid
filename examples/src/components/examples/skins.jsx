import React, { useState, useEffect } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';
import '../../styles/bootstrap-ui.css'

const Skins = () => {

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

  const skins = [
    { val: 'none', text: 'None' },
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
          loading={loading}
          skin={skin}
          data={data}
          className='example-grid'
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
    </>
  );
};

export default Skins;
