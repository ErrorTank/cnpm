import React from "react";
import {StarRating} from "../../../../common/star-rating/star-rating";
import classnames from "classnames"
import {PriceRange} from "../../../../common/price-range/price-range";

export class ProductFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  filters = [
    {
      name: "category",
      title: "Danh mục sản phẩm",
      render: ({categories}) => {
        let {_id, name, childs} = categories;
        console.log(_id)
        let {params, onChange} = this.props;
        return (
          <div className="categories-filter">
            <div className={classnames("parent-cate")} onClick={() => onChange({category: _id})}>{name}</div>
            <div className="filter-items sub-cates">
              {childs.map(each => (
                <div key={each._id}
                     className={classnames("item", {active: each._id === params.category})}
                     onClick={() => {
                       onChange({category: each._id})
                     }}
                >
                  {each.name} <span className="count">({each.count})</span>
                </div>
              ))}
            </div>
          </div>
        )
      }
    }, {
      name: "rating",
      title: () => (
        <span>Đánh giá{this.props.params.rating ? <p style={{"color": "#787878", "fontWeight": "400", fontSize: "12px", textTransform: "none"}}>(Ít nhất {this.props.params.rating} sao)</p> : null}</span>
      ),
      render: () => {
        let {params, onChange} = this.props;
        return (
          <div className="rating-filter">
            <StarRating
              className={"star-rating"}
              editable
              rating={params.rating ? params.rating : 0}
              onChange={value => onChange({rating: value})}
            />
            {params.rating && (
              <i className="fas fa-times-circle reset" onClick={() => onChange({rating: null})}></i>
            )

            }

          </div>
        )
      }
    }, {
      name: "priceRange",
      title: "Khoảng giá",
      render: () => {
        let {params, onChange} = this.props;
        let [from, to] = typeof params.priceRange === "string" ? params.priceRange.split("_") : [0 ,0];
        return (
          <div className="price-range-filter">

            <PriceRange
              from={(isNaN(Number(from)) || isNaN(Number(to))) ? 0 : Number(from)}
              to={(isNaN(Number(from)) || isNaN(Number(to))) ? 0 : Number(to)}
              onChange={value => onChange({priceRange: value})}
              renderReset={() =>  (isNaN(Number(from)) || isNaN(Number(to)) || params.priceRange) && (
                <i className="fas fa-times-circle reset" onClick={() => onChange({priceRange: null})}></i>
              )}
            />

          </div>
        )
      }
    }, {
      name: "brand",
      title: "Thương hiệu",
      render: ({brands}) => {
        let {params, onChange} = this.props;
        return (
          <div className="brands-filter filter-items">
            {brands.map(each => (
              <div key={each._id} className={classnames("item", {active: each._id === params.brand})} onClick={() => onChange({brand: each._id})}>
                {each.name} <span className="count">({each.count})</span>
              </div>
            ))}
          </div>
        )
      }
    }, {
      name: "provider",
      title: "Nhà cung cấp",
      render: ({providers}) => {
        let {params, onChange} = this.props;
        return (
          <div className="providers-filter filter-items">
            {providers.map(each => (
              <div key={each._id} className={classnames("item", {active: each._id === params.provider})} onClick={() => onChange({provider: each._id})}>
                {each.name} <span className="count">({each.count})</span>
              </div>
            ))}
          </div>
        )
      }
    }
  ];

  render() {
    let {filters, params} = this.props;
    return (
      <div className="product-filter-bar">

        {filters && this.filters.map((filter, i) => {
          return  (
            <div key={filter.name} className="panel">
              <div className="panel-title">{typeof filter.title === "string" ? filter.title : filter.title()}</div>
              <div className="panel-content">
                {filter.render(filters)}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

