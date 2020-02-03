import React, { Component } from 'react'
import ReactTable from 'react-table'
import BasicModal from './modals/basicmodal'
import 'react-table/react-table.css'
/* eslint-disable react/forbid-foreign-prop-types */
// @ts-ignore
delete ReactTable.propTypes.TableComponent;
// @ts-ignore
delete ReactTable.propTypes.TheadComponent;
// @ts-ignore
delete ReactTable.propTypes.TbodyComponent;
// @ts-ignore
delete ReactTable.propTypes.TrGroupComponent;
// @ts-ignore
delete ReactTable.propTypes.TrComponent;
// @ts-ignore
delete ReactTable.propTypes.ThComponent;
// @ts-ignore
delete ReactTable.propTypes.TdComponent;
// @ts-ignore
delete ReactTable.propTypes.TfootComponent;
// @ts-ignore
delete ReactTable.propTypes.FilterComponent;

// @ts-ignore
delete ReactTable.propTypes.PivotValueComponent;
// @ts-ignore
delete ReactTable.propTypes.AggregatedComponent;
// @ts-ignore
delete ReactTable.propTypes.PivotComponent;
// @ts-ignore
delete ReactTable.propTypes.PaginationComponent;
// @ts-ignore
delete ReactTable.propTypes.PreviousComponent;
// @ts-ignore
delete ReactTable.propTypes.NextComponent;
// @ts-ignore
delete ReactTable.propTypes.LoadingComponent;
// @ts-ignore
delete ReactTable.propTypes.NoDataComponent;
// @ts-ignore
delete ReactTable.propTypes.ResizerComponent;
// @ts-ignore
delete ReactTable.propTypes.PadRowComponent;
/* eslint-enable react/forbid-foreign-prop-types */

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            row: [],
            show: false,
            selectedRow: {}
        }
    }
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };
    onCloseTableData = (e, param) => {
        this.setState({
            show: !this.state.show
        });
    };
    onUpdateTableData = (e, param) => {
        // this.setState({
        //     show: !this.state.show
        // });
        this.props.updateTableData && this.props.updateTableData(e, param);
    };
    onAddTableData = (e, param) => {
        this.props.addTableData && this.props.addTableData(e, param);
    };
    onDeleteTableData = (e, param) => {
        this.props.deleteTableData && this.props.deleteTableData(e, param);
    };
    handleButtonClick = (e, row) => {
        this.setState({ visible: true });
        this.setState({ show: true });
    };
    render() {

        const data = this.props.data;
        console.log(data[0]);
        const columns = Object.keys(data[0]).map((key, id) => {
            let curWidth = data.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
            if (key === "note") {
                return {
                    Header: key,
                    accessor: key,
                    minWidth: 1,
                    className: "displayNothing",
                    headerClassName: "displayNothing",

                };
            }
            else
                return {
                    Header: key,
                    accessor: key,
                    //minWidth: curWidth !== undefined && curWidth > 50 ? curWidth * 2.5 : 100,
                    minWidth: curWidth !== undefined && curWidth > 20 ? curWidth * 12 : 100,
                    className: "sticky",
                    headerClassName: "sticky",
                    Cell: (props) => {
                        if (key === 'TDSRCDTA') return <div className='TDSRCDATA'><span >{props.value}</span></div>;
                        else if (key === 'RLSEQ' && props.original.note !== '') return <div > <span className='noteHighlight'>{props.value} * </span></div>;
                        else if (key === 'RLSEQ' && props.original.note === '') return <div >{props.value} </div>;
                        else return <span>{props.value}</span>
                    },

                    // getProps: (state, rowInfo) => {
                    //     if (rowInfo && rowInfo.row) {
                    //         switch (rowInfo.row.RLSEQ) {
                    //             case 'PL':
                    //                 return {
                    //                     style: {
                    //                         background: "RGB(226, 239, 218)"
                    //                     }
                    //                 }
                    //         }
                    //     }
                    // }
                }
        });
        let renderComp = <span><ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            minRows={1}
            manual
            className="-striped -highlight runTable"
            getTrProps={(state, rowInfo) => {
                if (rowInfo && rowInfo.row) {
                    return {
                        onClick: (e) => {
                            this.setState({
                                selected: rowInfo.index,
                                selectedRow: rowInfo.original
                            });
                            this.setState({ show: true });
                            this.handleButtonClick(e, rowInfo);
                        },
                        style: {
                            background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                            color: rowInfo.index === this.state.selected ? 'red' : 'black'
                        }
                    }
                } else {
                    return {}
                }
            }}
        />

            <BasicModal onClose={this.showModal} onSave={this.onUpdateTableData} onDelete={this.onDeleteTableData} onAdd={this.onAddTableData} onClose={this.onCloseTableData}
                show={this.state.show} sectionName={this.props.sectionName} data={this.state.selectedRow} >
                Message in Modal
        </BasicModal>

        </span>
        if (!this.state.show)
            renderComp = <span><ReactTable
                data={data}
                columns={columns}
                showPagination={false}
                minRows={1}
                manual
                className="-striped -highlight runTable"
                getTrProps={(state, rowInfo) => {
                    if (rowInfo && rowInfo.row) {
                        return {
                            onClick: (e) => {
                                this.setState({
                                    selected: rowInfo.index,
                                    selectedRow: rowInfo.original
                                });
                                this.setState({ show: true });
                                this.handleButtonClick(e, rowInfo);
                            },
                            style: {
                                background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                color: rowInfo.index === this.state.selected ? 'red' : 'black'
                            }
                        }
                    } else {
                        return {}
                    }
                }}
            />

                <BasicModal onClose={this.showModal} onSave={this.onUpdateTableData} onDelete={this.onDeleteTableData} onAdd={this.onAddTableData} onClose={this.onCloseTableData}
                    show={this.state.show} sectionName={this.props.sectionName} data={this.state.selectedRow} >
                    Message in Modal
            </BasicModal>

            </span>
        return (renderComp
        );
    }
}

export default Table;