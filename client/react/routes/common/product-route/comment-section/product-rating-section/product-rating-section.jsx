import React from "react";
import {ProductAvgRating} from "./product-avg-rating/product-avg-rating";
import {RatingVisualization} from "./rating-visualization/rating-visualization";
import {RatingPanel} from "./rating-panel/rating-panel";
import {userInfo} from "../../../../../../common/states/common";
import {userActionModal} from "../../../../../common/modal/user-actions/user-actions";
import {LocationContext} from "../../product-route";

export class ProductRatingSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingPanel: false,
      comments: props.comments
    };


  };

  render() {
    let {showRatingPanel} = this.state;
    let {comments} = this.state;
    return !!comments.length && (
      <LocationContext.Consumer>
        {props => {

          let {search, pathname} = props.location;
          return (
            <div className="product-rating-section">
              <div className="display-panel">
                <ProductAvgRating
                  comments={comments}
                />
                <RatingVisualization
                  comments={comments}
                />
                <div className="toggle-rating-panel prs-panel">
                  <p>Chia sẻ nhận xét về sản phẩm</p>
                  <button className="btn rating-toggle-btn yellow-btn" onClick={() => {
                    if (userInfo.getState())
                      this.setState({showRatingPanel: !showRatingPanel});
                    else {
                      userActionModal.open({redirect: pathname+search});
                    }
                  }}>
                    {showRatingPanel ? "Đóng" : "Viết nhận xét của bạn"}
                  </button>
                </div>
              </div>


              {showRatingPanel && (
                <RatingPanel
                  {...this.props}
                />
              )}
            </div>
          )
        }}

      </LocationContext.Consumer>
    );
  }
}