import React from "react";
import {KComponent} from "../../../k-component";
import {InputBase} from "../../../base-input/base-input";
import * as yup from "yup";
import {createSimpleForm} from "../../../form-validator/form-validator";
import {RadioGroup} from "../../../radio-group/radio-group";
import {BirthPicker} from "../../../birth-picker/birth-picker";
import {Checkbox} from "../../../checkbox/checkbox";
import {LoadingInline} from "../../../loading-inline/loading-inline";

export class Register extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      creating: false,
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
    });
    this.form = createSimpleForm(registerSchema, {
      initData: {
        fullname: "",
        phone: "",
        password: "",
        email: "",
        gender: 0,
        dob: {
          day: 0,
          month: 0,
          year: 0
        },
        subscribe: false
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };



  render() {
    let canRegister = this.form.getInvalidPaths().length === 0;
    console.log(this.form.getInvalidPaths())
    console.log(this.form.getData())
    return (
      <div className="register-panel">
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
                  value: 0
                }, {
                  label: "Nữ",
                  value: 1
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
                  disabled={!canRegister || this.state.loading}
                  onClick={() => this.handleLogin()}
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