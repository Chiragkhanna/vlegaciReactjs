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
        super(props);
        this.state = {
            selected: {},
            selectAll: 0,
            products: this.props.products
        }
        this.toggleRow = this.toggleRow.bind(this);
    }
    toggleRow(title) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[title] = !this.state.selected[title];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    render() {
        const data = response.initial_data;
        const defaultExpandedRows = response.initial_data.map((element, index) => { return { index: true } });
        const columns = Object.keys(Object.assign({ "base": 1 }, response.initial_data[0])).map((key, id) => {
            if (key == "base")
                return {
                    id: "checkbox",
                    accessor: "",
                    Cell: (rowInfo) => {
                        return (
                            <Checkbox
                                type="checkbox"
                                className="checkbox"
                                checked={this.state.selected[rowInfo.original.title.props.children] === true}
                                onChange={() => this.toggleRow(rowInfo.original.title.props.children)}
                            />
                        );
                    },
                    Header: " ",
                    sortable: false,
                    width: 45
                };
            else
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