import React from "react"
import {createNotificationPopup} from "../../../../../common/app-notification-popup/app-notification-popup";

export const cartChangePopup = createNotificationPopup({
  timeout: 4000
});

export const CartChangePopup = props => {
  return (
    <div className="cart-change-popup">
      {props.content}
    </div>
  );

};

