import React from "react";
import {RadioGroup} from "../../../common/radio-group/radio-group";
import {formatMoney} from "../../../../common/products-utils";
import {userCheckoutItemInfo} from "../../../../common/states/common";

export class StepCheckout extends React.Component {
  constructor(props) {
    super(props);
    console.log(userCheckoutItemInfo.getState())
    this.state = {
      isQuickShip: !!userCheckoutItemInfo.getState().quickShip
    };
  };

  render() {
    return (
      <div className="step-checkout section-box">
        <RadioGroup
          className={"shipment-select pt-0 pb-0"}
          title={"Chọn hình thức giao hàng"}
          isChecked={(v, item) => {
            return v === item.value
          }}
          displayAs={item => item.label}
          radios={[
            {
              label: "Giao Hàng Tiêu Chuẩn",
              value: false
            }, {
              label: (<p style={{display: "text"}}>Giao Hàng Nhanh <span style={{color: "#090"}}>(+ {formatMoney(20000)}đ)</span></p>),
              value: true
            }
          ]}
          onChange={v => {
            userCheckoutItemInfo.setState({...userCheckoutItemInfo.getState(), quickShip: v}).then(() => this.setState({isQuickShip: v}) );

          }}
          value={this.state.isQuickShip}


        />
      </div>
    );
  }
}