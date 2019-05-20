import React from "react"
import {createNotificationPopup} from "../../../../../common/app-notification-popup/app-notification-popup";
import {CSSTransition} from "react-transition-group";

export const cartChangePopup = createNotificationPopup({
  timeout: 20000
});

export const CartChangePopup = props => {
  return (
    <CSSTransition in={!!props.content} timeout={10000} classNames="cart-change-popup">
      <div>
        {props.content}
      </div>
    </CSSTransition>
  );

};

