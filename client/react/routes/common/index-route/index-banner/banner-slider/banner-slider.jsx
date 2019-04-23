import React from "react";
import {Slider} from "../../../../../common/slider/slider";

export class BannerSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.bannerImages[0]
    };
  };

  bannerImages = [
    {
      key: 0,
      content: (
        <div>Mot</div>
      )
    }, {
      key: 1,
      content: (
        <div>Hai</div>
      )
    }, {
      key: 2,
      content: (
        <div>Ba</div>
      )
    }, {
      key: 3,
      content: (
        <div>Bon</div>
      )
    }
  ];

  render() {
    return (
      <div className="banner-slider">
        <Slider
          current={this.state.current}
          getContent={slide => slide.content}
          getKey={slide => slide.key}
        />
        <div className="slider-control left">
          <div className="wrapper">
            <i className="fas fa-chevron-left"></i>
          </div>

        </div>
        <div className="slider-control right">
          <div className="wrapper">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    );
  }
}