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

const UserProviderInfoFragment = gql`
    fragment UserProviderInfo on User{
        _id
        fullname
        phone
        email
        picture
    }
`;

export {UserInfoFragment, UserProviderInfoFragment}