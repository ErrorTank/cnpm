import React from "react";
import {ScrollToFetch} from "../../../../common/scroll-to-fetch/scroll-to-fetch";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import classnames from "classnames"
import {customHistory} from "../../../routes";
import {calcSalePrice, formatMoney} from "../../../../../common/products-utils";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {convertMilToDifferent} from "../../../../../common/moment-utils";


export const ProductPanel = ({data, isDeal}) => {
  let {regularDiscount, name, _id, deal, options, timeLeft} = data;
  let {picture, price, sold, total} = options[0];
  let tf = Number(timeLeft);
  setInterval(() => {
    console.log(name)

    tf = tf - 1000 ;

    let left = convertMilToDifferent(tf);
    console.log(left)
    // console.log(left.hour + " " + left.minute + " " +left.second)
  }, 1000);
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
        <p className="p-price">
          <span className="main-price">{formatMoney(Number(price))} ₫</span><span className="sale-price">{formatMoney(calcSalePrice(Number(price), Number(regularDiscount)))} ₫</span>
        </p>
      </div>
      <div className="deal-content">
        <div className="path">

        </div>
        <div className="path">
          {}
        </div>
      </div>
    </div>
  );
};

export const ProductsRow = (props) => {
  let {rowList, cols, deal, className} = props;
  return (
    <TransitionGroup
      className={classnames("products-row m-0 p-0", {"c5": cols === 5}, className)}
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
                isDeal={deal}
              />


          </CSSTransition>


      ))}
    </TransitionGroup>
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

  getRenderList = () => {
    let {list} = this.state;
    let {cols} = this.props;
    if(!list.length) return [];
    let rowsCount = Math.ceil(list.length / cols);
    return Array.from(new Array(rowsCount)).map((each, i) => list.slice(i * 5, i * 5 + 5));
  };

  render() {
    let {api, onClickBtn = null} = this.props;
    let {loading} = this.state;
    let renderList = this.getRenderList();
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
                  deal={true}
                />
              ))
            )}
          </div>
          {onClickBtn && (
            <div className="idl-footer">
              <button className="btn btn-outline-secondary watch-more-btn" onClick={onClickBtn}>Xem thêm</button>
            </div>
          )}

        </div>

      </ScrollToFetch>

    );
  }
}