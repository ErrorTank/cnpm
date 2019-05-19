import React from "react";
import classnames from "classnames"
import {QuantityController} from "../../../../../common/quantity-controller/quantity-controller";
import {userCart, userFavorites, userInfo} from "../../../../../../common/states/common";
import {KComponent} from "../../../../../common/k-component";
import {client} from "../../../../../../graphql";
import {addToCart, addToFavorites} from "../../../../../../graphql/queries/user";
import {userActionModal} from "../../../../../common/modal/user-actions/user-actions";
import {createUserCartCacheFunction} from "../../../../../../common/cache/cart-cache";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {cartChangePopup} from "../../../../../layout/authen-layout/nav-bar/cart/cart-btn/cart-change-popup";
import {customHistory} from "../../../../routes";

const POption = ({content, onClick, active}) => {
  return (
    <div className={classnames("p-option", {active})}
         onClick={onClick}
    >
      {content}
    </div>)
};

const OptionSelect = ({onChange, options, current}) => {
  return (
    <div className="option-select">
      <div className="ins">
        Chọn phiên bản: <span className="p-des">{current.description}</span>
      </div>
      <div className="option-list">
        {options.map((each, i) => (
          <POption
            key={i}
            active={each._id === current._id}
            content={each.description}
            onClick={() => onChange({...each})}
          />
        ))}
      </div>
    </div>
  );
};

class BuyerAction extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      adding: false,
      pushing: false
    };
    this.onUnmount(userFavorites.onChange((nextState) => {
      this.forceUpdate();
    }));
    this.onUnmount(userCart.onChange((nextState) => {
      this.forceUpdate();
    }));
  };

  addToFavorites = (info) => {
    return client.mutate({
      mutation: addToFavorites,
      variables: {
        pID: this.props.commonInfo._id,
        uID: info._id
      }
    }).then(({data}) => {
      return userFavorites.setState([...data.addToFavorites.favorites]);
    }).catch(err => {
      console.log(err);
      return;
    });


  };

  ensureLoginForAddToFav = () => {
    let info = userInfo.getState();
    if (info) {
      this.setState({adding: true});
      return this.addToFavorites(info).then(() => this.setState({adding: false}));

    }
    userActionModal.open().then(isLogin => {
      if (isLogin) {
        let newInfo = userInfo.getState();
        this.setState({adding: true});
        return this.addToFavorites(newInfo).then(() => this.setState({adding: false}));
      }
    })
  };

  addToCart = () => {
    let {qty} = this.state;
    let {commonInfo, current} = this.props;
    let {_id: productID, name} = commonInfo;
    let {_id: optionID, description} = current;
    let publishInfo = () => {
      cartChangePopup.publish({
        "cartCount": (
          <span className="cart-notify">
            Sản phẩm <span className="product-name">{name} - {description}</span> vừa được thêm vào <span
            className="to-cart" onClick={() => customHistory.push("/cart")}>Giỏ hàng</span>
          </span>
        )
      });
    };
    let info = userInfo.getState();
    if (info) {
      this.setState({pushing: true});
      return client.mutate({
        mutation: addToCart,
        variables: {
          pID: productID,
          uID: info._id,
          qty,
          option: optionID
        }
      }).then(({data}) => {
        userCart.setState(data.addToCart.carts).then(() => {
          this.setState({pushing: false})
          publishInfo()
        });
      });


    }
    createUserCartCacheFunction("set")({
      product: productID,
      quantity: qty,
      option: optionID
    }).then(() => {
      this.setState({pushing: false});
      publishInfo()
    });
  };

  render() {
    let {qty, adding, pushing} = this.state;
    let favs = userFavorites.getState();

    return (
      <div className="buyer-actions">
        <div className="left-action">
          <QuantityController
            value={qty}
            onChange={qty => this.setState({qty})}
            label={"Số lượng:"}
          />
        </div>
        <div className="right-action">
          <button className={classnames("btn add-to-cart", {onPushing: pushing})}
                  onClick={this.addToCart}
          >
            <i className="fas fa-shopping-cart"></i> Chọn mua
            {pushing && (
              <LoadingInline/>
            )}
          </button>


          {(favs.length && favs.includes(this.props.commonInfo._id)) ? (
            <i className={classnames("fas fa-heart add-to-fav", {onAdding: adding})}
               onClick={this.ensureLoginForAddToFav}></i>
          ) : (
            <i className={classnames("far fa-heart add-to-fav", {onAdding: adding})}
               onClick={this.ensureLoginForAddToFav}></i>
          )}

        </div>
      </div>
    )
  }
}

export class ProductOptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="product-option-select">
        <OptionSelect
          {...this.props}
        />
        <BuyerAction
          commonInfo={this.props.commonInfo}
          current={this.props.current}
        />
      </div>
    );
  }
}