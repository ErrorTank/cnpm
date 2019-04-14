import React from "react";
import {KComponent} from "../../common/k-component";
import {userInfo} from "../../../common/states/user-info";


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
        <div className="authen-body">
          {this.props.children}
        </div>

      </div>
    );
  }
}
