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
                  loading: false,
              });
          }).catch(err => {
              // console.log(err);
              reject();
          });

      });

  }

  render(){
      let rawCart = userFavorites.getState()
      return(
          <div className="wrap">
            <div className="list-count">
                Danh sách yêu thích ({rawCart.length})
            </div>
            <div className="account-wishlist">
                {/* {
                    let {favoriteItemList} = this.state;
                    let {info, meanstar} = favoriteItemList;
                    let {deal, pro} = info;
                } */}
            </div>
          </div>
      );
  }

}

export default FavoriteList;