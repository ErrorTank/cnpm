import React from 'react'
import { createUserCartCacheFunction } from "../../../../../common/cache/cart-cache";
import { userCart, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import {client} from "../../../../../graphql";
import {getCartItemByIdList} from "../../../../../graphql/queries/user";
import { QuantityController } from "../../../../common/quantity-controller/quantity-controller";
import { customHistory } from "../../../routes";
import { formatMoney } from "../../../../../common/products-utils";

class CheckoutCart extends KComponent {
    constructor(props) {
        super(props);
        this.onUnmount(userInfo.onChange((newState, oldState) => {
            if (!newState || !oldState) {
                this.forceUpdate();
            }

        }))
        this.fetchItemList();
       // this.createCartWithQuantity();
        this.state = {
            cartItemList: []
        }
        //Call api only list not empty
    };

    fetchItemList = () => {
        return new Promise((resolve, reject) => {
            let info = userInfo.getState();
            
            client.query({
                query: getCartItemByIdList,
                variables: {
                    list: info ? userCart.getState(): createUserCartCacheFunction("get")({ async: false })
                },
                fetchPolicy: "no-cache"
            }).then(({ data }) => {
                    this.setState({ cartItemList: [...data.getCartItemByIdList], loading: false }, () => {
                        resolve();
                        console.log(data);  // just to see the item form
                    });
            }).catch(err => reject());
            
        });
        
    };
    // createCartWithQuantity = () => {
    //     cartItemList.map(item => {
    //         let quantity = rawCart.find(temp => {
    //             if (temp.option === item.provider[0].options[0]._id)
    //                 return temp.quantity;
    //         })
    //             this.setState({
    //                 cartItemList: [...cartItemList, quantity]
    //             })
    //         }))
    //         console.log(cartItemList)
    // }

    handleDelete = (id) => {
        let newCartList = this.state.cartItemList.filter(item => {
            return item.product.provider[0].options[0]._id !== id;
       })
       this.setState({
           cartItemList: item
       })
    }
    // handleQtyChange = (newQty, option) => {
    //     // Set qty moi vao du lieu cua dung san pham dang thay doi
    //     // userCart.setState();
    //     //
    //     let {_id: optionID} = option;
    //     if(info){
    //         let cart = userCart.getState()
    //         newcart = cart.map((item) => {
    //             if (item.option === optionID) {
    //                 return { ...item, qty: newQty }
    //             }
    //             return item;
    //         })
    //         userCart.setState(newcart);
    //     } else{
    //         createUserCartCacheFunction("set")({...option, qty: newQty});
    //     }
    // };


    render(){
        let info = userInfo.getState();
        let cartCount = info ? userCart.getState().length : createUserCartCacheFunction("get")({ async: false }).length;
        let rawCart = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });
        let { cartItemList, loading} = this.state;
        let { quantity, option } = rawCart;
        let qty = quantity;
       

        let checkOut = cartCount !== 0 ? (
            <div className="checkout ">
                <div className="row">
                    <div className="col-12">
                        <h5 className="cart-counting">Giỏ hàng <span>({cartCount} sản phấm)</span></h5>
                        <div className="row">
                            <div className="col-8 cart-1">
                                <form id="shopping-cart">
                                    {
                                        cartItemList.map(item => {
                                            let { product } = item;
                                            let {_id,provider } = product;
                                            let {options,owner} = provider[0];
                                            let discountedPrice = (options[0].price / 100) * (100 - product.regularDiscount);
                                            
                                            return (
                                                <div className="row shopping-cart-item" key={_id}>
                                                    <div className="col-3 img-item-thumnail">
                                                        <img src={options[0].picture[0]} alt="item-logo"/>
                                                    </div>
                                                    <div className="col-9 product-full-info">
                                                        <div className="row">
                                                            <div className="col-7 product-info">
                                                                <p className="name"><span onClick={() => customHistory.push("/product/" + product._id)}>{product.name} ({options[0].description })</span></p>
                                                                <p className="seller-by">Cung cấp bởi <span onClick={() => customHistory.push("/shop/" + product._id)}>{owner.provider.name}</span></p>      {/* seller-by who, did't found yet  */}                                                               
                                                                <p className="action">
                                                                    <a href="" onClick={() => {this.handleDelete(options[0]._id)}}>Xóa</a>
                                                                </p>
                                                            </div>
                                                            <div className="col-4 box-price">
                                                                <div className="price-1">{formatMoney(discountedPrice)}₫</div>
                                                                <div className="price-2">
                                                                    <span className="full-price">{formatMoney(options[0].price)}₫ x</span>
                                                                    <span className="sale">| -{product.regularDiscount}%</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-1 quantity">
                                                            <QuantityController
                                                                value={qty}
                                                                onChange={(qty) => this.handleQtyChange(qty, option)}
                                                                label={"Số lượng:"}
                                                            />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        )
                                    }
                                </form>
                            </div>
                            <div className="col-3 cart-2">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="row">
                <div className="col-xl-12">
                    <h5 className="cart-counting">Giỏ hàng <span>({cartCount} sản phấm)</span></h5>
                    <div className="container empty-cart ">
                            <span className="cart-icon"></span>
                            <p>Không có sản phẩm nào trong giỏ hàng của bạn!</p>
                            <button className="btn yellow-btn" type="button" onClick={() => customHistory.push("/")}>Tiếp tục mua sắm</button>
                    </div>
                </div>
            </div>
        );
        return(
            <div>
                {checkOut}
            </div>
        );
    }
}

export default CheckoutCart;
