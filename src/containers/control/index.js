import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ControlTable from "./controlTable";
import { withRouter } from 'react-router-dom'
import { fetchControls } from './fetchControls';
import { CONTROL_DATA_API_URL } from '../../config/config'

class Control extends Component {
  navigateToPage = (e) => {
    e.preventDefault();
    this.props.history.push('/run');
  };
  refreshControlList = (e) => {
    e.preventDefault();
    this.props.fetchData(CONTROL_DATA_API_URL);
  };
  render() {
    return (
      <section className="feature_area p_100">
        <div className="container">
          <div className="row">

            <div className="challange_text_inner">
              <div className="l_title">
                <h6>Discover the features</h6>
                <h2>We will help you to generate Profile PgmDoc</h2>
              </div>
              <p> In order to generate data for step. Please select the section for which data need to be fetched </p>
              <div className="row">
                <div className="blog_text"> <a className="more_btn" href="#/" onClick={this.refreshControlList}>Refresh List</a></div>
                <div className="blog_text"><a className="more_btn" href="#/" onClick={this.navigateToPage}>Generate Selected</a> </div>

              </div>
            </div>
          </div>
          <div className="controlTable">

            <ControlTable />
          </div>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchData: fetchControls
}, dispatch)
export default withRouter(connect(null, mapDispatchToProps)(Control))