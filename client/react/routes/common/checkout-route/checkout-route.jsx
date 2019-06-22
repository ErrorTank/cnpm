import React from "react";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {PageTitle} from "../../../common/page-title/page-title";
import {KComponent} from "../../../common/k-component";
import {userCheckoutItemInfo, userInfo} from "../../../../common/states/common";
import {customHistory} from "../../routes";
import {LineMultiSteps} from "../../../common/line-multi-steps/line-multi-steps";
import {userActionModal} from "../../../common/modal/user-actions/user-actions";
import {ResetComponent} from "../with-reset/with-reset";
import {formatMoney} from "../../../../common/products-utils";

export class CheckoutRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: this.steps[0].passCondition() ? 1 : 0
    };
    this.onUnmount(userInfo.onChange((nextState, oldState) => {
      if (!nextState && oldState) {
        customHistory.push("/cart");
      } else if (!oldState && nextState) {
        this.setState({step: 1});
      }

    }));
    if (!userCheckoutItemInfo.getState()) {
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
          <WithCartListAndAddress
            title={stepIndex + 1 + ". Đăng nhập"}
            render={() => (
              <div className="step-register section-box">
                <p className="suggest">Vui lòng đăng nhập hoặc đăng ký để tiếp tục thanh toán</p>
                <button className="btn btn-login" onClick={() => {
                  userActionModal.open({redirect: "/cart"})
                }}>Đăng nhập
                </button>
              </div>
            )}
          />
        )
      }
    }, {
      title: "Địa Chỉ Giao Hàng",
      label: "2",
      render: ({step, stepIndex, navigate}) => {
        return (
          <WithCartListAndAddress
            render={() => (
              <div className="step-address">

              </div>
            )}
          />
        )
      }
    }, {
      title: "Thanh Toán & Đặt Mua",
      label: "3",
      render: ({step, stepIndex, navigate}) => {
        return (
          <WithCartListAndAddress
            render={() => (
              <div className="step-checkout">

              </div>
            )}
          />
        )
      }
    },
  ];

  render() {
    let {step} = this.state;
    return (
      <ResetComponent
        render={() => (
          <PageTitle
            title={"Thanh toán đơn hàng"}
          >
            <AuthenLayout
              showCategories={true}
            >
              {userCheckoutItemInfo.getState() && (
                <div className="container content-container checkout-route">
                  <LineMultiSteps
                    steps={this.steps}
                    manualNavigate={false}
                    step={step}
                    onChange={s => this.setState({step: s})}
                  />
                </div>
              )}

            </AuthenLayout>
          </PageTitle>
        )}
      />

    );
  }
}

const WithCartListAndAddress = props => {
  let {render, title} = props;
  let {items, vouchers} = userCheckoutItemInfo.getState();
  return (
    <div className="step-section">
      <p className="step-title">{title}</p>
      <div className="step-body">
        <div className="left-panel">
          {render()}
        </div>
        <div className={"separate"}></div>
        <div className="right-panel">
          <CheckoutInfoBox
            title={() => {
              return `Đơn hàng (${items.reduce((total, cur) => total + cur.quantity, 0)} sản phẩm)`
            }}
            content={() => {
              return (
                <div className="cart-list">
                  {items.map((each, i) => (
                    <div className="item" key={each.product.provider[0].options[0]._id}>
                      <div className="info">
                        <p className="name-qty">
                          <strong className="qty">{each.quantity} x</strong>
                          <a className="name" target={"_blank"} href={`/product/${each.product._id}`}>{each.product.name} - {each.product.provider[0].options[0].description}</a>
                        </p>
                        <p className="provider">Cung cấp bởi <strong>{each.product.provider[0].owner.provider.name}</strong></p>
                      </div>
                      <span className="price">{formatMoney((each.product.provider[0].options[0].price * each.quantity * (each.product.regularDiscount ? (1 - each.product.regularDiscount / 100) : 1)))} ₫</span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
        </div>
      </div>

    </div>
  )
};

const CheckoutInfoBox = props => {
  let {title, onClick, content} = props;
  return (
    <div className="checkout-info-box section-box">
      <div className="cl-header">
        <span className="cl-title">{title()}</span>
        <button className="cl-btn btn" onClick={onClick}>Sửa</button>
      </div>
      <div className="cl-body">
        {content()}
      </div>
    </div>
  )
};