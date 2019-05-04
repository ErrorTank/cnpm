import React from "react";
import {KComponent} from "../../common/k-component";
import {userInfo} from "../../../common/states/user-info";
import {Navbar} from "./nav-bar/nav-bar";


export class AuthenLayout extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUnmount(userInfo.onChange((newState, oldState) => {
      if(!newState || !oldState){
        return;
      }
      if(oldState.role !== newState.role)
        this.forceUpdate();
    }))
  };

  render() {

    return (
      <div className="authen-layout">
        <Navbar
          {...this.props}
        />b
        <div className="authen-body">
          {this.props.children}
        </div>
        <div className="authen-footer">
          <p>© 2016 - Bản quyền của Công Ty Cổ Phần Ta Ka - Taka.vn</p>
          <p>Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010</p>
        </div>
      </div>
    );
  }
}
