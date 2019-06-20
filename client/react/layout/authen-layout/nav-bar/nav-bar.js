import React, {Fragment} from "react";
import {GlobalSearchBar} from "./global-search-bar/global-search-bar";
import {CartBtn} from "./cart/cart-btn/cart-btn";
import {customHistory} from "../../../routes/routes";
import {Actions} from "./actions/actions";
import {CategoriesOverlay} from "./categories-overlay/categories-overlay";
import classnames from "classnames"

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  };

  handleSearchGlobal = (val) => {
    customHistory.push(`/search?keyword=${encodeURIComponent(val.trim())}`)
  };


  render() {
    let {showCategories} = this.props;
    let {pathname, search} = customHistory.location;
    return (
      <Fragment>
        {this.state.show && (
          <div className="temp-block"></div>
        )}
        <div className={classnames("app-navbar-wrapper", {show: this.state.show})}>
          <div className="app-navbar">
            <div className="container content-container">
              <div className="main-actions">
                <div className="app-brand nav-section">
                    <span className="app-name"
                          onClick={() => customHistory.push("/")}
                    >
                      TAKA
                    </span>
                </div>
                <div className="global-search-wrapper nav-section">
                  <GlobalSearchBar
                    onSearch={this.handleSearchGlobal}
                  />
                </div>
                <Actions
                  redirect={pathname + search}
                />
              </div>
              {showCategories && (
                <div className="bonus-actions col-12 px-0 m-0">
                  <CategoriesOverlay
                    show={this.state.show}
                    onToggle={() => this.setState({show: true})}
                    onMouseLeave={() => this.setState({show: false})}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>

    );
  }
}