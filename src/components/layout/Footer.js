import React, { Component } from "react";
import './scss/_header.scss'

class Footer extends Component {
  render() {
    return (
      <footer className="footr_area">
        <div className="footer_widget_area">
          <div className="container">
            <div className="row footer_widget_inner">
              {/* <div className="col-lg-4 col-sm-6"> */}
                <aside className="f_widget f_about_widget">
                  {/* <img src="img/footer-logo.png" alt="" /> */}
                  <p>Want to replace your legacy application?  </p><br/>
                    We can together build new world
                 
                </aside>
              {/* </div> */}
              <div className="col-lg-6 col-sm-6">
                {/* <aside className="f_widget f_insta_widget">
                  <div className="f_title">
                    <h3>Instagram</h3>
                  </div>
                  <ul>
                    <li><a href="#"><img src="img/instagram/ins-1.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-2.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-3.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-4.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-5.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-6.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-7.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="img/instagram/ins-8.jpg" alt="" /></a></li>
                  </ul>
                </aside> */}
              </div>
              <div className="col-lg-4 col-sm-6">

              </div>
            </div>
          </div>
        </div>
        <div className="footer_copyright">
          <div className="container">
            <div className="float-sm-left">vLegaci Corp.
              {/* Copyright &copy; */}
              {(new Date().getFullYear())} <i className="fa fa-copyright"></i>  All rights reserved
              </div>
            <div className="float-sm-right">
              <ul>
                <li><a href="#/"><i className="fa fa-pinterest"></i></a></li>
                <li><a href="#/"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#/"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#/"><i className="fa fa-dribbble"></i></a></li>
                <li><a href="#/"><i className="fa fa-behance"></i></a></li>
                <li><a href="#/"><i className="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;