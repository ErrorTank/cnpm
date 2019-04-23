import React from "react";
import {CategoriesPicker} from "../../../../common/categories-picker/categories-picker";
import {Slider} from "../../../../common/slider/slider";
import {BannerSlider} from "./banner-slider/banner-slider";

export class IndexBanner extends React.Component {
  constructor(props) {
    super(props);

  };



  render() {
    return (
      <div className="index-banner">
        <div className="categories-wrapper">
          <CategoriesPicker/>
        </div>
        <div className="banner-wrapper">
          <BannerSlider/>
        </div>
      </div>
    );
  }
}