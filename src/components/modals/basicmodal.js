import React from "react"

class BasicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            textareaValue: ''
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
    handleSave = e => {
        this.props.data["note"] = this.state.textareaValue;
        this.props.data["sectionName"] = this.props.sectionName;
        this.props.onSave && this.props.onSave(e, this.props.data);

    };
    handleOnChange(event) {
        this.setState({
            textareaValue: event.target.value
        })
    }
    render() {
        console.log(this.props.sectionName);
        let sectionName = this.props.sectionName;
        const modalTitle = `Save Note for Section ${sectionName} `;
        const showHideClassName = this.props.show ? "modal display-block" : "modal fade";
        if (!this.props.show) {
            this.state.textareaValue = '';
            return null;
        }
        if (this.state.textareaValue === '' && this.props.data.note)
            this.setState({ textareaValue: this.props.data.note });
        return (
            <div className={showHideClassName} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
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
                            <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicModal;