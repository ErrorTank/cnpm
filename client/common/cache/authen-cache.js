import {userInfo, userCart, userFavorites} from "../states/common";
import {Cache} from "./cache"
import Cookies from "js-cookie";
import {client} from "../../graphql";
import {getBasicUserInfo, getAuthenUser} from "../../graphql/queries/user";
import omit from "lodash/omit"
import pick from "lodash/pick"
import {mutateAppStores} from "../system/system";

const cookiesEngine = {
  getItem: Cookies.get,
  setItem: Cookies.set,
  removeItem: Cookies.remove
};


export const authenCache = (() => {
  const cache = new Cache(cookiesEngine);
  return {
    clearAuthen() {
      cache.set(null, "k-authen-token");
    },
    loadAuthen() {
      return new Promise((resolve, reject) => {
        let authen = cache.get("k-authen-token");
        if (!authen) {
          reject();
        } else {
          client.query({
            query: getAuthenUser,
          }).then(({data}) => {
            console.log(data);
            if (!data)
              reject();
            else {
              mutateAppStores(data.getAuthenUser);
              resolve();
            }

          }).catch(err => reject());

        }
      });

    },
    getAuthen() {
      return cache.get("k-authen-token")
    },
    setAuthen(authen, options) {
      cache.set(authen, "k-authen-token", options);
    }
  }
})();
