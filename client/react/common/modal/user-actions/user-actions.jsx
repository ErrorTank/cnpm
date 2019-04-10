import React, {Fragment} from "react";
import {FormTabs} from "../../form-tabs/form-tabs";
import {Login} from "./login/login";
import {Register} from "./register/register";
import {modals} from "../modals";

export class UserActionsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.tabs[0]
        };
    };

    tabs = [
        {
            leftTitle: "Đăng nhập",
            des: "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.",
            label: "Đăng nhập",
            render: () => <Login onLoginSuccess={() => this.props.onClose()}/>
        }, {
            leftTitle: "Tạo tài khoản",
            des: "Tạo tài khoản để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.",
            label: "Tạo tài khoản",
            render: () => <Register/>
        }
    ];

    render() {
        let {currentTab} = this.state;
        console.log(currentTab);
        return (
            <div className="user-actions-modal">
                <div className="left-side side">
                    <Fragment>
                        <p className="left-title">{currentTab.leftTitle}</p>
                        <p className="left-description">{currentTab.des}</p>
                    </Fragment>
                </div>
                <FormTabs
                    className={"right-side side"}
                    tabs={this.tabs}
                    activeTab={currentTab}
                    onChangeTab={(t) => this.setState({currentTab: t})}
                />
            </div>
        );
    }
}


export const userActionModal = {
    open() {
        const modal = modals.openModal({
            content: (
                <UserActionsModal
                    onClose={() => modal.close()}
                />
            )
        });
        return modal.result;
    }
};