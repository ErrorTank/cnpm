import React, {Fragment} from "react";
import {FormTabs} from "../../form-tabs/form-tabs";
import {Login} from "./login/login";
import {Register} from "./register/register";
import {modals} from "../modals";
import {resendModal} from "../resend-modal/resend-modal";
import {LoadingInline} from "../../loading-inline/loading-inline";

export class UserActionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.tabs[0],
      running: false,
      confirmRegister: null
    };
  };

  createNewSocialUser = (rawData) => {
    this.setState({running: false, confirmRegister: {...rawData}, currentTab: this.tabs[1]});

  };

  tabs = [
    {
      leftTitle: "Đăng nhập",
      des: "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.",
      label: "Đăng nhập",
      render: () =>
        <Login
          onLoginSuccess={() => this.props.onClose()}
          onLogin={() => this.setState({running: true})}
          stopRunning={() => this.setState({running: false})}
          createNewSocialUser={this.createNewSocialUser}
        />
    }, {
      leftTitle: "Tạo tài khoản",
      des: "Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.",
      label: "Tạo tài khoản",
      render: () =>
        <Register
          onRegistered={msg => this.props.onRegistered(msg)} confirmRegisterData={this.state.confirmRegister}
          onConfirmSocial={() => this.props.onClose()}
        />
    }
  ];


  render() {
    let {currentTab, running} = this.state;

    return (
      <div className="user-actions-modal">
        {running && (
          <LoadingInline/>
        )

        }
        <div className="left-side side">
          <Fragment>
            <p className="left-title">{currentTab.leftTitle}</p>
            <p className="left-description">{currentTab.des}</p>
          </Fragment>
        </div>
        <FormTabs
          className={"right-side side"}
          tabs={this.tabs}
          activeTab={currentTab}
          onChangeTab={(t) => this.setState({currentTab: t, confirmRegister: null})}
        />
      </div>
    );
  }
}


export const userActionModal = {
  open() {
    let matcher = (cred) =>  ({
      "email_sent": {
        title: `Thông báo`,
        body: (
          <span>Email đã được gửi thành công đến địa chỉ <span className="email-display">{cred.email}</span></span>
        ),

      },
      "not_verify": {
        title: "Thông báo",
        body: (
          <span>Địa chỉ email <span className="email-display">{cred.email}</span> chưa được kích hoạt, vui lòng truy cập vào email này để kích hoạt tài khoản.</span>
        ),
        btnResendText: "Gửi lại mã kích hoạt"
      }
    });
    const modal = modals.openModal({
      content: (
        <UserActionsModal
          onClose={() => modal.close()}
          onRegistered={cred => {
            modal.close();
            let config = matcher(cred.data)[cred.message];
            resendModal.open({...config, email: cred.data.email})
          }}

        />
      )
    });
    return modal.result;
  }
};