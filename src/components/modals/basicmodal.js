import React from "react";
import { connect } from 'react-redux';

class BasicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            textareaValue: '',
            noteseq: 0
        }
        this.state = { viewType: 'list' };//list , edit , new
        this.deletePost = this.deletePost.bind(this);
        this.handleUpdateClose = this.handleUpdateClose.bind(this);
        this.editPost = this.editPost.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.data.RLSEQ != nextProps.data.RLSEQ) {
            let noteList = []
            if (nextProps.data.note != '') {
                noteList = JSON.parse(nextProps.data.note);

            }
            this.setState({ rlseqNotes: noteList });
        }
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
    handleClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    handleUpdateClose = e => {
        this.setState({ viewType: 'list' });
    }
    handleAdd = e => {
        let updatedValue = this.state.rlseqNotes;
        if (updatedValue.length == 0) {
            updatedValue.push({
                "noteseq": 1,
                "note": this.state.textareaValue
            });
        }
        else {
            const maxSeq = updatedValue.reduce((prev, current) => (prev.noteseq > current.noteseq) ? prev : current)
            updatedValue.push({
                "noteseq": maxSeq.noteseq || 0 + 1,
                "note": this.state.textareaValue
            });
        }
        this.props.onAdd && this.props.onAdd(e, {
            "RLSEQ": this.props.data.RLSEQ, note: this.state.textareaValue, selectedRunId: this.props.selectedRunId,
            partialURL: "/" + this.props.selectedRunId + "/" + this.props.data.RLSEQ
        });
        this.setState({ viewType: 'list', rlseqNotes: updatedValue, textareaValue: '' });

    };
    handleUpdate = e => {
        let updatedValue = this.state.rlseqNotes.map(p =>
            p.noteseq === this.state.noteseq
                ? { ...p, note: this.state.textareaValue }
                : p
        );
        // this.props.data["note"] = this.state.textareaValue;
        // this.props.data["sectionName"] = this.props.sectionName;
        this.props.onSave && this.props.onSave(e, {
            "RLSEQ": this.props.data.RLSEQ, note: this.state.textareaValue, noteseq: this.state.noteseq, notes: updatedValue,
            partialURL: "/" + this.props.selectedRunId + "/" + this.props.data.RLSEQ + "/" + this.state.noteseq
        });
        this.setState({ viewType: 'list', rlseqNotes: updatedValue, textareaValue: '' });
    };
    handleOnChange(event) {
        this.setState({
            textareaValue: event.target.value
        })
    }
    deletePost = (noteId, e) => {
        // if (confirm('Are you sure ?')) {
        let updatedValue = this.state.rlseqNotes.filter(p => p.noteseq !== noteId);
        this.state.rlseqNotes = updatedValue;
        this.props.onDelete && this.props.onDelete(e, { "RLSEQ": this.props.data.RLSEQ, notes: updatedValue, partialURL: "/" + this.props.selectedRunId + "/" + this.props.data.RLSEQ + "/" + noteId });
        this.setState({ rlseqNotes: updatedValue });
        // }
    }
    editPost = (e, id) => {
        this.setState({ viewType: 'edit', noteseq: e, textareaValue: this.state.rlseqNotes.filter(p => p.noteseq === e)[0].note })

    }
    addPost = (e, id) => {
        this.setState({ viewType: 'new' })
    }
    renderTableView() {
        let noteList = this.state.rlseqNotes;
        if (noteList.length > 0)
            return (<table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Note</th>
                        <th ><button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addPost}>Add</button></th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        noteList.map((post, index) => {
                            return <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{post.note}</td>
                                <td>
                                    <span onClick={this.editPost.bind(this, post.noteseq)} className="fa fa-pencil"></span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span onClick={this.deletePost.bind(this, post.noteseq)} className="fa fa-remove"></span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>);
        else
            return (<form>
                {/* <div className="form-group">
                    <label className="col-form-label">Note for section {this.props.sectionName}  for RLSEQ {this.props.data.RLSEQ} </label>
                </div> */}
                <div className="form-group">
                    <label className="col-form-label">No Notes present. Would you like to  {'  '}  &nbsp; </label> &nbsp;&nbsp;
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addPost}> Add</button>
                </div>
            </form>)
    }
    render() {
        //console.log(this.props.sectionName);
        let sectionName = this.props.sectionName;
        const modalTitle = `Notes for Section ${sectionName} `;
        const showHideClassName = this.props.show ? "modal display-block" : "modal fade";
        let modalBody;
        if (!this.props.show) {
            this.state.textareaValue = '';
            return null;
        }
        let noteList = this.state.rlseqNotes;//JSON.parse(this.props.data.note);
        // if (this.state.textareaValue === '' && this.props.data.note)
        //     this.setState({ textareaValue: this.props.data.note });
        if (this.state.viewType == 'list')
            modalBody = <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.renderTableView()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>

                </div>
            </div>
        if (this.state.viewType == 'new')
            modalBody = <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label className="col-form-label">Note for section {sectionName}  for RLSEQ {this.props.data.RLSEQ} </label>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Comment:</label>
                            <textarea className="form-control" id="message-text" value={this.state.textareaValue}
                                onChange={(event) => this.handleOnChange(event)} ></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Save changes</button>
                </div>
            </div>
        if (this.state.viewType == 'edit')
            modalBody = <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleUpdateClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label className="col-form-label">Note for section {sectionName}  for RLSEQ {this.props.data.RLSEQ} </label>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Comment:</label>
                            <textarea className="form-control" id="message-text" value={this.state.textareaValue}
                                onChange={(event) => this.handleOnChange(event)} ></textarea>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleUpdateClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleUpdate}>Save changes</button>
                </div>
            </div>
        return (
            <div className={showHideClassName} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    {modalBody}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedRunId: state.controlReducer.selectedRunId,
    };
};

export default connect(mapStateToProps, null)(BasicModal);
//export default BasicModal;