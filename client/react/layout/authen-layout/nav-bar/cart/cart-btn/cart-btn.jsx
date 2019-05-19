import React from "react";
import {Badge} from "../../../../../common/badge/badge";


export class CartBtn extends React.Component {
  constructor(props) {
    super(props);

  };



  render() {
    return (
      <div className="cart-btn"
           onClick={this.props.onClick}
      >
        <i className="fas fa-shopping-cart cart-icon"></i>
        Giỏ hàng
        <Badge
          className={"cart-count"}
          content={this.props.cartCount}
        />
      </div>
    );
  }
}

