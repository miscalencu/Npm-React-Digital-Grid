import React, { Component } from 'react';
import { Grid, Column } from 'react-digital-grid';

export default class Simple extends Component {

    render() {

        let gridData = {
            dataItems: [
                { Id: 1, FirstName: 'George', LastName: 'Miscalencu' },
                { Id: 2, FirstName: 'John', LastName: 'Doe' },
            ]
        }

        return (
            <Grid 
                gridData={gridData}>
                    <Column header="Id" dataField="Id"></Column>
                    <Column header="First Name" dataField="FirstName"></Column>
                    <Column header="Last Name" dataField="LastName"></Column>
            </Grid>
        );
    };
};