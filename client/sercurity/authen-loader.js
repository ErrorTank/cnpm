import initClient from "../graphql/index"
import {authenCache} from "../common/cache/authen-cache";
import {authenApi} from "../api/api";

export const authenLoader = {
  init() {
    initClient();
    authenApi.addHeader("Authorization", () => {
      let token = authenCache.getAuthen();
      return token ? `Bearer ${token}` : null;
    });
    return authenCache.loadAuthen()
      .then(() => Promise.resolve())
      .catch(() => Promise.resolve())

  }
};
