import React, {Fragment} from "react";
import {ProductImagesDisplay} from "../../../../common/product-images-display/product-images-display";
import {StarRating} from "../../../../common/star-rating/star-rating";
import {customHistory} from "../../../routes";
import {calcSalePrice, formatMoney} from "../../../../../common/products-utils";

export class ProductMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: props.options[0]
    };
  };

  render() {
    let {options, ...rest} = this.props;
    let {currentOption} = this.state;
    return (
      <div className="product-main-panel">
        <ProductLeftPanel
          optionInfo={currentOption}
        />
        <ProductRightPanel
          optionInfo={currentOption}
          commonInfo={rest}
        />
      </div>
    );
  }
}

const ProductLeftPanel = props => {
  let {optionInfo} = props;
  return (
    <div className="product-left-panel">
      <ProductImagesDisplay
        images={optionInfo.picture}
      />
    </div>
  )
};

const ProductRightPanel = ({commonInfo, optionInfo, onClickScrollToComment, onChangeOption}) => {
  let {name, meanStar, commentCount, brand, regularDiscount} = commonInfo;
  let {price, sold, description, total,} = optionInfo;
  console.log(commonInfo)
  return (
    <div className="product-right-panel">
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
      <div className="main-info">
        <div className="pricing-section">
          <div className="main-price">Giá: <span
            className="value">{formatMoney(calcSalePrice(Number(price), Number(regularDiscount)))} ₫</span></div>
          {regularDiscount && (
            <Fragment>
              <div className="sale-sale">Tiết kiệm: <span
                className="value">-{regularDiscount}%</span> ({formatMoney(Number(price) - calcSalePrice(Number(price), Number(regularDiscount)))} ₫)
              </div>
              <div className="sale-sale">Giá thị trường: {formatMoney(Number(price))} ₫
              </div>
            </Fragment>

          )

          }
        </div>


      </div>
    </div>
  )
};

