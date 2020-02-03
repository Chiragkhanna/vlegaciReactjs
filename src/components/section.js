import React from "react"
import Table from "./table";
import Dbtable from "./dbtable";
import ImageTable from "./imagetable";
import ErrorBoundary from "./errorboundary";
import { updateNoteJson, deleteNoteJson, addNoteJson } from "../containers/notes/operations";
import { updateNote, deleteNote, addNote } from "../containers/notes/actions";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const groupBy = (items, key) => items.reduce(
    (result, item) =>
        Object.assign(result, { [item[key]]: (result[item[key]] || []).concat(item) }),
    {},
);

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    /**
     * Here, we define a react lifecycle method that gets executed each time 
     * our component is mounted to the DOM, which is exactly what we want in this case
     */
    componentDidMount() {

    }

    render() {
        const sectionTitle = this.props.sectionTitle
        let sectionData;
        if (this.props.sectionTitle === "DatabaseOutput") {

            let subTypeData = groupBy(this.props.sectionData, 'JOOBJ');
            let renderSubSection = [];
            for (var prop in subTypeData) {
                if (Object.prototype.hasOwnProperty.call(subTypeData, prop)) {
                    renderSubSection.push(<div key={"ct_" + prop}> <div className="databaseSubSectionDivider" >  </div> <h6 className="databaseSubSectionHeading">{prop}</h6> <div className="controlTable"><ErrorBoundary><Dbtable data={subTypeData[prop]} /></ErrorBoundary> </div> <br /></div>);
                }
            }
            sectionData =
                <div className="card">
                    <div onClick={(e) => this.togglePanel(e)} className='card-header'>
                        {this.state.open ? (
                            <i className="fa fa-fw fa-chevron-down"></i>
                        ) : <i className="fa fa-fw fa-chevron-right"></i>}
                        {sectionTitle}</div>
                    {this.state.open ? (

                        renderSubSection.map((t, i) => <ErrorBoundary key={"subSectionError_" + i}>
                            <div key={"subSection_" + i}>  {t}</div> </ErrorBoundary>)

                    ) : null}
                </div>;
        }
        else if (this.props.sectionTitle === "ScreenCapture") {
            sectionData = <div className="card">
                <div onClick={(e) => this.togglePanel(e)} className='card-header'>
                    {this.state.open ? (
                        <i className="fa fa-fw fa-chevron-down"></i>
                    ) : <i className="fa fa-fw fa-chevron-right"></i>}
                    {sectionTitle}</div>
                {this.state.open ? (
                    <ErrorBoundary>
                        <div className="controlTable">
                            <ImageTable data={this.props.sectionData} />
                        </div>
                    </ErrorBoundary>
                ) : null}

            </div>
        }
        else {
            sectionData = <div className="card">
                <div onClick={(e) => this.togglePanel(e)} className='card-header'>
                    {this.state.open ? (
                        <i className="fa fa-fw fa-chevron-down"></i>
                    ) : <i className="fa fa-fw fa-chevron-right"></i>}
                    {sectionTitle}</div>
                {this.state.open ? (
                    <ErrorBoundary>
                        <div className="controlTable">
                            <Table data={this.props.sectionData} sectionName={this.props.sectionTitle} updateTableData={this.props.updateNoteDataInStore}
                                addTableData={this.props.addNoteDataInStore} deleteTableData={this.props.deleteNoteDataInStore} />
                        </div>
                    </ErrorBoundary>
                ) : null}


            </div>
        }
        return (
            <div className="card"> {sectionData} </div>
        )
    }
}


// const mapDispatchToProps = dispatch => {
//     return {
//         // dispatching actions returned by action creators
//         updateRunDataInStore: (e, val) => dispatch(updateRunDataInStore(val))
//     }
// }
// const mapDispatchToProps = dispatch => ({
//     updateRunDataInStore: (e, val) => {
//         dispatch(updateRunDataInStore(val));
//         dispatch(updateNote(val));
//     },
//     deleteNoteDataInStore: (e, val) => {
//         dispatch(updateRunDataInStore(val));
//         dispatch(deleteNote(val));
//     },
//     addNoteDataInStore: (e, val) => {
//         dispatch(updateRunDataInStore(val));
//         dispatch(updateNote(val));
//     },
// });
const mapDispatchToProps = dispatch => bindActionCreators({
    updateNoteDataInStore: updateNoteJson,
    deleteNoteDataInStore: deleteNoteJson,
    addNoteDataInStore: addNoteJson
}, dispatch)

export default connect(null, mapDispatchToProps)(Section);