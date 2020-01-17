import React, { Component } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

export default class Full extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gridData: {
                dataItems: []
            }
        };

        this.loadData = this.loadData.bind(this);

        this.loadData();
    }

    loadData() {
        _data.get({
            url: '/data/generated.json',
            pageNr: 1,
            pageSize: 20
        }, (data) => {
            this.setState({
                gridData: {
                    dataItems: data
                },
                loading: false
            })
        });
    }

    render() {

        return (
            <Grid 
                id="full"
                loading={this.state.loading}
                emptyText="No data to display at this point."
                gridData={this.state.gridData}>
                    <Column header="Name" dataField="name"></Column>
                    <Column header="Gender" dataField="gender"></Column>
                    <Column header="Eye Color" dataField="eyeColor"></Column>
                    <Column header="Picture" dataField="picture" renderer={(item) => {
                        return (
                            <img src={item.picture} className="profilepic" />
                        );
                    }}></Column>
            </Grid>
        );
    };
};