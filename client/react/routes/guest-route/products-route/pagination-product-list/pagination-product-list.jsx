import React from "react";
import isEqual from "lodash/isEqual"
import {ProductsRow} from "../../../common/index-route/index-product-list/index-product-list";
import minBy from "lodash/minBy"
import {Pagination} from "../../../../common/pagination/pagination";

export class PaginationProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
    };
    this.loadData({skip: this.pageSize() * this.state.page, take: this.pageSize()});
  };

  loadData = (options) => {
    this.props.api(options).then((data) => {
      this.setState({list: data});
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const {filter, maxItem, category, rating, brand, provider} = this.props;

    if (!isEqual(nextProps.filter, filter) || maxItem !== nextProps.maxItem || nextProps.category !== category || nextProps.rating !== rating || nextProps.brand !== brand|| nextProps.provider !== provider) {
      this.setState({page: 0});
      this.loadData({skip: 0, take: nextProps.maxItem})
    }
  }

  pageSize() {
    const {maxItem = 10} = this.props;
    return maxItem;
  }

  getRenderList = (list) => {
    let {cols} = this.props;
    if(!list.length) return [];
    let rowsCount = Math.ceil(list.length / cols);
    return Array.from(new Array(rowsCount)).map((each, i) => list.slice(i * 5, i * 5 + 5));
  };

  render() {
    let {cols, showDeal, showDetails, total} = this.props;
    let {list, page} = this.state;
    let renderList = this.getRenderList(list.map(({info, ...temp}) => {
      let {provider, ...rest} = info;
      let minProvider = minBy(provider, each => minBy(each.options, op => op.price).price);
      return {...rest, ...temp , discountWithCode: minProvider.discountWithCode, options: [minBy(minProvider.options, each => each.price)]}
    }));
    return (
      <div className="pagination-product-list">
        {!!renderList.length &&
          renderList.map((each, i) => (
            <ProductsRow
              className="search-list"
              rowList={each}
              key={i}
              cols={cols}
              animate={false}
              deal={showDeal}
              showDetails={showDetails}
            />
          ))
        }
        <Pagination
          className="list-pagination"
          value={page + 1}
          total={Math.ceil(total / this.pageSize())}
          onChange={(newPage) => {
            this.setState({page: newPage - 1});
            this.loadData({skip: this.pageSize() * (newPage - 1), take: this.pageSize()})
          }}
        />
      </div>
    );
  }
}