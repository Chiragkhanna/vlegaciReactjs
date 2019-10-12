import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { subComponent } from './controlTableSetup';

const response = {
    initial_data: [
        {
            "Run": 1,
            "User": "x",
            "Program": "FO0200    ",
            "Timestamp": "6/15/2019  10:34:05 AM",
            "Screen Capture Location": "c:/profile/screencaptures/FO0200D.FO020012.5.jpg",

        }, {
            "Run": 2,
            "User": "x",
            "Program": "FO0200    ",
            "Timestamp": "6/15/2019  10:34:05 AM",
            "Screen Capture Location": "c:/profile/screencaptures/FO0200D.FO020012.5.jpg",
        },
        {
            "Run": 11,
            "User": "xyz",
            "Program": "FO0200    ",
            "Timestamp": "6/15/2019  10:34:05 AM",
            "Screen Capture Location": "c:/profile/screencaptures/FO0200D.FO020012.5.jpg",
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
                    Cell: ({ original }) => {
                        return (
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={this.state.selected[original.Run] === true}
                                onChange={() => this.toggleRow(original.Run)}
                            />
                        );
                    },
                    Header: " ",
                    sortable: false,
                    width: 60
                };
            else {
                let curWidth = data.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
                console.log(curWidth);
                return {
                    Header: key,
                    accessor: key,
                    minWidth: curWidth != undefined && curWidth > 20 ? 250 : 100
                }
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