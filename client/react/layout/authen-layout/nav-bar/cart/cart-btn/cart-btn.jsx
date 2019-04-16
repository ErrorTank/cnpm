import React from "react";
import {Badge} from "../../../../../common/badge/badge";

export const CartBtn = props => (
  <div className="cart-btn"
       onClick={props.onClick}
  >
    <i className="fas fa-shopping-cart cart-icon"></i>
    Giỏ hàng
    <Badge
      className={"cart-count"}
      content={props.cartCount}
    />
  </div>
);