import React from 'react'
import { createUserCartCacheFunction } from "../../../../../common/cache/cart-cache";
import { userCart, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import { client } from "../../../../../graphql";
import { getCartItemByIdList, addToCart } from "../../../../../graphql/queries/user";
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
        this.state = {
            cartItemList: [],
            totalPrice: 0,
            cartCount: 0
        }
        this.fetchItemList();

        //Call api only list not empty
    };

    fetchItemList = () => {
        return new Promise((resolve, reject) => {
            let info = userInfo.getState();
            let rawCart = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });
            let calculatePrice = 0;
            let cartCounting = 0;
            //console.log(rawCart);
            client.query({
                query: getCartItemByIdList,
                variables: {
                    list: rawCart
                },
                fetchPolicy: "no-cache"
            }).then(({ data }) => {
                // console.log(this.state.cartItemList);
                let cartItemList = [...data.getCartItemByIdList];
                //console.log('keke', cartItemList);
                let cartWithQuantity = cartItemList.map(e => {
                    let founded = rawCart.find(prod => {
                        if (prod.option === e.product.provider[0].options[0]._id.toString()) {
                            return true;
                        }
                    })
                    // console.log(founded.quantity);
                    calculatePrice += ((e.product.provider[0].options[0].price / 100) * (100 - e.product.regularDiscount)) * founded.quantity;
                    cartCounting += founded.quantity;
                    e = { ...e, quantity: founded.quantity };
                    return e;
                });
                console.log(cartWithQuantity);
                //console.log(cartCounting);
                this.setState({ cartItemList: cartWithQuantity, totalPrice: calculatePrice, cartCount: cartCounting, loading: false }, () => {
                    resolve();
                });
            }).catch(err => {
                // console.log(err);
                reject();
            });

        });

    };

    handleDelete = (id) => {
        let info = userInfo.getState();
        if (info) {
                return client.mutate({
                    mutation: addToCart,
                    variables: {
                        pID: productID,
                        uID: info._id,
                        finalQty,
                        option: optionID
                    }
                }).then(({ data }) => {
                
                });
            } else {
            createUserCartCacheFunction("set")({
                product: productID,
                quantity: finalQty,
                option: optionID
            }).then(() => {
               
            });
        }
        let newCartList = this.state.cartItemList.filter(item => {
            return item.product.provider[0].options[0]._id !== id;
        })
        this.setState({
            cartItemList: item
        })
    }


    handleQtyChange = (newQty, product, qty) => {
        // Set qty moi vao du lieu cua dung san pham dang thay doi
        // userCart.setState();
        let { _id: productID } = product;
        let provider = product.provider;
        let finalQty = newQty - qty;
        let info = userInfo.getState();
        let { _id: optionID } = provider[0].options[0];
        console.log(provider[0].options[0]);
        if (info) {
            return client.mutate({
                mutation: addToCart,
                variables: {
                    pID: productID,
                    uID: info._id,
                    qty: finalQty,
                    option: optionID
                }
            }).then(({ data }) => {
                userCart.setState(data.addToCart.carts).then(() => {
                    let CartItemList = this.state.cartItemList;
                    let newCartCount = this.state.cartCount;
                    let newPrice = this.state.totalPrice;
                    CartItemList.map(p => {
                        if (p.product.provider[0].options[0]._id === optionID) {
                            p.quantity += finalQty;
                            newCartCount += finalQty;
                            newPrice += ((p.product.provider[0].options[0].price / 100) * (100 - p.product.regularDiscount)) * finalQty;
                        }
                        return p;
                    })
                    console.log(CartItemList)
                    this.setState({ cartItemList: CartItemList, cartCount: newCartCount, totalPrice: newPrice });
                });
            });
        } else {
            createUserCartCacheFunction("set")({
                product: productID,
                quantity: finalQty,
                option: optionID
            }).then(() => {
                let CartItemList = this.state.cartItemList;
                let newCartCount = this.state.cartCount;
                let newPrice = this.state.totalPrice;
                CartItemList.map(p => {
                    if (p.product.provider[0].options[0]._id === optionID) {
                        p.quantity += finalQty;
                        newCartCount += finalQty;
                        newPrice += ((p.product.provider[0].options[0].price / 100) * (100 - p.product.regularDiscount)) * finalQty;
                    }
                    return p;
                })
                console.log(CartItemList)
                this.setState({ cartItemList: CartItemList, cartCount: newCartCount, totalPrice: newPrice });
            });
        }
    };

    handleSendBill = () =>{
        console.log();
    }

    render() {
        let info = userInfo.getState();
        let { cartItemList, loading, totalPrice, cartCount } = this.state;
        //let rawCart = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });


        let checkOut = cartCount !== 0 ? (
            <div className="checkout ">
                <div className="row">
                    <div className="col-12">
                        <h5 className="cart-counting">Giỏ hàng <span>({cartCount} sản phấm)</span></h5>
                        <div className="cart-1">
                            <form id="shopping-cart">
                                {
                                    cartItemList.map(item => {
                                        let { product, quantity } = item;
                                        let { _id, provider } = product;
                                        let { options, owner } = provider[0];
                                        let discountedPrice = (options[0].price / 100) * (100 - product.regularDiscount);

                                        return (
                                            <div className="row shopping-cart-item" key={options[0]._id}>
                                                <div className="col-3 img-item-thumnail">
                                                    <img src={options[0].picture[0]} alt="item-logo" />
                                                </div>
                                                <div className="col-9 product-full-info pr-0" >
                                                    <div className="row">
                                                        <div className="col-7 product-info">
                                                            <p className="name"><span onClick={() => customHistory.push("/product/" + product._id)}>{product.name} ({options[0].description})</span></p>
                                                            <p className="seller-by">Cung cấp bởi <span className="span-button" onClick={() => customHistory.push("/shop/" + product._id)}>{owner.provider.name}</span></p>      {/* seller-by who, did't found yet  */}
                                                            <p className="action">
                                                                <span className="span-button" onClick={() => { this.handleDelete(options[0]._id) }}>Xóa</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-3 box-price">
                                                            <div className="price-1">{formatMoney(discountedPrice)}₫</div>
                                                            <div className="price-2">
                                                                <span className="full-price">{formatMoney(options[0].price)}₫</span>
                                                                <span className="sale">| -{product.regularDiscount}%</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 quantity text-right">
                                                            <QuantityController
                                                                value={quantity}
                                                                onChange={(qty) => this.handleQtyChange(qty, product, quantity)}
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
                        <div className="cart-2">
                            <div className="show-price">
                                <span>Tạm tính:</span>
                                <div className="price">{formatMoney(totalPrice)}₫</div>
                            </div>
                            <div className="total-price">
                                <span>Thành Tiền:</span>
                                <div className="amount">
                                    <div className="VAT-price">{formatMoney(totalPrice)}₫</div>
                                    <p className="VAT">(Đã bao gồm VAT)</p>
                                </div>
                            </div>
                            <button className="btn btn-danger checkout" type="button" onClick={() => this.handleSendBill()}>Tiến hành đặt hàng</button>
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
        return (
            <div>
                {checkOut}
            </div>
        );
    }
}

export default CheckoutCart;
