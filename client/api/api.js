import {apiFactory} from "./api-factory/api-config";
import {authenCache} from "../common/cache/authen-cache";

import {customHistory} from "../react/routes/routes";
import {TrackLocation} from "../react/common/location-tracker";
import {clearAppStores} from "../common/system/system";


const authenApiConfig = {
  hostURL: "https://localhost:10000/api",
  onErrors: {
    "token_expired": async () => {
      authenCache.clearAuthen();
      await clearAppStores();
      TrackLocation.setProps(customHistory.location.pathname);
      customHistory.push("/")
    },
    "account_not_found": async () => {
      authenCache.clearAuthen();
      await clearAppStores();
      customHistory.push("/")
    },
    "must_authenticate": async () => {
      authenCache.clearAuthen();
      await clearAppStores();
      TrackLocation.setProps(customHistory.location.pathname);
      customHistory.push("/")
    }
  }

};

const offlineApiConfig = {
  hostURL: "https://localhost:10000/api"
};


export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

