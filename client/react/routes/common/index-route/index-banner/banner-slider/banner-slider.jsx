import React from "react";
import {Slider} from "../../../../../common/slider/slider";

export class BannerSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };

  };

  bannerImages = [
    {
      content: (
        <div className="banner-slider-content first"></div>
      )
    }, {
      content: (
        <div className="banner-slider-content sec"></div>
      )
    }, {
      content: (
        <div className="banner-slider-content third"></div>
      )
    }, {
      content: (
        <div className="banner-slider-content four"></div>
      )
    }
  ];



  render() {
    let {current} = this.state;
    return (
      <div className="banner-slider">
        <Slider
          current={current}
          getContent={index => this.bannerImages[index].content}
        />
        <div className="slider-control left"
             onClick={() => {
                if(current === 0){
                  this.setState({current: this.bannerImages.length - 1})
                }else{
                  this.setState({current: current - 1})
                }
             }}
        >
          <div className="wrapper">
            <i className="fas fa-chevron-left"></i>
          </div>

        </div>
        <div className="slider-control right"
             onClick={() => {
               if(current === this.bannerImages.length - 1){
                 this.setState({current: 0})
               }else{
                 this.setState({current: current + 1})
               }
             }}
        >
          <div className="wrapper">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    );
  }
}