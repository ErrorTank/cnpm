import {authenCache} from "../../common/cache/authen-cache";

const getHeaders = async () => {
  const token = await authenCache.getAuthen('k-authen-token');
  return {
    Authorization: token
  }
};

export {getHeaders as default}