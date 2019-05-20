import React from "react"
import {createNotificationPopup} from "../../../../../common/app-notification-popup/app-notification-popup";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const cartChangePopup = createNotificationPopup({
  timeout: 5000
});


export const CartChangePopupUI = props => {
  return (
    <CSSTransition in={props.show}  timeout={300} classNames={"fade"} onExited={() => props.deleteContent()}>
      {props.content ? (
        <div className="cart-change-popup">
          {props.content}
        </div>
      ) : <span style={{display: "none"}}></span>}

    </CSSTransition>

  );


};

