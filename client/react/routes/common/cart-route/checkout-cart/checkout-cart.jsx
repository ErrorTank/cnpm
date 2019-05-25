import React, {Component} from 'react'
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
            <div className="container checkout">
                <p>cart</p>
                <p><Tinh tien/></p>
            </div>
        ) : (
            <div className="container empty-cart ">
                    <img src="./assets/img/shopping-cart.png" alt=""/>
            </div>
        );
        return(
            <div className="container">
                <div>{checkOut}</div>
            </div>
        );
    }
}

export default CheckoutCart;
