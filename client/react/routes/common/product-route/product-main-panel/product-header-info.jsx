import {StarRating} from "../../../../common/star-rating/star-rating";
import {customHistory} from "../../../routes";
import React from "react";

const onScrollToCmtSection = () => {
  document.querySelector(".product-comment-section").scrollIntoView({ block: 'end',  behavior: 'smooth' });
};

export const ProductHeaderInfo = ({commonInfo, optionInfo}) => {
  let {name, meanStar, commentCount, brand} = commonInfo;
  let {} = optionInfo;

  return (
    <div className="header-info">
      <p className="product-name">{name}</p>
      <StarRating
        rating={meanStar}
      />
      <span className="scroll-to-comment" onClick={onScrollToCmtSection}>(Xem {commentCount} đánh giá)</span>
      <br/>
      <span className="brand-name"
            onClick={() => customHistory.push("/products?brand=" + brand._id + "&type=brand")}>Thương hiệu: <span>{brand.name}</span></span>
    </div>
  );
};