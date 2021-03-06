import React, {Fragment} from "react";
import {ScrollToFetch} from "../../../../common/scroll-to-fetch/scroll-to-fetch";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import classnames from "classnames"
import {customHistory} from "../../../routes";
import {calcSalePrice, formatMoney} from "../../../../../common/products-utils";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {CountDown} from "../../../../common/countdown/countdown";
import {Process} from "../../../../common/process/process";
import {Badge} from "../../../../common/badge/badge";
import {StarRating} from "../../../../common/star-rating/star-rating";

//Todo fix regular dícount =0 render 0
export const ProductPanel = ({data, isDeal, showDetails}) => {
  let {regularDiscount, name, _id, deal, options, timeLeft, discountWithCode, meanStar, commentCount} = data;

  let {picture, price} = options[0];

  let totalSold = options.reduce((t, c) => t + Number(c.sold),0);
  let totalAmount = options.reduce((t, c) => t + Number(c.total),0);
  return (
    <div className={`product`}
         onClick={() => customHistory.push(`/product/${_id}`)}
    >

      <div className="p-picture">
        {isDeal && (
          <div className="discount-display">
            <div className="wrapper">
              {regularDiscount}%
              <div className="deal-arrow"></div>
            </div>
          </div>
        )

        }
        <img src={picture[0]}/>
      </div>
      <div className="p-details">
        <p className="p-name">{name}</p>
        <div className="p-price">
          {(isDeal && !showDetails) ? (
              <Fragment>
                <span className="main-price">{formatMoney(calcSalePrice(Number(price), Number(regularDiscount)))} ₫</span><span className="sale-price">{formatMoney(Number(price))} ₫</span>
              </Fragment>
          ) : (
              <Fragment>
                <div>
                  <span className="main-price">{formatMoney(calcSalePrice(Number(price), Number(regularDiscount)))} ₫</span>{(regularDiscount !== 0) && <span className="discount-display">-{regularDiscount}%</span>}
                </div>
                {(regularDiscount !== 0) && (
                    <div>
                      <span className="sale-price m-0">{formatMoney(Number(price))} ₫</span>
                    </div>
                )

                }

              </Fragment>
          )

          }

        </div>
      </div>
      {isDeal && (
        <div className="deal-content">
          <div className="path">
            <Process
              total={totalAmount}
              value={totalSold}
              content={() => ((totalSold / totalAmount) * 100) > 85 ? `Sắp bán hết` : ((totalSold / totalAmount) * 100) < 5 ? `Vừa mở bán` :`Đã bán ${totalSold}`}
            />
          </div>
          <div className="path">
            <CountDown
              value={timeLeft}
              render={({year, month, day, hour, minute, second}) => (
                <span className="deal-countdown">{year && (year + " năm ")}{month && (month + " tháng ")}{day && (day + " ngày ")}{hour && (hour + ":")}{minute && (minute + ":")}{second && (second)}</span>
              )}
            />
          </div>
        </div>
      )}
      {(discountWithCode && showDetails) && (
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
      {showDetails && (
        <div className="additional">
          <StarRating
            rating={meanStar}
          />
          <span>({commentCount} nhận xét)</span>
        </div>
      )

      }
    </div>
  );
};

export const ProductsRow = (props) => {
  let {rowList, cols, deal, className, showDetails, animate = true} = props;
  return animate ? (
    <TransitionGroup
      className={classnames("products-row m-0 p-0", {"c5": cols === 5, "c4": cols === 4}, className)}
      appear={true}
    >
      {rowList.map((each, i) => (

          <CSSTransition
            timeout={400 + (250 * i)}
            classNames={`delay-${i} faded`}
            unmountOnExit={true}
            key={i}

          >

              <ProductPanel
                data={each}
                showDetails={showDetails}
                isDeal={deal}
              />


          </CSSTransition>


      ))}
    </TransitionGroup>
  ) : (
    <div
      className={classnames("products-row m-0 p-0", {"c5": cols === 5, "c4": cols === 4}, className)}
    >
      {rowList.map((each, i) => (

        <ProductPanel
          key={i}
          data={each}
          showDetails={showDetails}
          isDeal={deal}
        />


      ))}
    </div>
  );


  // return (
  //   <div className={classnames("products-row m-0 p-0", {"c5": cols === 5}, className)}>
  //     {rowList.map((each, i) => (
  //       <ProductPanel
  //         key={i}
  //         data={each}
  //         isDeal={deal}
  //       />
  //     ))}
  //   </div>
  // )
};

export class IndexProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  };

  getRenderList = (list) => {
    let {cols} = this.props;
    if(!list.length) return [];
    let rowsCount = Math.ceil(list.length / cols);
    return Array.from(new Array(rowsCount)).map((each, i) => list.slice(i * 5, i * 5 + 5));
  };

  render() {
    let {api, deal} = this.props;
    let {loading, list} = this.state;
    let renderList = this.getRenderList(list);
    return (
      <ScrollToFetch
        api={() => api().then((products) => {
          this.setState({list: products, loading: false});
          return Promise.resolve();
        })}
      >
        <div className="index-product-list">

          <div className="products-wrapper">
            {loading ? (
              <div className="loading-holder">
                <LoadingInline
                  className={"load-products"}
                />
              </div>

            ) : (
              renderList.map((each, i) => (
                <ProductsRow
                  className="index-deal"
                  rowList={each}
                  key={i}
                  cols={this.props.cols}
                  deal={deal}
                  showDetails={false}
                />
              ))
            )}
          </div>


        </div>

      </ScrollToFetch>

    );
  }
}