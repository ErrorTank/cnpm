import React from "react";
import {GlobalSearchBar} from "./global-search-bar/global-search-bar";
import {CartBtn} from "./cart/cart-btn/cart-btn";
import {customHistory} from "../../../routes/routes";
import {Actions} from "./actions/actions";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleSearchGlobal = (val) => {

  };


  render() {
    let {showCategories} = this.props;
    return (
      <div className="app-navbar-wrapper">
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
              <Actions/>
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