import React, { Component } from "react";
import { PageTitle } from "../../../common/page-title/page-title";
import { AuthenLayout } from "../../../layout/authen-layout/authen-layout";
import CheckoutCart from "./checkout-cart/checkout-cart"

class CartRoute extends Component {
    render() {
        return (
            <PageTitle
                title={"Giỏ Hàng"}
            >
                <AuthenLayout
                    showCategories={true}
                >
                   
                    <div className="container content-container">
                        <CheckoutCart />
                    </div>
                    {/* <div className="container content-container">
                        <TotalPayment/>
                    </div> */}



                </AuthenLayout>
            </PageTitle>
        );
    }
}

export default CartRoute;