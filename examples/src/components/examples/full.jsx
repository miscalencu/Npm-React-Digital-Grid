import React, { Component } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';
import '../../styles/bootstrap-ui.css'

export default class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      count: null,
      pageSize: 10,
      pageNr: 1,
      skin: 'default',

      skins: [
        { val: '', text: 'None' },
        { val: 'default', text: 'Default Skin' },
        { val: 'bootstrap', text: 'Bootstrap' }
      ]
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData(this.state.pageSize, this.state.pageNr);
  }

  loadData(pageSize, pageNr, orderBy, orderDir) {
    this.setState(
      {
        loading: true
      },
      _data.get(
        {
          url: `${process.env.PUBLIC_URL}/data/generated.json`,
          pageNr: pageNr,
          pageSize: pageSize,
          orderBy: orderBy,
          orderDir: orderDir
        },
        (data, count) => {
          this.setState({
            data: data,
            loading: false,
            dataCount: count,
            pageNr: pageNr,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir
          });
        }
      )
    );
  }

  render() {
    return (
      <>
        <div className='form'>
          <div className='form-group'>
            <label>Skin</label>
            <select value={this.state.skin} onChange={e => this.setState({ skin: e.target.value })}>
              {this.state.skins.map(option => {
                return (
                  <option key={option.val} value={option.val}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className={ this.state.skin === "bootstrap" ? "bootstrap-ui" : ""}>
          <Grid
            id='full'
            skin={this.state.skin}
            loading={this.state.loading}
            emptyText='No data to display at this point.'
            data={this.state.data}
            dataCount={this.state.dataCount}
            pageNr={this.state.pageNr}
            pageSize={this.state.pageSize}
            orderBy={this.state.orderBy}
            orderDir={this.state.orderDir}
            onStateChanged={newState =>
              this.loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)
            }
          >
            <Column
              header='Picture'
              field='picture'
              className='center'
              renderer={item => {
                return <img src={item.picture} className='profilepic' alt={item.name} />;
              }}
            ></Column>
            <Column header='Name' field='name' className='bold' sortable={true}></Column>
            <Column header='Gender' field='gender'></Column>
            <Column header='Eye Color' field='eyeColor'></Column>
            <Column header='Age' field='age' className='bold' sortable={true}></Column>
            <Column header='Address' field='address' className='italic'></Column>
            <Column header='Phone' field='phone'></Column>
          </Grid>
        </div>
      </>
    );
  }
}
