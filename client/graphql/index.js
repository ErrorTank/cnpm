import ApolloClient from "apollo-boost";
import getHeaders from "./utils/get-header"
import {authenCache} from "../common/cache/authen-cache";
import {clearAppStores} from "../common/system/system";
import {TrackLocation} from "../react/common/location-tracker";
import {customHistory} from "../react/routes/routes";

let client = null;

const errors = {
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
  "login_required": async () => {
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
};

const initClient = () => {
  client = new ApolloClient({
    uri: process.env.GRAPHQL_URI,
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError)
      if(graphQLErrors && errors.hasOwnProperty(graphQLErrors[0].message)){
        errors[graphQLErrors[0].message]();
      }

    },
    request: async (operation) => {
      let headers = await getHeaders();
      operation.setContext({
        headers
      });
    },
  });
};

export {initClient as default, client};