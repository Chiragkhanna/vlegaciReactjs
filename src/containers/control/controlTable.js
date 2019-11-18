import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { handleTableCellClick } from "./tblFunction";
import { connect } from 'react-redux';
import { fetchControls, updateSelectedRun } from './fetchControls';
import { CONTROL_DATA_API_URL } from '../../config/config'

// @ts-ignore
delete ReactTable.propTypes.ExpanderComponent

class ControlTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            selectAll: 0,
            error: null,
            isLoaded: false,
            initial_data: [],
            expanded: {}
        }
        this.toggleRow = this.toggleRow.bind(this);
        this.handleTableCellClick = handleTableCellClick.bind(this);
        this.onExpandedChange = this.onExpandedChange.bind(this);
    }
    toggleRow(e, title) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const newSelected = Object.assign({}, this.state.selected);
        newSelected[title] = !this.state.selected[title];
        //this.props.selectedRunId = title;
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }
    toggleCheckbox(e) {
        //this.setState({ checkedRadio: e.target.value })
        this.props.updateRunId(e.target.value);
    };

    componentDidMount() {
        //this.ControlList();
        if (!this.props.controlList || !(this.props.controlList.length > 0)) {
            this.props.fetchData(CONTROL_DATA_API_URL);
        }

    }
    sum(vals) {
        return vals.reduce((x, y) => x + y, 0);
    }
    onExpandedChange(newExpanded) {
        this.setState({
            expanded: newExpanded
        });
    }

    render() {
        // const { initial_data } = this.state.initial_data;
        const { error, pending, controlList } = this.props;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (pending) {
            return <div>Loading... {this.props.pending}</div>;
        } else {
            let defaultExpandedRows = {};
            let columns = [], subcolumns = [];
            if (controlList !== undefined && controlList && controlList.length > 0) {
                defaultExpandedRows = controlList.map((element, index) => { return { index: true } });
                columns = Object.keys(Object.assign({ "base": 1 }, controlList[0])).filter(x => x !== "types").map((key, id) => {

                    if (key === "base")
                        return {
                            id: "checkbox",
                            accessor: "",
                            Cell: ({ original }) => {
                                return (
                                    <input type="radio" checked={this.props.selectedRunId === original.Run} ref={(el) => this["myRadioRef" + original.Run] = el} value={original.Run} onChange={(e) => { if (this.props.selectedRunId !== original.Run) this.props.updateRunId(original.Run) }} />
                                    // <input
                                    //     type="radio"
                                    //     className="checkbox"
                                    //     checked={original.isChecked}
                                    //     //checked={this.state.selected[original.Run] === true}
                                    //     onChange={(e) => this.toggleCheckbox(e, original.Run)}
                                    // />
                                );
                            },
                            Header: " ",
                            sortable: false,
                            width: 60
                        };
                    else {
                        let curWidth = controlList.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
                        subcolumns.push({
                            Header: key,
                            accessor: key,
                            minWidth: curWidth !== undefined && curWidth > 20 ? 250 : 100,
                            Cell: props => key === "Screen Capture Location" ? <span >{props.value}</span> : <span></span>,
                        });
                        return {
                            Header: key,
                            accessor: key,
                            minWidth: curWidth !== undefined && curWidth > 20 ? 250 : 100,

                        }
                    }

                });
            }
            if (columns.length === 0) {
                return <div> loading...</div>
            }
            else
                return <ReactTable
                    data={controlList}
                    columns={columns}
                    //defaultExpanded={defaultExpandedRows}
                    showPagination={false}
                    minRows={0}
                    className="-striped -highlight runTable"
                    getTrProps={(state, rowInfo, column) => {
                        if (rowInfo === undefined) {
                            return {}
                        }
                        return {
                            'data-qnt': rowInfo.original.types.length
                        }
                    }}
                    // onExpandedChange={newExpanded => this.onExpandedChange(newExpanded)}
                    // expanded={this.state.expanded}
                    //SubComponent={(v) => <div style={{ padding: '10px' }}>Hello {v.row._index}</div>}
                    SubComponent={row => {
                        // a SubComponent just for the final detail

                        if (row.original.types.length === 0) {
                            return null;
                        }
                        return (
                            <div style={{ padding: "10px" }}>
                                <ReactTable
                                    data={row.original.types || []}
                                    columns={subcolumns}
                                    showPagination={false}
                                    minRows={0}
                                    TheadComponent={_ => null}
                                />
                            </div>
                        );
                    }}
                />
        }
    }
}
const mapStateToProps = (state) => {
    return {
        controlList: state.controlReducer.controlList,
        error: state.error,
        pending: state.pending,
        selectedRunId: state.controlReducer.selectedRunId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            fetchData: fetchControls,
            updateRunId: updateSelectedRun
        }, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ControlTable);
//export default ControlTable;