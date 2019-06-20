import {authenCache} from "../cache/authen-cache";
import {userCart, userFavorites, userInfo} from "../states/common";
import omit from "lodash/omit";
import pick from "lodash/pick";

const isLogin = () => {
  return authenCache.getAuthen();

};

let listeners = [];

export const appStoreController = {
  onChange: (fn) => {
    listeners.push(fn);
    return () => {
      let i = listeners.indexOf(fn);
      listeners.splice(i, 1);
    }
  }
};

const mutateAppStores = (data) => {
  return Promise.all([userInfo.setState(omit(data, ["favorites", "carts"])), userCart.setState(pick(data, ["carts"]).carts.map(each => omit(each, ["__typename"]))), userFavorites.setState(pick(data, ["favorites"]).favorites)]).then(() => Promise.all(listeners.map((l) => l())));

};

const clearAppStores = () => {
  return Promise.all([userInfo.setState(null), userCart.setState([]), userFavorites.setState([])]).then(() => Promise.all(listeners.map((l) => l())));
};


export {isLogin, mutateAppStores, clearAppStores}