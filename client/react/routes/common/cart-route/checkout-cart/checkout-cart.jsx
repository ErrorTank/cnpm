import React from 'react'
import { createUserCartCacheFunction } from "../../../../../common/cache/cart-cache";
import {userCart, userInfo, userCheckoutItemInfo} from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import { client } from "../../../../../graphql";
import { getCartItemByIdList, addToCart,removeFromCart } from "../../../../../graphql/queries/user";
import { QuantityController } from "../../../../common/quantity-controller/quantity-controller";
import { customHistory } from "../../../routes";
import { formatMoney } from "../../../../../common/products-utils";
import Alert from "../../../../common/alert/alert";
import { cartErrors } from "./cart-errors";
import { VoucherInput } from "./voucher-input";
import { Badge } from "../../../../common/badge/badge";
import { LoadingInline } from "../../../../common/loading-inline/loading-inline";
import {appStoreController, clearAppStores} from "../../../../../common/system/system";
import omit from "lodash/omit"
import {ResetComponent} from "../../with-reset/with-reset";

class CheckoutCart extends KComponent {
  constructor(props) {
    super(props);
    this.onUnmount(appStoreController.onChange(() => {
      this.setState({ ...this.defaultState }, () => this.fetchItemList());
    }));

    this.defaultState = {
      cartItemList: [],
      totalPrice: 0,
      cartCount: 0,
      errors: [],
      vouchers: [],

    }


    this.state = {
      ...this.defaultState,
      checkout: false
    }
    this.fetchItemList();

    //Call api only list not empty
  };

  getOutStockError = () => {
    let { cartItemList } = this.state;
    let outStockItems = cartItemList.filter(each => each.product.provider[0].options[0].sold >= each.product.provider[0].options[0].total);
    return outStockItems.map(each => {
      return {
        type: "outStock",
        data: {
          name: each.product.name,
          option: each.product.provider[0].options[0].description
        }
      }
    })
  };

  getExceedError = () => {
    let { cartItemList } = this.state;
    let exceedItems = cartItemList.filter(each => each.product.provider[0].options[0].total > each.product.provider[0].options[0].sold && each.quantity > (each.product.provider[0].options[0].total - each.product.provider[0].options[0].sold));
    return exceedItems.map(each => {
      return {
        type: "qtyExceed",
        data: {
          name: each.product.name,
          option: each.product.provider[0].options[0].description,
          stock: each.product.provider[0].options[0].total - each.product.provider[0].options[0].sold,
          current: each.quantity
        }
      }
    })
  };

  updateError = () => {
    let errors = [];
    errors = errors.concat(this.getOutStockError());
    errors = errors.concat(this.getExceedError());
    this.setState({ errors })
  };


  fetchItemList = () => {
    return new Promise((resolve, reject) => {
      let info = userInfo.getState();
      let rawCart = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });
      let calculatePrice = 0;
      let cartCounting = 0;
      console.log(info)
      console.log(rawCart);
      client.query({
        query: getCartItemByIdList,
        variables: {
          list: rawCart
        },
        fetchPolicy: "no-cache"
      }).then(({ data }) => {
        // console.log(this.state.cartItemList);
        let cartItemList = [...data.getCartItemByIdList];

        let cartWithQuantity = cartItemList.map(e => {
          let founded = rawCart.find(prod => {
            if (prod.option === e.product.provider[0].options[0]._id.toString()) {
              return true;
            }
          })
          // console.log(founded.quantity);
          e = { ...e, quantity: founded.quantity };
          return e;
        });
        console.log(cartWithQuantity);
        this.setState({
          cartItemList: cartWithQuantity,
          loading: false,
          vouchers: userCheckoutItemInfo.getState() ? userCheckoutItemInfo.getState().vouchers : []
        }, () => {
          this.updateError();
          resolve();
        });
      }).catch(err => {
        // console.log(err);
        reject();
      });

    });

  };

  handleDelete = (optionID) => {
    let info = userInfo.getState();
    if (info) {
      return client.mutate({
        mutation: removeFromCart,
        variables: {
          uID: info._id,
          option: optionID
        }
      }).then(({ data }) => {
        userCart.setState(data.removeFromCart.carts.map(each => omit(each, ["__typename"]))).then(() => {
         // console.log('no',data.removeFromCart.carts);
          let newCartList = this.state.cartItemList.filter(item => {
            return item.product.provider[0].options[0]._id !== optionID;
          })
          //console.log(newCartList);
          this.setState({
            cartItemList: newCartList
          },() => { this.updateError() });
        });
      });
    } else {
      createUserCartCacheFunction("deleteItem")((item)=>{
        return item.option !== optionID;
      }).then(() => {
        let newCartList = this.state.cartItemList.filter(item => {
          return item.product.provider[0].options[0]._id !== optionID;
        },() => {this.updateError()})
        //console.log(newCartList);
        this.setState({
          cartItemList: newCartList
        });
      });
     // console.log('ok');
    }
  }


  handleQtyChange = (newQty, product, qty) => {
    // Set qty moi vao du lieu cua dung san pham dang thay doi
    let { _id: productID } = product;
    let provider = product.provider;
    let finalQty = newQty - qty;
    let info = userInfo.getState();
    let { _id: optionID } = provider[0].options[0];
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
        userCart.setState(data.addToCart.carts.map(each => omit(each, ["__typename"]))).then(() => {
          let CartItemList = this.state.cartItemList;
          CartItemList.forEach(p => {
            if (p.product.provider[0].options[0]._id === optionID) {
              p.quantity += finalQty;
            }
            return p;
          })
          this.setState({ cartItemList: CartItemList}, () => {
            this.setState({ errors: this.state.errors.filter(each => each.type !== "qtyExceed").concat(this.getExceedError()) })
          });
        });
      });
    } else {
      createUserCartCacheFunction("set")({
        product: productID,
        quantity: finalQty,
        option: optionID
      }).then(() => {
        let CartItemList = this.state.cartItemList;
        CartItemList.map(p => {
          if (p.product.provider[0].options[0]._id === optionID) {
            p.quantity += finalQty;
          }
          return p;
        })
        this.setState({ cartItemList: CartItemList}, () => {
          this.setState({ errors: this.state.errors.filter(each => each.type !== "qtyExceed").concat(this.getExceedError()) })
        });
      });
    }
  };

  handleSendBill = () => {
    this.setState({checkout: true});
    userCheckoutItemInfo.setState({vouchers: this.state.vouchers, items: this.state.cartItemList}).then(() => {
      customHistory.push("/checkout");
    });
  };

  handleApplyVoucher = (voucher) => {

    let { cartItemList, errors, vouchers } = this.state;
    let allVouchers = cartItemList.reduce((result, each) => {
      return [...result, ...each.product.provider.filter(pro => pro.discountWithCode).map(pro => pro.discountWithCode)]
    }, []);
    let voucherObj = allVouchers.find(each => each.code === voucher);

    if (!voucherObj) {
      this.setState({
        errors: errors.filter(each => each.type !== "voucherError").concat({
          type: "voucherError", data: {
            code: voucher
          }
        })
      })
    } else {
      if (!vouchers.find(each => each._id === voucherObj._id)) {
        this.setState({ vouchers: vouchers.concat(voucherObj), errors: errors.filter(each => each.type !== "voucherError") },() =>{
          // let voucherNow = this.state.vouchers;
          // console.log(voucherNow)
        })
      }
    }

  };

  render() {
    let info = userInfo.getState();
    let { cartItemList, loading, vouchers} = this.state;
    let vDiscount = cartItemList.filter(each => each.product.provider[0].discountWithCode).map(each => each.product.provider[0].discountWithCode.code);
    console.log(vDiscount);
    let totalPrice, cartCount, finalPrice;
    totalPrice = cartItemList.reduce((total, cur) => total + (cur.product.provider[0].options[0].price * cur.quantity * (cur.product.regularDiscount ? (1 - cur.product.regularDiscount / 100) : 1)), 0);
    let allDiscount = cartItemList.reduce((total, cur) => total + ((cur.product.provider[0].discountWithCode && vouchers.find(each => each._id === cur.product.provider[0].discountWithCode._id)) ? (cur.product.provider[0].discountWithCode.value / 100) * (cur.product.provider[0].options[0].price * cur.quantity * (cur.product.regularDiscount ? (1 - cur.product.regularDiscount / 100) : 1)) : 0), 0);
    finalPrice = totalPrice - allDiscount;
    cartCount = cartItemList.reduce((total, cur) => total + cur.quantity,0);
    //console.log('asdasd',totalPrice, finalPrice, cartCount);
    //let rawCart = info ? userCart.getState() : createUserCartCacheFunction("get")({ async: false });

    let isDisabled = this.state.errors.find(each => each.type !== "voucherError");
    console.log(this.state.errors)
    let checkOut = cartCount !== 0 ? (
      <div className="checkout m-alert">
        <div className="mt-5" style={{ fontSize: "13px" }}>
          {this.state.errors.map((each, i) => {
            let { type, data } = each;
            return (
              <Alert
                className={"m-alert--outline"}
                key={i}
                type={"danger"}
                content={cartErrors[type].render(data)}
              />
            )
          })}
        </div>

        <div className="row">
          <div className="col-12 p-0">
            <h5 className="cart-counting">Giỏ hàng <span>({cartCount} sản phấm)</span></h5>
            <div className="cart-1">
              <form id="shopping-cart">
                {
                  cartItemList.map(item => {
                    let { product, quantity } = item;
                    let { provider } = product;
                    let { options, owner } = provider[0];
                    let discountedPrice = (options[0].price / 100) * (100 - product.regularDiscount);

                    return (
                      <div className="row shopping-cart-item" key={options[0]._id}>
                        <div className="col-3 img-item-thumnail">
                          <img src={options[0].picture[0]} alt="item-logo" />
                        </div>
                        <div className="col-9 product-full-info pr-0">
                          <div className="row">
                            <div className="col-7 product-info">
                              <p className="name"><span
                                onClick={() => customHistory.push("/product/" + product._id)}>{product.name} ({options[0].description})</span>
                              </p>
                              <p className="seller-by">Cung cấp bởi <span className="span-button"
                                onClick={() => customHistory.push(`/products?type=provider&provider=${owner._id}`)}>{owner.provider.name}</span>
                              </p>
                              <p className="action">
                                <span className="span-button" onClick={() => {
                                  this.handleDelete(options[0]._id)
                                }}>Xóa</span>
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
            <div className="separate">

            </div>
            <div className="cart-2">
              <div className="show-price">
                <span>Tạm tính:</span>
                <div className="price">{formatMoney(totalPrice)}₫</div>
              </div>
              <div className="total-price">
                <span>Thành Tiền:</span>
                <div className="amount">
                  <div className="VAT-price">{formatMoney(finalPrice)}₫</div>
                  <p className="VAT">(Đã bao gồm VAT + vourchers)</p>
                </div>
              </div>
              <button className={`btn btn-danger checkout ${isDisabled ? `no-pointer-event disabled` : ""}`}
                type="button" disabled={isDisabled} onClick={() => this.handleSendBill()}>
                {this.state.checkout && <LoadingInline/>}
                Tiến hành đặt hàng
              </button>
              <div className="add-voucher">
                <div className="av-head">
                  Mã giảm giá / Quà tặng
                </div>
                <div className="av-body">
                  <VoucherInput
                    onChange={this.handleApplyVoucher}
                  />
                  <div className="vouchers">
                    {this.state.vouchers.map(each => {
                      return (
                        <Badge className={"voucher-badge"} content={(
                          <span>{each.code} <i className="fas fa-times-circle" onClick={() => this.setState({ vouchers: this.state.vouchers.filter(v => v._id !== each._id) })}></i></span>
                        )} key={each._id} />
                      )
                    })}
                  </div>

                </div>

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
              <button className={`btn yellow-btn `} type="button" onClick={() => customHistory.push("/")}>Tiếp tục mua
                sắm
            </button>
            </div>
          </div>
        </div>
      );
    return (
      <ResetComponent
        render={() => (
          <div>
            {checkOut}
          </div>
        )}
      />

    );
  }
}

export default CheckoutCart;
