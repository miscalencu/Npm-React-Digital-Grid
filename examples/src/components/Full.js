import React, { Component } from 'react';
import { Grid, Column } from 'react-digital-grid';
import { _data } from 'scripts/all';

export default class Full extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            count: null,
            pageSize: 10,
            pageNr: 1
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData(this.state.pageSize, this.state.pageNr);
    }

    loadData(pageSize, pageNr, orderBy, orderDir) {
        this.setState({ 
            loading: true 
            },
            _data.get({
                url: '/data/generated.json',
                pageNr: pageNr,
                pageSize: pageSize
            }, (data, count) => {
                this.setState({
                    data: data,
                    loading: false,
                    dataCount: count,
                    pageNr: pageNr,
                    pageSize: pageSize
                })
            })
        );
    }

    render() {
        return (
            <Grid 
                id="full"
                loading={this.state.loading}
                emptyText="No data to display at this point."
                data={this.state.data}
                dataCount={this.state.dataCount}
                pageNr={this.state.pageNr}
                pageSize={this.state.pageSize}
                onStateChanged={(newState) => this.loadData(newState.pageSize, newState.pageNr, newState.orderBy, newState.orderDir)}>
                    <Column header="Picture" field="picture" className="center" renderer={(item) => {
                        return (
                            <img src={item.picture} className="profilepic" alt={item.name} />
                        );
                    }}>
                    </Column>
                    <Column header="Name" field="name" className="bold"></Column>
                    <Column header="Gender" field="gender"></Column>
                    <Column header="Eye Color" field="eyeColor"></Column>
                    <Column header="Age" field="age" className="bold"></Column>
                    <Column header="Address" field="address" className="italic"></Column>
                    <Column header="Phone" field="phone"></Column>
            </Grid>
        );
    };
};