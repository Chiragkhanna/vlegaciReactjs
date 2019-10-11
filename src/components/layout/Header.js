import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import './scss/_header.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import slider1 from '../../styles/img/3d-shap.png';
import slider2 from '../../styles/img/3d-shap.png';
import logoImg from '../../styles/img/vlegaci-logo.png';

/**
 * This utility function allows function calls to be debounced.
 * @param {Function} func Function that requires debouncing
 * @param {Number} wait Wait time in milliseconds between successive invocations
 */
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollPositionY: 0,
    }
  }
  componentDidMount() {
    // 32 is the number of milliseconds to debounce
    // I picked this because it's approx 1 frame (ie: 16.7ms)
    return window.addEventListener('scroll', debounce(this.handleScroll, 16))
  }

  componentWillUnmount() {
    return window.removeEventListener('scroll', debounce(this.handleScroll, 16))
  }

  handleScroll = () => {
    // + is unary operator, same as Number(window.scrollY)
    const scrollPositionY = +window.scrollY
    return this.setState({ scrollPositionY })
  }
  getTitle = () => {
    switch (this.props.location.pathname) {
      case "/control":
        return "Control";
      case "/run":
        return "Run";
      default:
        return "Home"
    }
  }
  render() {
    const isScrolling = !!this.state.scrollPositionY;
    return (
      <div>
        <header class={isScrolling ? "main_menu_area navbar_fixed" : "main_menu_area"}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"><img src={logoImg} alt="" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item active"><NavLink to="/">Home</NavLink></li>
                <li class="nav-item"><NavLink to="/control">Control</NavLink></li>
                <li class="nav-item"><NavLink to="/run">Run</NavLink></li>

              </ul>
            </div>
          </nav>
        </header>
        {/* <section class={(currentLocation == '/' ? 'main_slider_area ' : 'displayNone')}  >
          <div id="main_slider" class="rev_slider">
            <Carousel axis="vertical" showArrows={false} showStatus={false} autoPlay={true} interval={4000} infiniteLoop={true} showIndicators={false} showThumbs={false}>

              <div class="row" >
                <div class="col-md">       <ul>
                  <li data-index="rs-1587" data-transition="fade" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off" data-easein="default" data-easeout="default" data-masterspeed="300" data-rotate="0" data-saveperformance="off" data-title="Creative" data-param1="01" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-param10="" data-description="">
                    <div class="slider_text_box">
                      <div class="tp-caption tp-resizeme first_text"
                        data-x="['left','left','left','left','15','center']"
                        data-hoffset="['0','80','80','0']"
                        data-y="['top','top','top','top']"
                        data-voffset="['400','400','400','250','180','180']"
                        data-fontsize="['72','72','72','50','50','30']"
                        data-lineheight="['82','82','82','62','62','42']"
                        data-width="['none']"
                        data-height="none"
                        data-whitespace="nowrape"
                        data-type="text"
                        data-frames="[{&quot;delay&quot;:10,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:0px;s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;y:[175%];&quot;,&quot;mask&quot;:&quot;x:inherit;y:inherit;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;}]"
                        data-textAlign="['left','left','left','left','left','center']">Choose a powerful <br />design for your Start-up</div>

                      <div class="tp-caption tp-resizeme secand_text"
                        data-x="['left','left','left','left','15','center']"
                        data-hoffset="['0','80','80','0']"
                        data-y="['top','top','top','top']"
                        data-voffset="['575','575','575','400','320','300']"
                        data-fontsize="['24','24','24','18','16','16']"
                        data-lineheight="['36','36','36','26','26','26']"
                        data-width="['none','none','none','none','none']"
                        data-height="none"
                        data-whitespace="nowrape"
                        data-type="text"
                        data-frames="[{&quot;delay&quot;:10,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:[100%];s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;y:[175%];&quot;,&quot;mask&quot;:&quot;x:inherit;y:inherit;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;}]"
                        data-textAlign="['left','left','left','left','left','center']">Get your freebie template now!
                            </div>

                      <div class="tp-caption tp-resizeme"
                        data-x="['left','left','left','left','15','center']" data-hoffset="['0','80','80','0']"
                        data-y="['top','top','top','top']"
                        data-voffset="['670','670','670','480','370','350']"
                        data-fontsize="['14','14','14','14']"
                        data-lineheight="['46','46','46','46']"
                        data-width="none"
                        data-height="none"
                        data-whitespace="nowrap"
                        data-type="text"
                        data-frames="[{&quot;delay&quot;:10,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:[100%];s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1500,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;y:[175%];&quot;,&quot;mask&quot;:&quot;x:inherit;y:inherit;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power2.easeInOut&quot;}]">
                        <a class="more_btn" href="#">Discover</a>
                      </div>

                    </div>
                  </li> </ul>  </div>
                <div class="col-md sliderImg d-none d-md-block">   <img src={slider1} />  </div>
              </div>

              <div class="row">
                <div class="col-md">      One of three columns    </div>
                <div class="col-md sliderImg d-none d-md-block">   <img src={slider2} />  </div>
              </div>

            </Carousel>

          </div>
        </section> */}
        <section class='banner_area' >
          <div class="container">
            <div class="banner_inner_text">
              <h2>{this.getTitle()}</h2>
              <p>Get to know us</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// wrap Header class in a new class that will render the
// Header class with the current location
// export this class so other classes will render this
// wrapped component
export default withRouter(Header);