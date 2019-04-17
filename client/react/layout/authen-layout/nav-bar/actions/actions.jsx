import React from "react";
import {CartBtn} from "../cart/cart-btn/cart-btn";
import {customHistory} from "../../../../routes/routes";
import {userActionModal} from "../../../../common/modal/user-actions/user-actions";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {KComponent} from "../../../../common/k-component";
import {userInfo} from "../../../../../common/states/user-info";
import {isLogin} from "../../../../../common/system/system";

export class Actions extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUnmount(userInfo.onChange(() => {
      this.forceUpdate();
    }));
  };

  handleClickLogin = () => {
    userActionModal.open();
  };

  handleClickShowBill = () => {
    let authen = authenCache.getAuthen();
    if(authen){
      customHistory.push("/bills")
    }else{
      userActionModal.open().then(status => status && customHistory.push("/bills"));
    }
  };

  render() {

    let info = userInfo.getState();
    console.log(info)
    return (
      <div className="actions nav-section">
        <div className="nav-box"
             onClick={this.handleClickShowBill}
        >
          <i className="fas fa-receipt"></i>
          <span>Xem đơn hàng</span>
        </div>
        {isLogin() ? (
          <div className="nav-box user-actions-toggle">
            <i className="fas fa-user"></i>
            <span>Chào {info.fullname}</span>
          </div>
        ) : (
          <div className="nav-box"
               onClick={this.handleClickLogin}
          >
            <i className="fas fa-user"></i>
            <span>Đăng nhập</span>
          </div>
        )}
        <CartBtn
          onClick={() => customHistory.push("/cart")}
          cartCount={0}
        />

      </div>
    );
  }
}