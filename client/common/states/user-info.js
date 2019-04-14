import {createStateHolder} from "./state-holder";

export const userInfo = createStateHolder();


export const rolesHelper = {
  getRole(){
    let info = userInfo.getState();
    return info ? info.role : null;
  }
};