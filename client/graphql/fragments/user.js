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
        favorites
        carts{
            product
            quantity
        }
    }
`;
const UserCacheInfoFragment = gql`
    fragment UserCacheInfo on User{
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
        favorites
        carts{
            product
            quantity
        }
    }
`;

const UserProviderInfoFragment = gql`
    fragment UserProviderInfo on User{
        _id
        provider{
            address
            name
            phone
            email
        }
    }
`;

export {UserInfoFragment, UserProviderInfoFragment, UserCacheInfoFragment}