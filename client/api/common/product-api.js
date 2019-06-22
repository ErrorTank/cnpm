import {authenApi} from "../api";


export const productApi = {
  createComment(productID, data){
    return authenApi.postMultipart(`/comment/create/${productID}`, data, "picture")
  },
};

