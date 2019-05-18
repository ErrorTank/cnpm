import React, {Fragment} from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";
import {KComponent} from "../../../common/k-component";
import * as yup from "yup";
import {createSimpleForm} from "../../../common/form-validator/form-validator";
import {InputBase} from "../../../common/base-input/base-input";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {client} from "../../../../graphql";
import {changePassword} from "../../../../graphql/queries/user";
import Alert from "../../../common/alert/alert";
import {getErrorObject} from "../../../../graphql/utils/errors";
import {parseQueryString} from "../../../../string-utils";
import {customHistory} from "../../routes";
import {userInfo} from "../../../../common/states/common";

export class ResetPassword extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      success: false
    };
    this.onUnmount(userInfo.onChange((nextState) => {
      if(nextState){
        customHistory.push("/");
      }
    }));
    const resetPasswordSchema = yup.object().shape({
      password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").noSpecialChar("Mật khẩu không được có kí tự đặc biệt"),
      rePassword: yup.string().equalTo(yup.ref("password"), "Mật khẩu nhập lại không trùng với mật khẩu mới")
    });
    this.form = createSimpleForm(resetPasswordSchema, {
      initData: {
        password: "",
        rePassword: ""
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleChangePassword()));
    this.onUnmount(this.form.on("change", () => {
      this.forceUpdate();
      this.state.error && this.setState({error: ""});
    }));
    this.form.validateData();
  };
  //Todo: add event listen to user info change and redirect to home
  handleChangePassword = () => {
    let data = this.form.getData();
    this.setState({loading: true});
    const queryObj = parseQueryString(this.props.location.search);

    if(queryObj.hasOwnProperty("reset_code")){
      client.mutate({
        mutation: changePassword,
        variables: {
          payload: {
            password: data.password,
            token: queryObj.reset_code
          }

        }
      }).then(() => {
        this.setState({success: true});
      }).catch(err => {
        this.setState({serverError: getErrorObject(err).message, loading: false})
      });
    }

  };

  renderServerError = () => {
    let {error} = this.state;
    let errMatcher = {
      "token_expired": `Phiên đổi mật khẩu đã hết hạn, vui lòng thử lại sau.`,
    };
    return errMatcher.hasOwnProperty(error) ? errMatcher[error] : "Đã có lỗi xảy ra."
  };

  render() {
    let canLogin = this.form.getInvalidPaths().length === 0 && !this.state.loading;
    return (
      <PageTitle
        title={"Đổi mật khẩu"}
      >
        <AuthenLayout
          showCategories={true}
        >
          <div className="reset-password">
            <div className="rp-form-wrapper">
              <p className="rp-title">Tạo mật khẩu mới</p>
              {this.state.success ? (
                  <Alert
                    className={"notify m-alert--outline"}
                    content={(
                      <span>
                        Mật khẩu được đổi thành công! Về <span className="email-display" onClick={() => customHistory.push("/")}>trang chủ</span>
                      </span>
                    )}
                    type={"success"}
                    title={"Thông báo"}
                  />
                ) :
                this.state.error ? (
                  <Alert
                    className={"notify m-alert--outline"}
                    content={this.renderServerError()}
                    type={"danger"}
                    title={"Thông báo"}
                  />
                ) : (
                  <Fragment>
                    <div className="rp-form m-form m-form--state mt-3">

                      {this.form.enhanceComponent("password", ({error, onChange, onEnter, ...others}) => (
                        <InputBase
                          className="rp-input pt-0 pb-0"
                          error={error}
                          id={"password"}
                          type={"password"}
                          placeholder={"Mật khẩu gồm ít nhất 6 kí tự"}
                          onKeyDown={onEnter}
                          onChange={e => {
                            this.setState({error: ""});
                            onChange(e);
                          }}
                          label={"Mật khẩu mới"}
                          {...others}
                        />
                      ), true)}
                      {this.form.enhanceComponent("rePassword", ({error, onChange, onEnter, ...others}) => (
                        <InputBase
                          className="rp-input pt-0 pb-0"
                          error={error}
                          id={"re-password"}
                          type={"password"}
                          placeholder={"Yêu cầu trùng với mật khẩu mới"}
                          onKeyDown={onEnter}
                          onChange={e => {
                            this.setState({error: ""});
                            onChange(e);
                          }}
                          label={"Nhập lại mật khẩu"}
                          {...others}
                        />
                      ), true)}

                    </div>
                    <button type="button" className="btn rp-btn"
                            disabled={!canLogin}
                            onClick={() => this.handleChangePassword()}
                    >
                      {this.state.loading ? (
                        <LoadingInline
                          className={"rp-loading"}
                        />
                      ) : "Đổi mật khẩu"

                      }

                    </button>
                  </Fragment>
                )
              }

            </div>
          </div>
        </AuthenLayout>

      </PageTitle>

    );
  }
}