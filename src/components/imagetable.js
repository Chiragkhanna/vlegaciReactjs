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

class ImageTable extends Component {

    render() {
        const data = this.props.data;
        const columns = Object.keys(data[0]).map((key, id) => {
            let curWidth = data.reduce((prev, current) => (prev > current[key].length) ? prev : current[key].length);
            return {
                Header: "",
                accessor: key,
                minWidth: curWidth !== undefined && curWidth > 20 ? curWidth * 14 : 100,
                className: "sticky",
                headerClassName: "sticky",
                Cell: props => key === 'Capture' ? <div className="imagecellOverflow"><img src={props.original.Capture} alt="" /></div> : <span>{"N/A"}</span>
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

export default ImageTable;