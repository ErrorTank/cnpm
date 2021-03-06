import React from "react";
import {parseQueryString} from "../../../../string-utils";
import {customHistory} from "../../routes";
import {PageTitle} from "../../../common/page-title/page-title";
import {client} from "../../../../graphql";
import {checkConfirm} from "../../../../graphql/queries/user";
import {authenCache} from "../../../../common/cache/authen-cache";
import {userInfo} from "../../../../common/states/common";
import {wait} from "../../../../common/common-utils";
import {getErrorObject} from "../../../../graphql/utils/errors";
import {mutateAppStores} from "../../../../common/system/system";

export default class RedirectEmailConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      msg: ""
    };
    const queryObj = parseQueryString(props.location.search);
    if(queryObj.hasOwnProperty("invitation_code")){
      client.query({
        query: checkConfirm,
        variables: {
          token: queryObj.invitation_code
        }
      }).then(async (res) => {
        this.setState({stage: 1});
        authenCache.setAuthen(res.data.checkConfirm.token, {expire: 30});
        await mutateAppStores({...res.data.checkConfirm.user});
        await wait(() => this.setState({stage: 2}));
        await wait(() => customHistory.push(res.data.checkConfirm.redirect || "/"));
      }).catch(async (err) => {
        let errMsg = getErrorObject(err).message;
        this.setState({stage: 1, msg: errMsg});
        await wait(() => this.setState({stage: 2}));
        await wait(() => customHistory.push("/"));
      })

    }else{
      customHistory.push("/");
    }
  };

  renderText = () =>{
    let matcher = {
      0:  "Đang kiểm tra...",
      1: !this.state.msg ? "Đăng ký tài khoản thành công" : this.state.msg === "token_expire" ? "Mã xác nhận hết hạn" :"Đã có lỗi xảy ra",
      2: !this.state.msg ? "Đang đăng nhập..." : "Chuyển hướng về trang chủ..."
    };
    return matcher[this.state.stage];
  };

  render() {
    return (
      <PageTitle
        title={"Chuẩn bị chuyển hướng..."}
      >
        <OverlayLoading
          renderText={this.renderText}
        />
      </PageTitle>

    );
  }
}

export const OverlayLoading = ({renderText = () => "Đang tải..."}) => (
  <div id="initial-loading">
    <div className="lds-css ng-scope">
      <div id="il-wrapper">
        <div style={{width: "100%", height: "100%"}} className="lds-eclipse">
          <div>
          </div>
        </div>
        <p id="il-text">{renderText()}</p>
      </div>
    </div>
  </div>
)