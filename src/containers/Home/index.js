import React, { Component } from "react";
import titleIcon from '../../styles/img/icon/title-icon.png';
import fIcon1 from '../../styles/img/icon/f-icon-1.png';
import fIcon2 from '../../styles/img/icon/f-icon-2.png';
import fIcon3 from '../../styles/img/icon/f-icon-3.png';
class Home extends Component {
  render() {
    return (
      <section class="feature_area">
        <div class="container">
          <div class="c_title">
            <img src={titleIcon} alt="" />
            <h6>Discover the features</h6>
            <h2>We are young but bold</h2>
          </div>
          <div class="row feature_inner">
            <div class="col-lg-4 col-sm-6">
              <div class="feature_item">
                <div class="f_icon">
                  <img src={fIcon1} alt="" />
                </div>
                <h4>Brand Identity</h4>
                <p>Brand Identity speaks for you . Brand Identity speaks for you . </p>
                <a class="more_btn" href="#">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="feature_item">
                <div class="f_icon">
                  <img src={fIcon2} alt="" />
                </div>
                <h4>Online Marketing</h4>
                <p>Online Marketing is the need of an hour.Online Marketing is the need of an hour. </p>
                <a class="more_btn" href="#">Read More</a>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div class="feature_item">
                <div class="f_icon">
                  <img src={fIcon3} alt="" />
                </div>
                <h4>Social Media</h4>
                <p>ABCD we are engaged in social media. ABCD we are engaged in social media. </p>
                <a class="more_btn" href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;