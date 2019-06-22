import {authenApi} from "../api";


export const userApi = {
  updateUserInfo({userID, change}){
    return authenApi.postMultipart(`/user/${userID}/update`, change, "picture")
  }
};

