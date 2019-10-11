import React, { Component } from "react";
import './scss/_header.scss'

class Footer extends Component {
  render() {
    return (
      <footer class="footr_area">
        <div class="footer_widget_area">
          <div class="container">
            <div class="row footer_widget_inner">
              <div class="col-lg-4 col-sm-6">
                <aside class="f_widget f_about_widget">
                  <img src="img/footer-logo.png" alt="" />
                  <p>V_lagaci changing lives, V_lagaci changing lives, V_lagaci changing lives,V_lagaci changing lives,V_lagaci changing lives,V_lagaci changing lives,.</p>
                </aside>
              </div>
              <div class="col-lg-4 col-sm-6">
                {/* <aside class="f_widget f_insta_widget">
                  <div class="f_title">
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
              <div class="col-lg-4 col-sm-6">

              </div>
            </div>
          </div>
        </div>
        <div class="footer_copyright">
          <div class="container">
            <div class="float-sm-left">
              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
              </div>
            <div class="float-sm-right">
              <ul>
                <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                <li><a href="#"><i class="fa fa-behance"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;