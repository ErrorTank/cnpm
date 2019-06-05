import React from "react";
import isEqual from "lodash/isEqual"

export class PaginationProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0
    };
    this.loadData({skip: props.maxItem * this.state.page, take: props.maxItem});
  };

  loadData = (options) => {
    this.props.api(options).then((data) => {
      this.setState({list: data});
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const {filter, maxItem} = this.props;

    if (!isEqual(nextProps.filter, filter) || maxItem !== nextProps.maxItem) {
      this.loadData({skip: maxItem * this.state.page, take: nextProps.maxItem})
    }
  }

  render() {
    let {filter, onChange, total} = this.props;
    return (
      <div className="pagination-product-list">

      </div>
    );
  }
}