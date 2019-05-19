import React, {Fragment} from "react";
import {CartBtn} from "../cart/cart-btn/cart-btn";
import {customHistory} from "../../../../routes/routes";
import {userActionModal} from "../../../../common/modal/user-actions/user-actions";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {KComponent} from "../../../../common/k-component";
import {userCart, userFavorites, userInfo} from "../../../../../common/states/common";
import {clearAppStores, isLogin} from "../../../../../common/system/system";
import {HoverDropdown} from "../../../../common/hover-dropdown/hover-dropdown";
import {CommonDropdown} from "../../../../common/hover-dropdown/common-dropdown/common-dropdown";
import classnames from "classnames"
import {createUserCartCacheFunction, userCartCache} from "../../../../../common/cache/cart-cache";

export class Actions extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUnmount(userCart.onChange(() => {
      this.forceUpdate();
    }));
    this.onUnmount(userCartCache.onChange(() => {
      this.forceUpdate();
    }));

  };

  handleClickLogin = () => {
    userActionModal.open();
  };

  handleClickShowBill = () => {
    let authen = authenCache.getAuthen();
    if (authen) {
      customHistory.push("/bills")
    } else {
      userActionModal.open().then(status => status && customHistory.push("/bills"));
    }
  };

  actions = {
    0: [
      {
        label: () => "Đơn hàng của tôi",
        onClick: () => customHistory.push("/bills")
      }, {
        label: () => "Tài khoản của tôi",
        onClick: () => customHistory.push("/customer/account")
      }, {
        label: () => "Sản phẩm đã xem",
        onClick: () => customHistory.push("/danh-rieng-cho-ban")
      }, {
        label: () => (
          <Fragment><span className="ua-count">{userFavorites.getState().length}</span>Sản phẩm yêu thích</Fragment>
        ),
        onClick: () => customHistory.push("/customer/wishlist")
      }, {
        label: () => (
          <span>
            Đăng xuất
          </span>
        ),
        onClick: () => {
          authenCache.clearAuthen();
          clearAppStores();

        },
        className: "sign-out-action"
      }
    ]
  };

  render() {

    let info = userInfo.getState();

    let cartCount = info ? userCart.getState().length : createUserCartCacheFunction("get")({async: false}).length;
    return (
      <div className="actions nav-section">
        <div className="nav-box"
             onClick={this.handleClickShowBill}
        >
          <i className="fas fa-receipt"></i>
          <span>Xem đơn hàng</span>
        </div>
        {isLogin() ? (
          <HoverDropdown
            className={"nav-box user-actions-toggle"}
            toggleContent={(
              <Fragment>
                <i className="fas fa-user"></i>
                <div className="text-wrapper"><span>Chào {info.fullname}</span></div>
              </Fragment>
            )}
            dropdown={(
              <CommonDropdown
                className={"user-actions"}
                content={(
                  <div className="actions-list">
                    {this.actions[info.role].map((each, i) => (
                      <div className={classnames("action", each.className)} key={i}
                           onClick={each.onClick}
                      >
                        {each.label()}
                      </div>
                    ))}
                  </div>
                )}
              />
            )}
          />
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
          cartCount={cartCount}
        />

      </div>
    );
  }
}