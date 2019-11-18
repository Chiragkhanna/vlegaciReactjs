import React from "react"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchNoteJson } from './operations';
import { NOTES_DATA_API_URL } from '../../config/config';
import Table from '../../components/table';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
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
        if (this.props.notesData.length === 0) {
            this.props.fetchData(NOTES_DATA_API_URL);
        }
    }

    render() {
        if (this.props.pending || this.props.notesData.length === 0) {
            return <div className="col">Loading... {this.props.pending}</div>;
        }
        return (
            <div className="container">
                <div className="col p_50">
                    <p> Below you can see all notes saved for different section for RunId </p>
                    <div className="card ">
                        <div onClick={(e) => this.togglePanel(e)} className='card-header'>
                            {this.state.open ? (
                                <i className="fa fa-fw fa-chevron-down"></i>
                            ) : <i className="fa fa-fw fa-chevron-right"></i>}
                            {"Notes"}</div>
                        {this.state.open ? (
                            <div className="controlTable">
                                <Table data={this.props.notesData} sectionName={"Notes"} />
                            </div>
                        ) : null}


                    </div></div></div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        notesData: state.noteReducer.notesData,
        pending: state.noteReducer.showSpinner,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData: fetchNoteJson
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Note);
