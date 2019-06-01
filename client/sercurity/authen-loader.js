import initClient from "../graphql/index"
import {authenCache} from "../common/cache/authen-cache";
import {authenApi} from "../api/api";
import {categoriesCache, initClientCache} from "../common/cache/api-cache/common-cache";
import {asyncParallel} from "../common/async-utils";

export const authenLoader = {
  init() {
    initClient();
    authenApi.addHeader("Authorization", () => {
      let token = authenCache.getAuthen();
      return token ? `Bearer ${token}` : null;
    });

    return asyncParallel([
      () => authenCache.loadAuthen(),
      () => initClientCache()
    ]).then(result => {
      console.log(result);
      return Promise.resolve();
    })


  }
};
