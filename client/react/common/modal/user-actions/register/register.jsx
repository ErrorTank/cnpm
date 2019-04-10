import React from "react";
import {KComponent} from "../../../k-component";
import {InputBase} from "../../../base-input/base-input";
import * as yup from "yup";
import {createSimpleForm} from "../../../form-validator/form-validator";
import {RadioGroup} from "../../../radio-group/radio-group";

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
        day: yup.number().required("Ngày không được để trống"),
        month: yup.number().required("Tháng không được để trống"),
        year: yup.number().min(1900, "Năm sinh phải nằm trong khoảng 1900-2010").max(2010, "Năm sinh phải nằm trong khoảng 1900-2010").required("Năm không được để trống")
      })
    });
    this.form = createSimpleForm(registerSchema, {
      initData: {
        gender: 0,
        dob: {
          day: null,
          month: null,
          year: null
        }
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  render() {
    return (
      <div className="register-panel">
        <div className="m-form m-form--state">
          {this.form.enhanceComponent("fullname", ({error, onChange, onEnter,...others}) => (
            <InputBase
              className="registration-input pt-0"
              error={error}
              id={"fullname"}
              type={"text"}
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
              type={"text"}
              onChange={e => {
                this.setState({error: ""});
                onChange(e);
              }}
              label={"Mật khẩu"}
              {...others}
            />
          ), true)}
          {this.form.enhanceComponent("email", ({error, onChange, onEnter,...others}) => (
            <InputBase
              className="registration-input pt-0"
              error={error}
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
              isChecked={item => item.value === others.value}
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
              onChange={item => onChange(item.value)}
              {...others}


            />
          ), true)}

        </div>
      </div>
    );
  }
}