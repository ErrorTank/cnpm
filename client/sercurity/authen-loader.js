import initClient from "../graphql/index"
import {authenCache} from "../common/cache/authen-cache";

export const authenLoader = {
  init() {
    initClient();
    return authenCache.loadAuthen()
      .then(() => Promise.resolve())
      .catch(() => Promise.resolve())

  }
};
