import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {PageTitle} from "../../../common/page-title/page-title";
import {KComponent} from "../../../common/k-component";
import {userCheckoutItemInfo} from "../../../../common/states/common";
import {customHistory} from "../../routes";

export class CheckoutRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
    if(!userCheckoutItemInfo.getState()){
      customHistory.push("/");
    }
  };

  steps = [

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

          </div>
        </AuthenLayout>
      </PageTitle>
    );
  }
}