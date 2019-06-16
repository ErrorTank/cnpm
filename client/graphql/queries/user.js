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

const getCacheProvidersInfo = gql`
    query{
        getCacheProvidersInfo{
            _id
            name
            address
            phone
            email
        }
    }
`;
const addToFavorites = gql`
    mutation ($uID: ID!, $pID: ID!){
        addToFavorites(userID: $uID, productID: $pID){
            _id
            favorites
        }
    }
`;

const addToCart = gql`
    mutation ($uID: ID!, $pID: ID!, $qty: Int!, $option: ID!){
        addToCart(userID: $uID, productID: $pID, qty: $qty, option: $option){
            _id
            carts{
                product
                option
                quantity
            }
        }
    }
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
        checkEmailExisted(email: $email){
          __typename
          ... on BoolBox {
            boolVal: value
          }
          ... on StringBox {
            stringVal: value
          }
        }
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

const getCartItemByIdList = gql`
  query ($list: [CartInput]){
    getCartItemByIdList(list: $list){
      product{
        _id
        name
        brand{
          _id
          name
          logo
        }
        regularDiscount
        deal{
          last
        }
        provider{
          owner{
            _id
            fullname
            provider{
              name
              address
              phone
              email
              
            }
          }
          options{
            _id
            price
            description
            total
            sold
            picture
          }
          discountWithCode{
            _id
            code
            value
          }
        }
        
      }
    }
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
  addRecentVisit,
  addToFavorites,
  addToCart,
  getCartItemByIdList,
  getCacheProvidersInfo
}