import React, { Component } from 'react';
import { Grid, Column } from 'react-digital-grid';

export default class Simple extends Component {

    render() {
        let data = [
                { Id: 1, FirstName: 'George', LastName: 'Miscalencu' },
                { Id: 2, FirstName: 'John', LastName: 'Doe' }
        ];

        return (
            <Grid 
                data={data}>
                    <Column header="Id" field="Id"></Column>
                    <Column header="First Name" field="FirstName"></Column>
                    <Column header="Last Name" field="LastName"></Column>
            </Grid>
        );
    };
};