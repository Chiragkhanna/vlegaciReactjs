import React from "react"
import Table from "./table";

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
        document.title = this.props.title
    }

    render() {
        const sectionTitle = this.props.sectionTitle

        return (
            <div class="card">
                <div onClick={(e) => this.togglePanel(e)} className='card-header'>
                    {this.state.open ? (
                        <i class="fa fa-fw fa-chevron-down"></i>
                    ) : <i class="fa fa-fw fa-chevron-right"></i>}
                    {sectionTitle}</div>
                {this.state.open ? (
                    <div class="controlTable">
                        <Table data={this.props.sectionData} />
                    </div>
                ) : null}
                {/* <h3>{sectionTitle}</h3> */}

            </div>
        )
    }
}

export default Section