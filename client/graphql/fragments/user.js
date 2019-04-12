import {gql} from "apollo-boost"

const UserInfoFragment = gql`
    fragment UserInfo on User{
        fullName
        phone
        email
        gender
        dob
        role
    }
`;


export {UserInfoFragment}