import {Cache} from "./cache";
import {client} from "../../graphql";
import {getAuthenUser} from "../../graphql/queries/user";
import {userInfo} from "../states/user-info";
import {authenCache} from "./authen-cache";
import {client} from "../../graphql";

export const recentVisitedProductCache  = (() =>  {
    const cache = new Cache(localStorage);
    return {
        async clearProducts(){
            return cache.set(null, "recent-visited-products");
        },
        async getProducts(){
            return cache.get("recent-visited-products")
        },
        async addProduct(product){
            let previousProds = cache.get("recent-visited-products") || [];
            return cache.set([...previousProds, product], "recent-visited-products");
        }
    }
})();

export const RVPCManager = (actionName) => {
  let authen = authenCache.getAuthen();
  let authenActions = {
      getProducts(){
          return client.query()
      },
      addProduct(product){
          return client.mutate({

          })
      }
  };
  return !authen ? recentVisitedProductCache[actionName] : authenActions[actionName]
};