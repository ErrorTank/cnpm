import React from "react";
import {parseQueryString} from "../../../../string-utils";
import {customHistory} from "../../routes";
import {PageTitle} from "../../../common/page-title/page-title";

export class RedirectEmailConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      success: false
    };
    const queryObj = parseQueryString(props.location.search);
    if(!Object.keys(queryObj)[0] || !Object.values(queryObj)[0]){
      customHistory.push("/");
    }
  };

  renderText = () =>{
    let matcher = {
      0:  "Đang kiểm tra...",
      1: this.state.success ? "Đăng ký tài khoản thành công" : "Đã có lỗi xảy ra",
      2: this.state.success ? "Đang đăng nhập" : "Đang chuyển hướng về trang chủ"
    };
    return matcher[this.state.stage];
  };

  render() {
    return (
      <PageTitle
        title={"Chuẩn bị chuyển hướng..."}
      >
        <div id="initial-loading" className="redirect-email-confirm">
          <div className="lds-css ng-scope">
            <div id="il-wrapper">
              <div style={{width: "100%", height: "100%"}} className="lds-eclipse">
                <div>
                </div>
              </div>
              <p id="il-text">{this.renderText()}</p>
            </div>
          </div>
        </div>
      </PageTitle>

    );
  }
}