import React, { Component } from "react";
import ControlTable from "./controlTable";

class Control extends Component {
  render() {
    return (
      <section class="feature_area p_100">
        <div class="container">
          <div class="row">

            <div class="challange_text_inner">
              <div class="l_title">
                <h6>Discover the features</h6>
                <h2>We will help you to generate Profile PgmDoc</h2>
              </div>
              <p> In order to generate data for step. Please select the section for which data need to be show </p>
              <div class="row">
                <div class="blog_text"><a class="more_btn" href="#">Generate Selected</a> </div>
                <div class="blog_text"> <a class="more_btn" href="#">Refresh List</a></div>
              </div>
            </div>
          </div>
          <div class="row controlTable">

            <ControlTable />
          </div>
        </div>
      </section>
    );
  }
}

export default Control;