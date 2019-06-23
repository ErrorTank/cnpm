import React, {Fragment} from "react";
import {userInfo} from "../../../../common/states/common";
import omit from "lodash/omit"
import isEqual from "lodash/isEqual"
import {KComponent} from "../../../common/k-component";
import {createSimpleForm} from "../../../common/form-validator/form-validator";
import {InputBase} from "../../../common/base-input/base-input";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import Select from "react-select";
import * as yup from "yup";
import {client} from "../../../../graphql";
import {fetchCities, fetchDistricts, fetchWards} from "../../../../graphql/queries/location";
import {updateUserInfo} from "../../../../graphql/queries/user";

export class StepAddress extends KComponent {
  constructor(props) {
    super(props);
    let info = userInfo.getState();
    this.state = {
      show: info ? (!info.address || !info.address.description) : false,
      loading: false,
      fetching: false,
      cities: [],
      districts: [],
      wards: []
    };
    this.onUnmount(userInfo.onChange((newState, oldState) => {
      if (!newState || !oldState) {
        return;
      }
      this.form.updateData({...this.initData()});

    }));
    let schema = yup.object().shape({
      fullname: yup.string().min(6, "Họ và tên phải lớn hơn 6 kí tự").max(50, "Họ và tên phải nhỏ hơn 50 kí tự").onlyWord("Họ và tên không được có kí tự đặc biệt").notHaveNumber("Họ và tên không được có chữ số").required("Họ tên không được để trống"),
      phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
      description: yup.string().min(5, "Đia chỉ phải lớn hơn 5 kí tự").max(60, "Đia chỉ phải nhỏ hơn 60 kí tự").required("Đia chỉ không được để trống"),
      ward: yup.object().nullable(false).required("Phường/Xã không được bỏ trống"),
      district: yup.object().nullable(false).required("Quận/Huyện không được bỏ trống"),
      city: yup.object().nullable(false).required("Tỉnh/Thành phố không được bỏ trống")
    });

    this.form = createSimpleForm(schema, {
      initData: {
        ...this.initData()
      }
    });
    client.query({
      query: fetchCities,
      fetchPolicy: "no-cache"
    }).then(({data}) => this.setState({cities: data.fetchCities.map(each => omit(each, "__typename")), fetching: false}));
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => {
      this.forceUpdate()
    }));
    this.form.validateData();
  };

  initData = () => {
    let info = userInfo.getState();
    return {
      fullname: info.fullname,
      phone: info.phone,
      ward: info.address ? info.address.ward.name : null,
      district: info.address ? info.address.district.name : null,
      city: info.address ? info.address.city.name : null,
      description: info.address ? (info.address.description || "") : ""
    }
  };

  handleConfirm = () => {
    let data = this.form.getData();
    this.setState({loading: true});
    let mutation = {
      fullname: data.fullname.trim(),
      phone: data.phone.trim(),
      address: {
        ward: data.ward,
        district: data.district,
        city: data.city,
        description: data.description.trim()
      }
    };
    client.mutate({
      mutation: updateUserInfo,
      variables: {
        mutation,
        userID: userInfo.getState()._id
      }
    }).then(() => {
      userInfo.setState({...userInfo.getState(), ...mutation}).then(() => this.setState({loading: false, show: false}));
    });
  };

  render() {
    let info = userInfo.getState();
    let {onFinish} = this.props;
    let canConfirm = !this.form.getInvalidPaths().length && !isEqual(this.initData(), this.form.getData());
    return (
      <div className="step-address">

        {(info.address && info.address.description) ? (
          <Fragment>
            <p className="suggest">Chọn địa chỉ giao hàng có sẵn bên dưới:</p>
            <div className="dash-box">
              <div className="db-header">
                <span className="username">{info.fullname}</span>
                <span className="sub">Mặc định</span>
              </div>
              <div className="db-body">
                <p>Địa
                  chỉ: {info.address.description}, {info.address.ward.name_with_type}, {info.address.district.name_with_type}, {info.address.city.name_with_type}</p>
                <p>Điện thoại: {info.phone}</p>
                <div className="actions">
                  <button className="btn btn-confirm mr-2" onClick={onFinish}>
                    Giao đến địa chỉ này
                  </button>
                  <button className="btn btn-cancel" onClick={() => !this.state.show && this.setState({show: true})}>
                    Sửa
                  </button>
                </div>
              </div>
            </div>
          </Fragment>

        ) : (
          <p className="suggest">Bạn chưa cập nhật địa chỉ, vui lòng cập nhật bên dưới:</p>
        )}
        {this.state.show && (
          <div className="address-form">
            {this.state.fetching && (
              <div className="opacity-panel"/>
            )}
            <div className="m-form m-form--state">
              {this.form.enhanceComponent("fullname", ({error, onChange, onEnter, ...others}) => (
                <InputBase
                  className="registration-input pt-0"
                  error={error}
                  id={"fullname"}
                  type={"text"}
                  label={"Tên đầy đủ"}
                  onChange={e => {
                    onChange(e);
                  }}
                  {...others}
                />
              ), true)}
              {this.form.enhanceComponent("phone", ({error, onChange, onEnter, ...others}) => (
                <InputBase
                  className="registration-input pt-0 pb-0"
                  error={error}
                  id={"phone"}
                  type={"text"}
                  onChange={e => {
                    onChange(e);
                  }}
                  label={"Số điện thoại"}
                  {...others}
                />
              ), true)}


              {this.form.enhanceComponent("city", ({error, onChange, value, onEnter, ...others}) => (
                <Select
                  className={"cmt-select"}
                  value={value}
                  getOptionValue={each => each.code}
                  getOptionLabel={each => each.name}
                  onChange={v => {
                    // console.log(v)
                    this.setState({wards: [], fetching: true});
                    this.form.updatePathData("district", null);
                    this.form.updatePathData("ward", null);
                    client.query({
                      query: fetchDistricts,
                      variables: {
                        parent: v.code
                      },
                      fetchPolicy: "no-cache"
                    }).then(({data}) => {
                      this.setState({districts: data.fetchDistricts.map(each => omit(each, "__typename")), fetching: false});
                      onChange(v)
                    });

                  }}
                  options={this.state.cities}
                  placeholder={"Chọn tỉnh/Thành phố"}
                  isClearable={false}
                />
              ), true)}
              {this.form.enhanceComponent("district", ({error, onChange, value, onEnter, ...others}) => (
                <Select
                  className={"cmt-select"}
                  value={value}
                  getOptionValue={each => each.code}
                  getOptionLabel={each => each.name_with_type}
                  onChange={v => {
                    this.setState({fetching: true});
                    this.form.updatePathData("ward", null);
                    client.query({
                      query: fetchWards,
                      variables: {
                        parent: v.code
                      },
                      fetchPolicy: "no-cache"
                    }).then(({data}) => {
                      this.setState({wards: data.fetchWards.map(each => omit(each, "__typename")), fetching: false});
                      onChange(v)
                    });
                  }}
                  options={this.state.districts}
                  placeholder={"Chọn Quận/Huyện"}
                  isClearable={false}
                />
              ), true)}
              {this.form.enhanceComponent("ward", ({error, onChange, onEnter, value, ...others}) => (
                <Select
                  className={"cmt-select"}
                  value={value}
                  getOptionValue={each => each.code}
                  getOptionLabel={each => each.name_with_type}
                  onChange={v => {
                    onChange(v)
                  }}
                  options={this.state.wards}
                  placeholder={"Chọn Phường/Xã"}
                  isClearable={false}
                />
              ), true)}
              {this.form.enhanceComponent("description", ({error, onChange, onEnter, ...others}) => (
                <InputBase
                  className="registration-input pt-0 pb-0"
                  error={error}
                  id={"description"}
                  type={"text"}
                  onChange={e => {
                    onChange(e);
                  }}
                  inputType={"textarea"}
                  label={"Địa chỉ"}
                  {...others}
                />
              ), true)}
              <div className="actions">
                <button className="btn btn-confirm"
                        disabled={!canConfirm || this.state.loading}
                        onClick={() => this.handleConfirm()}
                >
                  Cập nhật
                  {this.state.loading && (
                    <LoadingInline
                      className={"registration-loading"}
                    />
                  )}
                </button>
                {(info.address && info.address.description) && (
                  <button className="ml-3 btn btn-cancel" onClick={() => {
                    // this.form.updateData({...this.initData()})
                    this.setState({show: false})
                  }}>
                    Hủy bỏ
                  </button>
                )}
              </div>


            </div>
          </div>
        )}
      </div>
    );
  }
}