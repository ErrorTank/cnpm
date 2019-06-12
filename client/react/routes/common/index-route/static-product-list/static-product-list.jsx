import React from "react";
import {ProductsRow} from "../index-product-list/index-product-list";

export class StaticProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  getRenderList = (list) => {
    let {cols, rows = 1} = this.props;
    if(!list.length) return [];
    let rowsCount = Math.ceil(list.length / cols);
    return Array.from(new Array(rowsCount)).map((each, i) => list.slice(i * 5, i * 5 + 5)).slice(0, rows);
  };

  render() {
    let {deal, list} = this.props;
    let renderList = this.getRenderList(list);

    return (
      <div className="index-product-list">
        <div className="products-wrapper">
          {
            renderList.map((each, i) => (
              <ProductsRow
                className="index-deal"
                rowList={each}
                key   ={i}
                cols={this.props.cols}
                deal={deal}
                showDetails={false}
              />
            ))
          }
        </div>

      </div>
    );
  }
}