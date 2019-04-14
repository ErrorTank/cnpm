import React from "react";
import {KComponent} from "../../../k-component";
import {InputBase} from "../../../base-input/base-input";
import * as yup from "yup";
import {createSimpleForm} from "../../../form-validator/form-validator";
import {RadioGroup} from "../../../radio-group/radio-group";
import {BirthPicker} from "../../../birth-picker/birth-picker";
import {Checkbox} from "../../../checkbox/checkbox";
import {LoadingInline} from "../../../loading-inline/loading-inline";
import {client} from "../../../../../graphql";
import {register} from "../../../../../graphql/queries/user";
import {getErrorObject} from "../../../../../graphql/utils/errors";

export class Register extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      serverError: "",
    };
    const registerSchema = yup.object().shape({
      fullname: yup.string().min(6, "Họ và tên phải lớn hơn 6 kí tự").max(50, "Họ và tên phải nhỏ hơn 50 kí tự").onlyWord("Họ và tên không được có kí tự đặc biệt").notHaveNumber("Họ và tên không được có chữ số").required("Họ tên không được để trống"),
      phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
      password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt").required("Mật khẩu không được để trống"),
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
      gender: yup.boolean().required(),
      dob: yup.object().shape({
        day: yup.number().moreThan(0,"Ngày không được để trống"),
        month: yup.number().moreThan(0,"Tháng không được để trống"),
        year: yup.number().moreThan(0, "Năm không được để trống")
      }),
      subscribe: yup.boolean().required(),
      role: yup.number().required()
    });
    this.form = createSimpleForm(registerSchema, {
      initData: {
        fullname: "Tuan anh",
        role: 0,
        phone: "012313132",
        password: "123123qwe",
        email: "kappatank98@gmail.com",
        gender: false,
        dob: {
          day: 12,
          month: 1,
          year: 1998
        },
        subscribe: true
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => {
      this.setState({serverError: ""});
      this.forceUpdate()
    }));
    this.form.validateData();
  };

  renderServerError = () => {
    let {serverError} = this.state;
    let {email} = this.form.getData();
    let errMatcher = {
      "account_taken": `Tài khoản ${email} đã tồn tại, vui lòng tạo lại.`,
    };
    return errMatcher.hasOwnProperty(serverError) ? errMatcher[serverError] : "Đã có lỗi xảy ra."
  };

  handleServerResponse = (res) => {
    this.props.onRegistered(res)
  };

  handleRegister = () => {
    let data = this.form.getData();
    let {dob} = data;
    this.setState({loading: true});
    let strDob = new Date(dob.year, dob.month - 1, dob.day).toISOString();
    client.mutate({
      mutation:register,
      variables: {
        data: {...data, dob: strDob}
      }
    })
      .then((response) => {
        this.setState({loading: false});
        this.handleServerResponse({message: response.message, data: this.form.getData()});
      })

      .catch(err => {
        let errMsg = getErrorObject(err).message;
        this.setState({loading: false, serverError: errMsg})
      });
  };

  render() {
    let canRegister = this.form.getInvalidPaths().length === 0;
    console.log(this.form.getInvalidPaths())
    return (
      <div className="register-panel">
        {this.state.serverError && (
          <div className="server-error">
            {this.renderServerError()}
          </div>
        )}
        <div className="m-form m-form--state">
          {this.form.enhanceComponent("fullname", ({error, onChange, onEnter,...others}) => (
            <InputBase
              className="registration-input pt-0"
              error={error}
              id={"fullname"}
              type={"text"}
              placeholder={"Vũ Tuấn Anh"}
              label={"Tên đầy đủ"}
              onChange={e => {
                this.setState({error: ""});
                onChange(e);
              }}
              {...others}
            />
          ), true)}
          {this.form.enhanceComponent("phone", ({error,  onChange, onEnter,  ...others}) => (
            <InputBase
              className="registration-input pt-0 pb-0"
              error={error}
              id={"phone"}
              placeholder={"0123645678"}
              type={"text"}
              onChange={e => {
                this.setState({error: ""});
                onChange(e);
              }}
              label={"Số điện thoại"}
              {...others}
            />
          ), true)}
          {this.form.enhanceComponent("email", ({error, onChange, onEnter,...others}) => (
            <InputBase
              className="registration-input pt-0"
              error={error}
              placeholder={"abc@xyz.com"}
              id={"email"}
              onKeyDown={onEnter}
              type={"text"}
              label={"Email"}
              onChange={e => {

                this.setState({error: ""});
                onChange(e);
              }}
              {...others}
            />
          ), true)}
          {this.form.enhanceComponent("password", ({error,  onChange, onEnter,  ...others}) => (
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
          {this.form.enhanceComponent("gender", ({error, onChange, onEnter,...others}) => (
            <RadioGroup
              className={"registration-input pt-0 pb-0"}
              title={"Giới tính"}
              isChecked={(v, item) => {
                return v === item.value
              }}
              displayAs={item => item.label}
              radios={[
                {
                  label: "Nam",
                  value: false
                }, {
                  label: "Nữ",
                  value: true
                }
              ]}
              onChange={v => {
                onChange(v)
              }}
              {...others}


            />
          ), true)}
          {this.form.enhanceComponent("dob", ({error, onChange, onEnter,...others}) => (
            <BirthPicker
              className={"registration-input pt-0 pb-0"}
              label={"Ngày sinh"}
              error={error}
              onChange={onChange}
              value={others.value}
            />
          ), true, ["dob.day", "dob.month", "dob.year"])}
          {this.form.enhanceComponent("subscribe", ({error, onEnter,...others}) => (
            <Checkbox
              className={"subscribe-btn"}
              label={"Nhận các thông tin và chương trình khuyến mãi của Taka qua email."}
              {...others}
            />
          ), true)}
          <button type="button" className="btn registration-btn mt-3"
                  disabled={!canRegister || this.state.loading || this.state.serverError}
                  onClick={() => this.handleRegister()}
          >
            {this.state.loading ? (
              <LoadingInline
                className={"registration-loading"}
              />
            ) : "Đăng ký"

            }

          </button>
        </div>
      </div>
    );
  }
}