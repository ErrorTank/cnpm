import React, { Component } from "react";
// import { PageTitle } from "../../common/page-title/page-title";
// import { AuthenLayout } from "../../../layout/authen-layout/authen-layout";
import {PageTitle} from "../../../common/page-title/page-title"
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout"

export default class AccountRoute extends Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        return(
            <PageTitle
                title={"Tài khoản của tôi"}
            >
                <AuthenLayout
                    showCategories={true}
                >
                    <div className="container content-container">
                    </div>

                </AuthenLayout>
            </PageTitle>
        );
    }
}