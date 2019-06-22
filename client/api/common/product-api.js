import {authenApi} from "../api";


export const productApi = {
  updateUserInfo({userID, change}){
    return authenApi.postMultipart(`/user/${userID}/update`, change, "picture")
  }
};

