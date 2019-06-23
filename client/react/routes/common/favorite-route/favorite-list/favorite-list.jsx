import React from 'react'
import { userFavorites, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import { formatMoney } from "../../../../../common/products-utils";
import { client } from "../../../../../graphql";
import { getFavItemsByIdList,addToFavorites } from "../../../../../graphql/queries/user";
import { customHistory } from "../../../routes";

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

  handleDeleteWishlist = (list) => {
    let info = userInfo.getState();
    return client.mutate({
      mutation: addToFavorites,
      variables: {
        pID: list._id,
        uID: info._id
      }
    }).then(({ data }) => {
      userFavorites.setState(data.addToFavorites.favorites.map((item) => {
        let newFavList = this.state.favoriteItemList.filter(item => {
          return item.info._id !== list._id;
        }, () => { this.updateError() })
        this.setState({
          favoriteItemList: newFavList
        });
      }))
    })
  }
        
  render(){
      let rawCart = userFavorites.getState();
      let { favoriteItemList } = this.state;
      return(
          <div className="wrap">
            <h1 className="list-count">
                Danh sách yêu thích ({rawCart.length})
            </h1>
            <div className="account-wishlist">
                {
                    favoriteItemList.map(each => {
                        let {info, meanStar} = each;
                        let {regularDiscount, name, provider } = info;
                        let {options} = provider[0];
                        let discountedPrice = (options[0].price / 100) * (100 - regularDiscount);
                        return (
                            <div className="row wishlist-item" key={info._id}>
                                <div className="item-col-1 col-2">
                                    <div className="wishlist-icon">
                                        <img src={options[0].picture} alt="wishlist-logo"/>
                                    </div>
                                </div>
                                <div className="item-col-2 col-7">
                                    <p className="title"><span onClick={() => customHistory.push("/product/" + info._id)}>{name}</span></p>
                                    <div className="stars-outer"
                                    >
                                      {[1, 2, 3, 4, 5].map(each => (
                                        <span className="star"
                                          key={each}
                                        />
                                      ))}
                                      <div className="stars-inner" style={{ width: (meanStar / 5) * 100 + "%" }}>
                                        {[1, 2, 3, 4, 5].map(each => (
                                          <span className="star"
                                            key={each}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                </div>
                                <div className="item-col-3 col-3">
                                    <button className="close" onClick={() => this.handleDeleteWishlist(info)}>&times;</button>
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