import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";


const getBasicUserInfo = gql`
  query($id: ID!){
      getUser(userID: $id){
          ...UserInfo
      }
  }
  ${UserInfoFragment}
`;

const getAuthenUser = gql`
    query{
        getAuthenUser(userID: $id){
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

export {
  getBasicUserInfo,
  getAuthenUser,
  register
}