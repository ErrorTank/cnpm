import React, {Fragment} from "react";
import * as yup from "yup"
import {createSimpleForm} from "../../../form-validator/form-validator";
import {InputBase} from "../../../base-input/base-input";
import {KComponent} from "../../../k-component";


export class Login extends KComponent{
    constructor(props){
        super(props);
        this.state={
        };
        const loginSchema = yup.object().shape({
            username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
            password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt")
        });
        this.form = createSimpleForm(loginSchema, {
            initData: {
                username: "",
                password: ""
            }
        });
        this.onUnmount(this.form.on("enter", () => this.handleLogin()));
        this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    };

    handleLogin = () => {

    };

    render(){
        return(
            <div className={"login-panel"}>
                <div className="m-form m-form--state">
                    {this.form.enhanceComponent("username", ({error, onChange, onEnter,...others}) => (
                        <InputBase
                            className="registration-input pt-0"
                            error={error}
                            id={"username"}
                            onKeyDown={onEnter}
                            type={"text"}
                            label={"Tên đăng nhập"}
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
                </div>
                <div className="forgot-password">
                    Quên mật khẩu? Nhấn vào <span>đây</span>
                </div>
            </div>
        );
    }
}