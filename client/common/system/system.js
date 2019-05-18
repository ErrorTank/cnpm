import {authenCache} from "../cache/authen-cache";
import {userCart, userFavorites, userInfo} from "../states/common";
import omit from "lodash/omit";
import pick from "lodash/pick";

const isLogin = () => {
  return authenCache.getAuthen();

};

const mutateAppStores = (data) => {
  userInfo.setState(omit(data, ["favorites", "carts"]));
  userCart.setState(pick(data, ["carts"]).carts);
  userFavorites.setState(pick(data, ["favorites"]).favorites);
};

const clearAppStores = () => {
  userInfo.setState(null);
  userCart.setState([]);
  userFavorites.setState([]);
};


export {isLogin, mutateAppStores, clearAppStores}