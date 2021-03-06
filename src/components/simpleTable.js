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

class SimpleTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            row: [],
            show: false,
            selectedRow: {}
        }
    }

    handleButtonClick = (e, row) => {
        this.setState({ visible: true });
        this.setState({ show: true });
    };
    render() {

        const data = this.props.data;
        console.log(data[0]);
        const columns = Object.keys(data[0]).map((key, id) => {
            let curWidth = data.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
            if (key === "notes") {
                return {
                    Header: key,
                    id: key,

                    accessor: data => {
                        let output = [];
                        data.notes.map(book => {
                            output.push(book.note);
                        });
                        return output.join(', ');
                    },
                    minWidth: curWidth !== undefined && curWidth > 20 ? curWidth * 12 : 100,
                    className: "sticky",
                    headerClassName: "sticky",

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


                }
        });
        let renderComp = <span><ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            minRows={1}
            manual
            className="-striped -highlight runTable"

        />


        </span>
        return (renderComp
        );
    }
}

export default SimpleTable;