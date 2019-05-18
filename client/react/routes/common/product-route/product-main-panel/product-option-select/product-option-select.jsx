import React from "react";
import classnames from "classnames"
import {QuantityController} from "../../../../../common/quantity-controller/quantity-controller";
import {userInfo} from "../../../../../../common/states/user-info";
import {KComponent} from "../../../../../common/k-component";
import {client} from "../../../../../../graphql";
import {addToFavorites} from "../../../../../../graphql/queries/user";
import {userActionModal} from "../../../../../common/modal/user-actions/user-actions";

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
      adding: false
    };
    this.onUnmount(userInfo.onChange((nextState) => {
      this.forceUpdate();
    }));
  };

  addToFavorites = (info) => {
    return client.mutate({
      mutation: addToFavorites,
      variables: {
        pID: this.props.productID,
        uID: info._id
      }
    }).then(({data}) => {
      return userInfo.setState({...info, favorites: [...data.addToFavorites.favorites]});
    }).catch(err => {
      console.log(err);
      return;
    });


  };

  ensureLogin = () => {
    let info = userInfo.getState();
    if(info){
      this.setState({adding: true});
      return this.addToFavorites(info).then(() => this.setState({adding: false}));

    }
    userActionModal.open().then(isLogin => {
      if(isLogin){
        let newInfo = userInfo.getState();
        this.setState({adding: true});
        return this.addToFavorites(newInfo).then(() => this.setState({adding: false}));
      }
    })
  };

  render() {
    let {qty, adding} = this.state;
    let info = userInfo.getState();
    console.log(info)
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
          <button className="btn add-to-cart"
                  onClick={() => null}
          >
            <i className="fas fa-shopping-cart"></i> Chọn mua
          </button>



          {(info && info.favorites.includes(this.props.productID)) ? (
            <i className={classnames("fas fa-heart add-to-fav", {onAdding: adding})} onClick={this.ensureLogin}></i>
          ) : (
            <i className={classnames("far fa-heart add-to-fav", {onAdding: adding})} onClick={this.ensureLogin}></i>
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
          productID={this.props.productID}
        />
      </div>
    );
  }
}