import React from 'react'
import { userFavorites, userInfo } from "../../../../../common/states/common";
import { KComponent } from '../../../../common/k-component';
import { formatMoney } from "../../../../../common/products-utils";

class FavoriteList extends KComponent{
    constructor(props) {
    super(props);
    // this.onUnmount(appStoreController.onChange(() => {
    //   this.setState({ ...this.defaultState }, () => this.fetchItemList());
    // }));
    // Call api only list not empty
  };
  render(){
      let rawCart = userFavorites.getState()
      console.log(rawCart);
      return(
          <div></div>
      );
  }

}

export default FavoriteList;