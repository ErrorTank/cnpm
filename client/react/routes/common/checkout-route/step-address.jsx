import React from "react";
import {userInfo} from "../../../../common/states/common";

export class StepAddress extends React.Component {
  constructor(props) {
    super(props);
    let info = userInfo.getState();
    this.state = {
      show: info ? !info.address : false
    };
  };

  render() {
    return (
      <div className="step-address">
        <p className="suggest">Chọn địa chỉ giao hàng có sẵn bên dưới:</p>
        <div className="dash-box">

        </div>
      </div>
    );
  }
}