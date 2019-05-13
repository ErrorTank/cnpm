import {calcSalePrice, formatMoney} from "../../../../../common/products-utils";
import {Fragment} from "react";
import React from "react";
import {Badge} from "../../../../common/badge/badge";

export const ProductMainInfo = ({commonInfo, optionInfo, onChangeOption}) => {
  let {regularDiscount, discountWithCode} = commonInfo;
  let {price, description, describeFields} = optionInfo;
  return (
    <div className="main-info">
      <div className="info-section">
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
          {discountWithCode && (
            <div className="promotion-notify">
              <div className="left-info">
                <div>Nhập mã</div>
                <div><Badge className={"promotion-badge"} content={discountWithCode.code}/></div>
              </div>
              <div className="right-info">
                <div>Chỉ còn</div>
                <div className="value">{formatMoney(calcSalePrice(Number(price), Number(discountWithCode.value)))} ₫</div>
              </div>
            </div>
          )}

        </div>
        <div className="description-section">
          <p className="description">{description}</p>
          {describeFields && describeFields.length && (
            <div className="describe-fields">
              {describeFields.map((each, i) => (
                <ProductFeature
                  key={i}
                  content={each}
                />
              ))}
            </div>
          )}

        </div>
      </div>



    </div>
  )
};

const ProductFeature = ({content}) => {
  return (
    <div className="product-feature">
      {content}
    </div>
  )
};