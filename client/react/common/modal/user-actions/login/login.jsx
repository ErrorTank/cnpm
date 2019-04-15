import React, {Fragment} from "react";
import * as yup from "yup"
import {createSimpleForm} from "../../../form-validator/form-validator";
import {InputBase} from "../../../base-input/base-input";
import {KComponent} from "../../../k-component";
import {LoadingInline} from "../../../loading-inline/loading-inline";
import {SocialAuthActions} from "../social-auth-actions/social-auth-actions";
import {client} from "../../../../../graphql";
import {getSocialUserInfo} from "../../../../../graphql/queries/user";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {userInfo} from "../../../../../common/states/user-info";
import {getErrorObject} from "../../../../../graphql/utils/errors";

export class Login extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    const loginSchema = yup.object().shape({
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
      password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt")
    });
    this.form = createSimpleForm(loginSchema, {
      initData: {
        email: "",
        password: ""
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => {
      this.forceUpdate();
      this.state.error && this.setState({error: ""});
    }));
    this.form.validateData();
  };

  renderServerError = () => {
    let {error} = this.state;
    let errMatcher = {
      "fb_login_failed": `Đăng nhập bằng Facebook thất bại. Vui lòng thử lại sau.`,
      "gg_login_failed": `Đăng nhập bằng Google thất bại. Vui lòng thử lại sau.`,
    };
    return errMatcher.hasOwnProperty(error) ? errMatcher[error] : "Đã có lỗi xảy ra."
  };

  handleLogin = () => {

  };

  socialStrategies = {
    "google": {
      isValid: (res) => res.hasOwnProperty("googleId") && res.googleId,
      getData: (res) => {
        let {email, name, imageUrl: picture, googleId} = res.profileObj;
        return {
          email, fullname: name, picture, social: {id: googleId, type: "GOOGLE"}
        }
      },
      errorMsg: "fb_login_failed"
    },
    "facebook": {
      isValid: (res) => res.hasOwnProperty("userID") && res.userID,
      getData: (res) => {
        let {email, name, picture: picObj, userID} = res;
        let picture = picObj.data.url;
        return {
          email, fullname: name, picture, social: {id: userID, type: "FACEBOOK"}
        }
      },
      errorMsg: "gg_login_failed"
    },
  };

  handleSocialResponse = (res, type) => {
    console.log(res);
    let strategy = this.socialStrategies[type];
    let {isValid, getData, errorMsg} = strategy;
    if (!isValid(res)) {
      this.setState({error: errorMsg});
      this.props.stopRunning();
    } else {
      let rawData = getData(res);
      client.query({
        query: getSocialUserInfo,
        variables: {
          socialID: rawData.social.id
        }
      }).then(({data}) => {
        let {user, token} = data.getSocialUserInfo;
        authenCache.setAuthen(token, {expire: 7});
        userInfo.setState({...user});
        this.props.onLoginSuccess();
      }).catch(err => {
        let errMsg = getErrorObject(err).message;
        if(errMsg === 'not_existed'){
          this.props.createNewSocialUser(rawData);
        }
      });
    }


  };

  render() {
    let canLogin = this.form.getInvalidPaths().length === 0;
    return (
      <div className={"login-panel"}>
        {this.state.error && (
          <div className="server-error">
            {this.renderServerError()}
          </div>
        )}
        <div className="m-form m-form--state">
          {this.form.enhanceComponent("email", ({error, onChange, onEnter, ...others}) => (
            <InputBase
              className="registration-input pt-0"
              error={error}
              id={"email"}
              onKeyDown={onEnter}
              type={"text"}
              label={"Email"}
              placeholder={"abc@xyz.com"}
              onChange={e => {

                this.setState({error: ""});
                onChange(e);
              }}
              {...others}
            />
          ), true)}
          {this.form.enhanceComponent("password", ({error, onChange, onEnter, ...others}) => (
            <InputBase
              className="registration-input pt-0 pb-0"
              error={error}
              id={"password"}
              type={"password"}
              placeholder={"Mật khẩu gồm ít nhất 6 kí tự"}
              onKeyDown={onEnter}
              onChange={e => {
                this.setState({error: ""});
                onChange(e);
              }}
              label={"Mật khẩu"}
              {...others}
            />
          ), true)}
        </div>
        <div className="forgot-password">
          Quên mật khẩu? Nhấn vào <span>đây</span>
        </div>
        <div className="button-actions">
          <button type="button" className="btn registration-btn"
                  disabled={!canLogin || this.state.loading || !this.state.error}
                  onClick={() => this.handleLogin()}
          >
            {this.state.loading ? (
              <LoadingInline
                className={"registration-loading"}
              />
            ) : "Đăng nhập"

            }

          </button>
          <SocialAuthActions
            handleClickSocialBtn={this.props.onLogin}
            onResponse={this.handleSocialResponse}
          />
        </div>
      </div>
    );
  }
}