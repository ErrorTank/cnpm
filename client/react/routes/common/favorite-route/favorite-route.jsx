import React, { Component } from "react";
import { PageTitle } from "../../../common/page-title/page-title";
import { AuthenLayout } from "../../../layout/authen-layout/authen-layout";
import { Breadcrumb } from "../../../common/breadcrumb/breadcrumb";
import FavoriteList from "./favorite-list/favorite-list";

export default class FavoriteRoute extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <PageTitle
                title={"Sản phẩm ưu thích"}
            >
                <AuthenLayout
                    showCategories={true}
                >
                    <Breadcrumb
                        items={[{ name: "Sản phẩm yêu thích", _id: "tha123", onClick: () => null }]}
                    >
                    <div className="container content-container">
                        <FavoriteList/>
                    </div>


                    </Breadcrumb>
                </AuthenLayout>
            </PageTitle>
        );
    }
}
