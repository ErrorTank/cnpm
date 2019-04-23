import React from "react";
import {KComponent} from "../../common/k-component";
import {userInfo} from "../../../common/states/user-info";
import {Navbar} from "./nav-bar/nav-bar";


export class AuthenLayout extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUnmount(userInfo.onChange((newState, oldState) => {
      if(!newState || !oldState){
        return;
      }
      if(oldState.role !== newState.role)
        this.forceUpdate();
    }))
  };

  render() {

    return (
      <div className="authen-layout">
        <Navbar
          {...this.props}
        />b
        <div className="authen-body">
          {this.props.children}
        </div>

      </div>
    );
  }
}
