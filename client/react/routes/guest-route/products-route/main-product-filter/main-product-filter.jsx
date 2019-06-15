import React from "react";
import classnames from "classnames"
import {SearchInput} from "../../../../common/search-input/search-input";

export class MainProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  filters = [
    {
      label: "BÁN CHẠY",
      value: "mostSale",

    },{
      label: "GIẢM GIÁ NHIỀU",
      value: "mostDiscount",

    }, {
      label: "GIÁ THẤP",
      value: "descPrice",

    },{
      label: "GIÁ CAO",
      value: "ascPrice",

    }
  ];

  render() {
    let {onChange, filter, title} = this.props;
    console.log(filter)
    return (
      <div className="main-product-filter">
        <div className="filter-group-box">
          <span>Ưu tiên xem: </span>
          <div className="filter-group">
            {this.filters.map(each => (
              <div className={classnames("filter-item", {active: filter.sort === each.value})}
                   key={each.value}
                   onClick={() => onChange({...filter, sort: each.value === filter.sort ? null : each.value})}
              >
                {each.label}
              </div>
            ))}
          </div>
        </div>
        <div className="search-box text-right">
          <SearchInput
            className={"search-product"}
            placeholder={`Tìm trong ${title}`}
            onSearch={(keyword) => onChange({...filter, keyword})}
            value={filter.keyword}
          />
        </div>
      </div>
    );
  }
}