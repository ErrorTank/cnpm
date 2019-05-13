import {StarRating} from "../../../../common/star-rating/star-rating";
import {customHistory} from "../../../routes";
import React from "react";

export const ProductHeaderInfo = ({commonInfo, optionInfo, onClickScrollToComment}) => {
  let {name, meanStar, commentCount, brand} = commonInfo;
  let {} = optionInfo;
  return (
    <div className="header-info">
      <p className="product-name">{name}</p>
      <StarRating
        rating={meanStar}
      />
      <span className="scroll-to-comment" onClick={onClickScrollToComment}>(Xem {commentCount} đánh giá)</span>
      <br/>
      <span className="brand-name"
            onClick={() => customHistory.push("/products?brand=" + brand._id)}>Thương hiệu: <span>{brand.name}</span></span>
    </div>
  );
};