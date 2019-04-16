import React from "react";
import {GlobalSearchBar} from "./global-search-bar/global-search-bar";
import {CartBtn} from "./cart/cart-btn/cart-btn";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleSearchGlobal = (val) => {

  };

  handleClickCart = () => {

  };

  render() {
    let {showCategories} = this.props;
    return (
      <div className="app-navbar-wrapper">
        <div className="app-navbar">
          <div className="container content-container">
            <div className="main-actions">
              <div className="app-brand nav-section">
                    <span className="app-name">
                      TAKA
                    </span>
              </div>
              <div className="global-search-wrapper nav-section">
                <GlobalSearchBar
                  onSearch={this.handleSearchGlobal}
                />
              </div>
              <div className="actions nav-section">
                <div className="nav-box">
                  <i className="fas fa-receipt"></i>
                  Xem đơn hàng
                </div>
                <div className="nav-box">
                  <i className="fas fa-receipt"></i>
                  Đăng nhập <span className="smaller">Tài khoản</span>
                </div>
                <div className="nav-box">
                  <i className="fas fa-receipt"></i>
                  Xem đơn hàng
                </div>
                <div className="nav-box">
                  <CartBtn
                    onClick={this.handleClickCart}
                  />
                </div>

              </div>
            </div>
            {showCategories && (
              <div className="bonus-actions col-12 px-0 m-0">

              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}