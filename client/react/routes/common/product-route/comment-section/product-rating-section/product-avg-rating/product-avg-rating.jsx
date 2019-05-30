import React from "react";
import {calcCommentsAvgRating} from "../../../../../../../common/products-utils";
import {StarRating} from "../../../../../../common/star-rating/star-rating";

export const ProductAvgRating = ({comments}) => {
  let avg = calcCommentsAvgRating(comments);
  return (
    <div className="product-avg-rating prs-panel">
      <p>Đánh Giá Trung Bình</p>
      <div className="avg-rating">
        {avg.toFixed(1)}/5
      </div>
      <div className="text-center">
        <StarRating
          rating={avg}
        />
      </div>
      <p>({comments.length} nhận xét)</p>
    </div>
  );
};

