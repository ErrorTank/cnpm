import {createLocalStorageCache} from "./recent-product-guest-visit-cache";

export const userCartCache = createLocalStorageCache({
  key: "guess-cart",

});

const userCacheActions = {
  get({async}) {
    return userCartCache.get(async);
  },
  async set(cartItem) {

    let previousItems = await userCartCache.get();
    let index = previousItems.findIndex(each => each.option === cartItem.option);

    if (index !== -1) {
      previousItems[index].quantity += cartItem.quantity;
      return userCartCache.set([...previousItems]);
    } else if (previousItems.length === 20) {
      return Promise.reject();

    }
    return userCartCache.set([cartItem, ...previousItems]);

  }
};


export const createUserCartCacheFunction = (actionName) => {
  return userCacheActions[actionName]
};