import React from 'react'
import { createUserCartCacheFunction } from "../../../../../common/cache/cart-cache";
import { userCart, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';

class CheckoutCart extends KComponent {
    constructor(props) {
        super(props);
        this.onUnmount(userInfo.onChange((newState, oldState) => {
            if (!newState || !oldState) {
                this.forceUpdate();
            }
                
        }))
    };
    render(){
        let info = userInfo.getState();
        let cartCount = info ? userCart.getState().length : createUserCartCacheFunction("get")({ async: false }).length;
        let cartList = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });
    
        let checkOut = cartCount !== 0 ? (
            <div className="container checkout ">
                
            </div>
        ) : (
            <div className="row">
                <div className="col-xl-12">
                    <h5 className="cart-counting">Giỏ hàng <span>({cartCount} sản phấm)</span></h5>
                    <div className="container empty-cart ">
                            <span className="cart-icon"></span>
                            <p>Không có sản phẩm nào trong giỏ hàng của bạn!</p>
                            <button className="btn yellow-btn" type="button" onClick={() => customHistory.push("/recent-visited")}>Tiếp tục mua sắm</button>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="container">
                {checkOut}
            </div>
        );
    }
}

export default CheckoutCart;
