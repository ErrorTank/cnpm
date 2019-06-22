import {authenApi} from "../api";


export const productApi = {
  createComment(productID, data){
    return authenApi.postMultipart(`/comment/create/${productID}`, data, "picture")
  },
  updateUserInfo({userID, change}){
    return authenApi.postMultipart(`/user/${userID}/update`, change, "picture")
  }
};

