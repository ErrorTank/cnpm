import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";


const getBasicUserInfo = gql`
  query($id: ID!){
      getUser(userID: $id){
          ...${UserInfoFragment}
      }
  }
`;

const getAuthenUser = gql`
    query{
        getAuthenUser(userID: $id){
            ...${UserInfoFragment}
        }
    }
`;

export {
  getBasicUserInfo,
  getAuthenUser
}