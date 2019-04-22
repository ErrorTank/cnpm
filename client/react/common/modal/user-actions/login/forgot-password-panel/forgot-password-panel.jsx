import React, {Fragment} from "react";
import {InputBase} from "../../../../base-input/base-input";
import {LoadingInline} from "../../../../loading-inline/loading-inline";
import * as yup from "yup";
import {client} from "../../../../../../graphql";
import {checkEmailExisted, confirmForgotPassword} from "../../../../../../graphql/queries/user";
import debounce from "lodash/debounce"
import Alert from "../../../../alert/alert";

export class ForgotPasswordPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
      error: "",
      checking: false,
      startValidate: false,
      success: false
    };
  };

  emailValidator = yup.object().shape({
    email: yup.string().email().required()
  });

  handleChangePassword = () => {
    let {email} = this.state;
    this.setState({loading: true});
    client.mutate({
      mutation: confirmForgotPassword,
      variables: {
        email
      }
    }).then(() => this.setState({success: true}))
      .catch(() => this.setState({error: "Đã có lỗi xảy ra", loading: false}));
  };

  checkEmailExisted = (email) => {
    client.query({
      query: checkEmailExisted,
      variables: {
        email
      }
    }).then(({data}) => {
      let {checkEmailExisted} = data;
      if(!checkEmailExisted)
        this.setState({error: "Tài khoản không tồn tại", checking: false})
      else{
        this.setState({checking: false})
      }
    })
  };

  debounceCheckEmailExisted = debounce(this.checkEmailExisted, 1500);

  handleChange = e => {
    let email = e.target.value;
    if(!this.state.startValidate){
      this.setState({startValidate: true});
    }
    this.setState({error: "", email});

    if(this.emailValidator.isValidSync({email})){
      this.setState({checking: true});
      this.debounceCheckEmailExisted(email);
    }
  };

  render() {
    let {email, loading, error, checking, startValidate, success} = this.state;
    let isValid = this.emailValidator.isValidSync({email});

    let canLogin = isValid && !loading && !checking && !error;
    return (
      <div className="forgot-password-panel">
        <div className="actions">
          <span onClick={this.props.onBack}><i className="fas fa-arrow-left"></i> Về đăng nhập</span>
        </div>
        {success ? (
          <Alert
            className={"success-notify m-alert--outline"}
            content={`Email xác nhận đã được gửi đến địa chỉ ${email}`}
            type={"success"}
            title={"Thông báo"}
          />
        ) : (
          <Fragment>
            <p className="fp-title">Quên mật khẩu?</p>
            <p className="instruction">Vui lòng cung cấp email đăng nhập để lấy lại mật khẩu.</p>
            <div className="input-wrapper">
              <InputBase
                className="registration-input pt-0"
                id={"email"}
                error={startValidate ? isValid ? error ? {message: error} : null : {message: "Email không hợp lệ"} : null}
                type={"text"}
                placeholder={"abc@xyz.com"}
                onChange={this.handleChange}
                value={email}
              />
              {checking && (
                <span className="check-loading">
              <i className="fas fa-spinner spin"></i>
            </span>
              )

              }


            </div>

            <button type="button" className="btn registration-btn"
                    disabled={!canLogin}
                    onClick={this.handleChangePassword}
            >
              {this.state.loading ? (
                <LoadingInline
                  className={"registration-loading"}
                />
              ) : "Gửi email"

              }

            </button>
          </Fragment>
        )}

      </div>
    );
  }
}