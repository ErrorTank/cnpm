import {calcSalePrice, formatMoney} from "../../../../../common/products-utils";
import {Fragment} from "react";
import React from "react";
import {Badge} from "../../../../common/badge/badge";
import {ProductOptionSelect} from "./product-option-select/product-option-select";
import {ProviderSection} from "./provider-section/provider-section";
import {CountDown} from "../../../../common/countdown/countdown";
import {Process} from "../../../../common/process/process";

export const ProductMainInfo = ({commonInfo, optionInfo, onChangeOption, providerInfo, provider, onChangeProvider}) => {
  let {regularDiscount, timeLeft} = commonInfo;
  let {discountWithCode, options} = providerInfo;
  let {price, description, describeFields, } = optionInfo;

  let totalSold = options.reduce((t, c) => t + Number(c.sold),0);
  let totalAmount = options.reduce((t, c) => t + Number(c.total),0);
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
                <div className="value">{formatMoney(calcSalePrice(Number(calcSalePrice(Number(price), Number(regularDiscount))), Number(discountWithCode.value)))} ₫</div>
              </div>
            </div>
          )}
          {Number(timeLeft) > 0 && (
            <div className="p-deal">
              <div className="countdown">
                <i className="fas fa-clock"></i>
                <span>Khuyến mãi kết thúc sau </span>
                <CountDown
                  value={timeLeft}
                  render={({year, month, day, hour, minute, second}) => (
                    <span className="deal-countdown">{year && (<Fragment><span className="cd-val">{year}</span> năm </Fragment>)}{month && (<Fragment><span className="cd-val">{month}</span> tháng </Fragment>)}{day && (<Fragment><span className="cd-val">{day}</span> ngày </Fragment>)}<span className="cd-val">{hour && (hour + " : ")}{minute && (minute + " : ")}{second && (second)}</span></span>
                  )}
                />
              </div>
              <div className="p-deal-process">
                <span>{((totalSold / totalAmount) * 100) > 85 ? `Sắp bán hết` : ((totalSold / totalAmount) * 100) < 5 ? `Vừa mở bán` :`Đã bán ${totalSold}`}</span>
                <Process
                  className={"p-left"}
                  total={totalAmount}
                  value={totalSold}
                />
              </div>
            </div>
          )

          }


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
        <ProductOptionSelect
          options={options}
          onChange={onChangeOption}
          current={optionInfo}
          productID={commonInfo._id}
        />
      </div>
      <ProviderSection
        providerInfo={providerInfo}
        providers={provider.filter(each => each.owner._id !== providerInfo.owner._id)}
        onChange={onChangeProvider}
        discount={regularDiscount}
      />


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