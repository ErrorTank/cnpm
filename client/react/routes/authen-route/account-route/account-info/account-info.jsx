import React, { Fragment } from "react";
import { KComponent } from "../../../../common/k-component";
import { Register } from "../../../../common/modal/user-actions/register/register";
import { createSimpleForm } from "../../../../common/form-validator/form-validator";
import { userInfo } from "../../../../../common/states/common";
import omit from "lodash/omit";

import { customHistory } from "../../../../routes/routes";

import { userUpdateSchema } from "./schema";
import { InputBase } from "../../../../common/base-input/base-input";
import { BirthPicker } from "../../../../common/birth-picker/birth-picker";
import { RadioGroup } from "../../../../common/radio-group/radio-group";
import { UploadBtn } from "../../../../common/upload-btn/upload-btn";
import { UploadImagesDisplay } from "../../../../common/upload-btn/upload-images-display/upload-images-display";
import { userApi } from "../../../../../api/common/user-api";

export default class AccountInfo extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      serverError: "",
      uploadErr: null
    };

    const info = userInfo.getState();
    let initData = omit(info, ["role", "subscribe", "isVerify"]);
    let initialDoB = new Date(+info.dob);
    // initialDoB.setHours(initialDoB.getHours() + 7);
    console.log(initialDoB);
    let dob = {
      day: initialDoB.getDate(),
      month: initialDoB.getMonth() + 1,
      year: initialDoB.getFullYear()
    };
    initData.dob = dob;
    initData.picture = initData.picture ? initData.picture : [];
    this.form = createSimpleForm(userUpdateSchema.schema, {
      initData: initData
    });

    this.onUnmount(this.form.on("enter", () => this.handleUpdate()));
    this.onUnmount(
      this.form.on("change", () => {
        this.state.serverError && this.setState({ serverError: "" });
        this.forceUpdate();
      })
    );
    // console.log(this.form.getData());
  }

  handleUpdate = () => {
    let data = this.form.getData();
    let { dob } = data;
    let { picture } = data;
    this.setState({ loading: true });
    let strDob = new Date(dob.year, dob.month - 1, dob.day).toISOString();
    let sendData = { ...data, dob: strDob };
    sendData.picture = sendData.picture[0] ? sendData.picture[0] : null;
    console.log(sendData);
    userApi
      .updateUserInfo({ userID: sendData._id, change: sendData })
      .then(user => {
        console.log(data);
        customHistory.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const info = userInfo.getState();
    let isValidForm = this.form.getInvalidPaths().length === 0;
    return (
      <div className="account-info">
        <div className="m-form m-form--state">
          {this.form.enhanceComponent(
            "fullname",
            ({ error, onChange, onEnter, ...others }) => (
              <InputBase
                className="account-info-input pt-0"
                error={error}
                id={"fullname"}
                type={"text"}
                placeholder={"Tên đầy đủ"}
                label={"Họ tên"}
                onChange={e => {
                  this.setState({ error: "" });
                  onChange(e);
                }}
                {...others}
              />
            ),
            true
          )}
          {this.form.enhanceComponent(
            "email",
            ({ error, onChange, onEnter, ...others }) => (
              <InputBase
                className="account-info-input pt-0"
                error={error}
                placeholder={"abc@xyz.com"}
                id={"email"}
                onKeyDown={onEnter}
                type={"text"}
                label={"Email"}
                onChange={e => {
                  this.setState({ error: "" });
                  onChange(e);
                }}
                {...others}
              />
            ),
            true
          )}
          {this.form.enhanceComponent(
            "phone",
            ({ error, onChange, onEnter, ...others }) => (
              <InputBase
                className="account-info-input pt-0 pb-0"
                error={error}
                id={"phone"}
                placeholder={"0123645678"}
                type={"text"}
                onChange={e => {
                  this.setState({ error: "" });
                  onChange(e);
                }}
                label={"Số điện thoại"}
                {...others}
              />
            ),
            true
          )}
          {this.form.enhanceComponent(
            "gender",
            ({ error, onChange, onEnter, ...others }) => (
              <RadioGroup
                className={"account-info-input pt-0 pb-0"}
                title={"Giới tính"}
                isChecked={(v, item) => {
                  return v === item.value;
                }}
                displayAs={item => item.label}
                radios={[
                  {
                    label: "Nam",
                    value: false
                  },
                  {
                    label: "Nữ",
                    value: true
                  }
                ]}
                onChange={v => {
                  onChange(v);
                }}
                {...others}
              />
            ),
            true
          )}
          {this.form.enhanceComponent(
            "dob",
            ({ error, onChange, onEnter, ...others }) => (
              <BirthPicker
                className={"account-info-input pt-0 pb-0"}
                label={"Ngày sinh"}
                error={error}
                onChange={onChange}
                value={others.value}
              />
            ),
            true,
            ["dob.day", "dob.month", "dob.year"]
          )}
          {this.form.enhanceComponent(
            "picture",
            ({ error, onChange, value, ...others }) => (
              <Fragment>
                <label className="form-control-label">Avatar: </label>
                {value != info.picture && (
                  <UploadImagesDisplay
                    images={value}
                    onRemove={data => {
                      this.setState({ uploadErr: null });
                      onChange(data);
                    }}
                  />
                )}
                <UploadBtn
                  onError={err => this.setState({ uploadErr: err })}
                  limit={5}
                  onChange={files => {
                    onChange(files);
                  }}
                  value={[]}
                  renderBtn={({ onClick }) => (
                    <button className="btn upload-img" onClick={onClick}>
                      Chọn hình
                    </button>
                  )}
                />
                {this.state.uploadErr && (
                  <p className="err-text">{this.state.uploadErr}</p>
                )}
              </Fragment>
            ),
            true
          )}
          <button
            type="button"
            className="btn confirm-btn mt-3"
            disabled={
              !isValidForm || this.state.loading || this.state.serverError
            }
            onClick={() => this.handleUpdate()}
          >
            Cập nhật
          </button>
        </div>
      </div>
    );
  }
}
