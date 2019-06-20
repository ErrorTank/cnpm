import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {PageTitle} from "../../../common/page-title/page-title";
import {KComponent} from "../../../common/k-component";
import {userCheckoutItemInfo, userInfo} from "../../../../common/states/common";
import {customHistory} from "../../routes";
import {LineMultiSteps} from "../../../common/line-multi-steps/line-multi-steps";

export class CheckoutRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
    if(!userCheckoutItemInfo.getState()){
      customHistory.push("/cart");
    }
  };

  steps = [
    {
      title: "Đăng nhập",
      label: "1",
      passCondition: () => {
        return userInfo.getState();
      },
      render: ({step, stepIndex, navigate}) => {
        return (
          <div className="step-register">

          </div>
        )
      }
    },{
      title: "Địa Chỉ Giao Hàng",
      label: "2",
      render: ({step, stepIndex, navigate}) => {
        return (
          <div className="step-address">

          </div>
        )
      }
    },{
      title: "Thanh Toán & Đặt Mua",
      label: "3",
      render: ({step, stepIndex, navigate}) => {
        return (
          <div className="step-checkout">

          </div>
        )
      }
    },
  ];

  render() {
    return (
      <PageTitle
        title={"Thanh toán đơn hàng"}
      >
        <AuthenLayout
          showCategories={true}
        >
          <div className="container content-container checkout-route">
            <LineMultiSteps
              steps={this.steps}
              manualNavigate={false}
            />
          </div>
        </AuthenLayout>
      </PageTitle>
    );
  }
}