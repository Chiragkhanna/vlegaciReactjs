import React, { Component } from 'react'
import ReactTable from 'react-table'
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

class Dbtable extends Component {

    render() {
        let data = this.props.data;
        data = data.map(({ SubType, ...keepAttrs }) => keepAttrs)
        const dataKeys = Object.keys(data[0])
        for (let i = 0; i < data.length - 1; i++) {
            let isUBPresent = false;
            for (const key of dataKeys) {
                if (key === "JOENTT" && data[i][key] === "UB")
                    isUBPresent = true;
                if (isUBPresent && data[i][key] !== data[i + 1][key]) {
                    data[i]["ColorForCell"] = data[i]["ColorForCell"] + "," + key;
                    data[i + 1]["ColorForCell"] = data[i + 1]["ColorForCell"] + "," + key;
                }

            }

        }
        //iterate the array and fill new property named ColorForCell
        // If the value is UB, starting with cell AB on that row,
        //go through each cell to the end, and compare UBrow to UBrow+1 - if the values are different color them blue
        const columns = Object.keys(data[0]).map((key, index) => {
            let curWidth = data.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
            if (key === "ColorForCell") {
                return {
                    Header: key,
                    accessor: key,
                    minWidth: curWidth !== undefined && curWidth > 20 ? curWidth * 14 : 100,
                    className: "displayNothing",
                    headerClassName: "displayNothing",

                };
            }
            else if (index > 6) {
                // color coding if value mismatch between 2 rows data
                return {
                    Header: key,
                    accessor: key,
                    minWidth: curWidth !== undefined && curWidth > 20 ? curWidth * 14 : 100,
                    //minWidth: curWidth !== undefined && curWidth > 50 ? curWidth * 2.5 : 100,
                    className: "sticky",
                    headerClassName: "sticky",
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            switch (rowInfo.row.JOENTT) {
                                case 'PL':
                                    return {
                                        style: {
                                            background: "RGB(226, 239, 218)"
                                        }
                                    }
                                case 'PT':
                                    return {
                                        style: {
                                            background: "RGB(226, 239, 218)"
                                        }
                                    }
                                case 'DL':
                                    return {
                                        style: {
                                            background: "RGB(252, 228, 214)"
                                        }
                                    }
                                case 'UB':
                                    if (rowInfo && rowInfo.row && rowInfo.row.ColorForCell && rowInfo.row.ColorForCell.includes(key)) {
                                        return {
                                            style: {
                                                background: "RGB(217, 225, 242)"
                                            }
                                        }
                                    } else return {
                                        style: {
                                            background: null
                                        }
                                    }
                                default:
                                    return {
                                        style: {
                                            background: null
                                        }
                                    }
                            }

                        }
                        else return {
                            style: {
                                background: null
                            }
                        }

                    }
                }
            }
            else
                return {
                    Header: key,
                    accessor: key,
                    minWidth: curWidth !== undefined && curWidth > 50 ? curWidth * 2.5 : 100,
                    className: "sticky",
                    headerClassName: "sticky",
                    // Cell: props => key == 'TDSRCDTA' ? <div className='TDSRCDATA'><span >{props.value}</span></div> : <span>{props.value}</span>
                }
        });
        return <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            minRows={1}
            manual
            className="-striped -highlight runTable"

        />
    }
}

export default Dbtable;