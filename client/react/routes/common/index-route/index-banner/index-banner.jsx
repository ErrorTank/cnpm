import React from "react";
import {CategoriesPicker} from "../../../../common/categories-picker/categories-picker";

export class IndexBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="index-banner">
        <div className="categories-wrapper">
          <CategoriesPicker/>
        </div>
        <div className="banner-wrapper">

        </div>
      </div>
    );
  }
}