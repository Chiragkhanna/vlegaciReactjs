import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { subComponent } from './controlTableSetup';

const response = {
    initial_data: [
        {
            "Run": 1,
            "User Data 4": "x",
            "User Data 5": "",
            "Screen Capture": "No",
            "Name": "Abcd",
            // "types": [
            //     {
            //         "name": 'basketball',
            //         "id": '1'
            //     },
            //     {
            //         "name": 'soccer',
            //         "id": '2'

            //     }]
        }, {
            "Run": 1,
            "User Data 4": "x",
            "User Data 5": "",
            "Screen Capture": "Yes - 2",
            "Name": "Abcd",
            // "types": [
            //     {
            //         "name": 'basketball',
            //         "id": '1'
            //     },
            //     {
            //         "name": 'soccer',
            //         "id": '2'

            //     }]
        },
        {
            "Run": 11,
            "User Data 4": "x",
            "User Data 5": "",
            "Screen Capture": "Yes",
            "Name": "Axyz",
            // "types": [
            //     {
            //         "name": 'basketball',
            //         "id": '1'
            //     },
            //     {
            //         "name": 'soccer',
            //         "id": '2'

            //     }]
        }]
};

class ControlTable extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor

    }
    render() {
        const data = response.initial_data;
        const defaultExpandedRows = response.initial_data.map((element, index) => { return { index: true } });
        const columns = Object.keys(response.initial_data[0]).map((key, id) => {
            return {
                Header: key,
                accessor: key,
                minWidth: 200
            }
        });

        return <ReactTable
            data={data}
            columns={columns}
            defaultExpanded={defaultExpandedRows}
            showPagination={false}
            minRows={1}
            className="-striped -highlight"
            //SubComponent={subComponent}
            SubComponent={(v) => <div style={{ padding: '10px' }}>Hello {v.row._index}</div>}
        />
    }
}

export default ControlTable;