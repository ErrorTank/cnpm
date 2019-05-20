import React from "react";
import {ProductAvgRating} from "./product-avg-rating/product-avg-rating";
import {RatingVisualization} from "./rating-visualization/rating-visualization";
import {RatingPanel} from "./rating-panel/rating-panel";

export class ProductRatingSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingPanel: false
    };
  };

  render() {
    let {showRatingPanel} = this.state;
    return (
      <div className="product-rating-section">
        <div className="display-panel">
          <ProductAvgRating/>
          <RatingVisualization/>
          <div className="toggle-rating-panel">
            <p>Chia sẻ nhận xét về sản phẩm</p>
            <button className="btn rating-toggle-btn" onClick={() => this.setState({showRatingPanel: !showRatingPanel})}>
              {showRatingPanel ? "Đóng" : "Viết nhận xét của bạn"}
            </button>
          </div>
        </div>


        {showRatingPanel && (
          <RatingPanel/>
        )}
      </div>
    );
  }
}