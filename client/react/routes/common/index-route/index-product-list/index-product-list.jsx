import React from "react";
import {ScrollToFetch} from "../../../../common/scroll-to-fetch/scroll-to-fetch";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import classnames from "classnames"

export const ProductPanel = props => {
  return (
    <div className="product"

    >
      {props.data}
    </div>
  );
};

export const ProductsRow = (props) => {
  let {rowList, cols} = props;
  return (
    <div className={classnames("products-row m-0 p-0", {"c5": cols === 5})}>
      {rowList.map((each, i) => (
        <ProductPanel
          key={i}
          data={each}
        />
      ))}
    </div>
  )
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
        <div className="index-product-list" style={{marginTop: "600px"}}>

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
                  rowList={each}
                  key={i}
                  cols={this.props.cols}
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