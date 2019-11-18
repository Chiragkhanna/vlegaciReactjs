import React, { Component } from "react";
import Step from "../../components/step";
import { withRouter } from 'react-router-dom'

class Run extends Component {
    navigateToPage = (e) => {
        e.preventDefault();
        this.props.history.push('/control');
    };
    render() {
        return (
            <section className="feature_area p_100">
                <div className="container">
                    <div className="row"><div className="blog_text"><a className="more_btn" href="#/" onClick={this.navigateToPage}>Back</a> </div> </div>
                    <div className="row">
                        <Step />
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Run);
