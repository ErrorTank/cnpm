import React from 'react'
import { userFavorites, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import { formatMoney } from "../../../../../common/products-utils";
import { client } from "../../../../../graphql";
import { getFavItemsByIdList } from "../../../../../graphql/queries/user";

class FavoriteList extends KComponent{
    constructor(props) {
    super(props);
    
    this.onUnmount(userFavorites.onChange(() => {
        this.forceUpdate();
    }));
    this.state = {
        favoriteItemList:[]
    }
    this.fetchItemList();
    // Call api only list not empty
  };

  fetchItemList = () => {
      return new Promise((resolve, reject) => {
          let rawCart = userFavorites.getState();
          client.query({
              query: getFavItemsByIdList,
              variables: {
                  list: rawCart
              },
              fetchPolicy: "no-cache"
          }).then(({ data }) => {
              let favoriteItemList = [...data.getFavItemsByIdList];
              console.log(favoriteItemList);
              this.setState({
                  favoriteItemList: favoriteItemList,
                  loading: false
              });
          }).catch(err => {
              // console.log(err);
              reject();
          });

      });

  }

  render(){
      let rawCart = userFavorites.getState();
      let { favoriteItemList } = this.state;
      return(
          <div className="wrap">
            <div className="list-count">
                Danh sách yêu thích ({rawCart.length})
            </div>
            <div className="account-wishlist">
                {
                    favoriteItemList.map(each => {
                        let {info, meanstar} = each;
                        let {regularDiscount, name, provider } = info;
                        let {options} = provider[0];
                        let discountedPrice = (options[0].price / 100) * (100 - regularDiscount);
                        return (
                            <div className="wishlist-item">
                                <div className="item-col-1">
                                    <div className="wishlist-icon">
                                        <img src={options[0].picture} alt="wishlist-logo"/>
                                    </div>
                                </div>
                                <div className="item-col-2">
                                    <p className="title">{name}</p>
                                    <p className="rating">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </p>
                                </div>
                                <div className="item-col-3">
                                    <div className="price-1">{formatMoney(discountedPrice)}₫</div>
                                    <div className="price-2">
                                        <span className="full-price">{formatMoney(options[0].price)}₫</span>
                                        <span className="sale">| -{regularDiscount}%</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
          </div>
      );
  }

}

export default FavoriteList;