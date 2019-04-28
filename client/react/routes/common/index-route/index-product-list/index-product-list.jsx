import React from "react";
import {ScrollToFetch} from "../../../../common/scroll-to-fetch/scroll-to-fetch";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

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
    return new Array
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