import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";
import {ProductCacheFragment} from "../fragments/product";


const getBasicUserInfo = gql`
  query($id: ID!){
      getUser(userID: $id){
          ...UserInfo
      }
  }
  ${UserInfoFragment}
`;

const getUserRecentVisited = gql`
  query($id: ID!){
    getUserRecentVisited(userID: $id){
      recentVisit{
        createdAt
        product{
          ...ProductCacheInfo
        }
      }
      
    }
  }
  ${ProductCacheFragment}
`;

const getAuthenUser = gql`
    query{
        getAuthenUser{
            ...UserInfo
        }
    }
    ${UserInfoFragment}
`;

const register = gql`
    mutation ($data: CreateUserInput!){
        register(data: $data){
            message
        }
    }
 
`;

const regularLogin = gql`
   query($payload: RegularLoginInput!){
        regularLogin(payload: $payload){
            user{
                ...UserInfo
            }
            token
        }
    }
    ${UserInfoFragment}
`;


const registerSocial = gql`
    mutation ($data: CreateUserInput!){
        registerSocial(data: $data){
            user{
                ...UserInfo
                social{
                    id
                    type
                }
            }
            token
        }
    }
    ${UserInfoFragment}
`;

const checkEmailExisted = gql`
    query ($email: String!){
        checkEmailExisted(email: $email)
    }
  
`;

const resendConfirmEmail = gql`
    mutation ($email: String!){
        resendConfirmEmail(email: $email)
    }

`;

const checkConfirm = gql`
  query ($token: String!){
      checkConfirm(token: $token){
          user{
              ...UserInfo
          }
          token
      }
      
  }
  ${UserInfoFragment}
`;

const getSocialUserInfo = gql`
    query ($socialID: String!){
        getSocialUserInfo(socialID: $socialID){
            user{
                ...UserInfo
                social{
                    id
                    type
                }
            }
            token
        }

    }
    ${UserInfoFragment}
`;

const confirmForgotPassword = gql`
    mutation ($email: String!){
        confirmForgotPassword(email: $email)

    }
`;

const changePassword = gql`
    mutation ($payload: ResetPasswordInput!){
        changePassword(payload: $payload)

    }
`;
const addRecentVisit = gql`
  mutation ($uID: ID! ,$pID: ID!){
    addRecentVisit(uID: $uID, pID: $pID)

  }
`;

export {
  getBasicUserInfo,
  getAuthenUser,
  register,
  resendConfirmEmail,
  checkConfirm,
  getSocialUserInfo,
  registerSocial,
  regularLogin,
  checkEmailExisted,
  confirmForgotPassword,
  changePassword,
  getUserRecentVisited,
  addRecentVisit

}