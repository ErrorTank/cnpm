import React from "react";
import classnames from "classnames"
import {QuantityController} from "../../../../../common/quantity-controller/quantity-controller";

const POption = ({content, onClick, active}) => {
  return (
    <div className={classnames("p-option", {active})}
         onClick={onClick}
    >
      {content}
    </div>)
};

const OptionSelect = ({onChange, options, current}) => {
  return (
    <div className="option-select">
      <div className="ins">
        Chọn phiên bản: <span className="p-des">{current.description}</span>
      </div>
      <div className="option-list">
        {options.map((each, i) => (
          <POption
            key={i}
            active={each._id === current._id}
            content={each.description}
            onClick={() => onChange({...each})}
          />
        ))}
      </div>
    </div>
  );
};

class BuyerAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    };
  };
  render() {
    let {qty} = this.state;
    return (
      <div className="buyer-actions">
        <div className="left-action">
          <QuantityController
            value={qty}
            onChange={qty => this.setState({qty})}
            label={"Số lượng:"}
          />
        </div>
        <div className="right-action">
          <button className="btn add-to-cart"
                  onClick={() => null}
          >
            <i className="fas fa-shopping-cart"></i> Chọn mua
          </button>
          <i className="far fa-heart add-to-fav"></i>
        </div>
      </div>
    )
  }
}

export class ProductOptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="product-option-select">
        <OptionSelect
          {...this.props}
        />
        <BuyerAction

        />
      </div>
    );
  }
}