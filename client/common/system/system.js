import {authenCache} from "../cache/authen-cache";

const isLogin = () => {
  return authenCache.getAuthen();

};

export {isLogin}