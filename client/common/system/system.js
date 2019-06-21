import {authenCache} from "../cache/authen-cache";
import {userCart, userCheckoutItemInfo, userFavorites, userInfo} from "../states/common";
import omit from "lodash/omit";
import pick from "lodash/pick";
import uniqBy from "lodash/uniqBy";
import {client} from "../../graphql";
import {createUserCartCacheFunction} from "../cache/cart-cache";
import {mutateCart, addToCart} from "../../graphql/queries/user";

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

const mergeCarts = (raw) => {
  let cache = createUserCartCacheFunction("get")({async: false});
  let newCart = raw.concat(cache);
  console.log(newCart )
  let result = newCart.reduce((result, cur) => {
    let temp = result.find(each => each.option === cur.option);
    console.log(temp)
    if (temp) {
      let newItem = {...temp};
      newItem.quantity+=cur.quantity;
      return result.filter(each => each.option !== cur.option).concat(newItem);
    } else {
      return result.concat(cur);
    }
  }, [])
  console.log(result)
  return result;
};

const mutateAppStores = (data) => {
  let merge = mergeCarts(pick(data, ["carts"]).carts.map(each => omit(each, ["__typename"])));
  return Promise.all([userInfo.setState(omit(data, ["favorites", "carts"])), userCart.setState(merge), userFavorites.setState(pick(data, ["favorites"]).favorites)]).then(() => {
    let uID = userInfo.getState()._id;
    return Promise.all([createUserCartCacheFunction("deleteAll")(), client.mutate({
      mutation: mutateCart,
      variables: {
        cart: merge,
        uID
      }
    })]);
  }).then(() => Promise.all(listeners.map((l) => l())));

};

const clearAppStores = () => {
  return Promise.all([userInfo.setState(null), userCheckoutItemInfo.setState(null), userCart.setState([]), userFavorites.setState([]), createUserCartCacheFunction("deleteAll")()]).then(() => Promise.all(listeners.map((l) => l())));
};


export {isLogin, mutateAppStores, clearAppStores}