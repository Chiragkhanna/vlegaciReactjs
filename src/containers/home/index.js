import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import titleIcon from '../../styles/img/icon/title-icon.png';
import fIcon1 from '../../styles/img/icon/f-icon-1.png';
import fIcon2 from '../../styles/img/icon/f-icon-2.png';
import fIcon3 from '../../styles/img/icon/f-icon-3.png';

class Home extends Component {

  navigateToPage = param => (e) => {
    e.preventDefault();
    this.props.history.push(param);
  };
  render() {
    return (
      <section className="feature_area">
        <div className="container">
          <div className="c_title">
            <img src={titleIcon} alt="" />
            <h6>Discover the features</h6>
            <h2>We are young but bold</h2>
          </div>
          <div className="row feature_inner">
            <div className="col-lg-4 col-sm-6">
              <div className="feature_item">
                <div className="f_icon">
                  <img src={fIcon1} alt="" />
                </div>
                <h4>Program Execution Analysis and Documentation</h4>
                <p>Program Execution Analysis and Documentation allow you to select section for which data need to be fetch </p>
                <a className="more_btn" href="#/" onClick={this.navigateToPage('/control')}>Go</a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature_item">
                <div className="f_icon">
                  <img src={fIcon2} alt="" />
                </div>
                <h4>Run</h4>
                <p>Run helps you to see the AS 400 running logs </p>
                <a className="more_btn" href="#/" onClick={this.navigateToPage('/run')}>Go</a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature_item">
                <div className="f_icon">
                  <img src={fIcon3} alt="" />
                </div>
                <h4>Notes</h4>
                <p>Attach your notes to run in order to clarify things better </p>
                <a className="more_btn" href="#/" onClick={this.navigateToPage('/notes')}>Go</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Home);