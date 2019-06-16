import React, {Fragment} from "react";
import classnames from "classnames"
import {customHistory} from "../../routes/routes";


const BreadcrumbItem = (props) => {
  let {name, active = false, _id, onClick, showArrow = true} = props;
  return (
    <div className={classnames("k-breadcrumb-item", {active, "pl-0": !showArrow})}
         onClick={onClick ? onClick : () => customHistory.push(`/products?type=category&category=${_id}`)}
    >
          <span className="item-text">
              {name}
          </span>
      {showArrow && (
        <span className="item-cosmetic"></span>
      )

      }

    </div>
  )
};

export class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {children, items = []} = this.props;
    console.log(items)
    return (
      <Fragment>
        <div className="k-breadcrumb">
          <div className="container content-container">
            <div className="breadcrumb-items">
              <BreadcrumbItem
                name={"Trang chủ"}
                onClick={() => customHistory.push("/")}
                showArrow={false}
              />
              {items.map((each, i) => (
                <BreadcrumbItem
                  key={each.name}
                  {...each}
                  active={i === items.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
        {children}
      </Fragment>

    );
  }
}