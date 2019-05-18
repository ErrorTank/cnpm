
import {createLocalStorageCache} from "./recent-product-guest-visit-cache";

const userCartCache = createLocalStorageCache({
  key: "guess-cart",
  compare: (item1, item2) => item1.option === item2.option,
  maxCache: 10
});



export const createUserCartCacheFunction = (actionName) => {
  return userCartCache[actionName]
};