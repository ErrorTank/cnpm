import React, { Component } from "react";
import { PageTitle } from "../../../common/page-title/page-title";
import { AuthenLayout } from "../../../layout/authen-layout/authen-layout";
import Menu from "./menu/menu";

export default class FavoriteRoute extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <PageTitle
                title={"Giỏ Hàng"}
            >
                <AuthenLayout
                    showCategories={true}
                >

                    <div className="container content-container">
                        {/*<Menu/>*/}
                    </div>



                </AuthenLayout>
            </PageTitle>
        );
    }
}
