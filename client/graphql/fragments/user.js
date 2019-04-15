import {gql} from "apollo-boost"

const UserInfoFragment = gql`
    fragment UserInfo on User{
        _id
        fullname
        phone
        email
        gender
        dob
        role
        isVerify
        picture
        subscribe
    }
`;


export {UserInfoFragment}