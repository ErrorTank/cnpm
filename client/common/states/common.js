import {createStateHolder} from "./state-holder";

export const userInfo = createStateHolder();
export const userCart = createStateHolder([]);
export const userFavorites = createStateHolder([]);
export const userCheckoutItemInfo = createStateHolder([]);

export const rolesHelper = {
  getRole(){
    let info = userInfo.getState();
    return info ? info.role : null;
  }
};