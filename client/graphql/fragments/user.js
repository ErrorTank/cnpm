import {gql} from "apollo-boost"

const UserInfoFragment = gql`
    fragment UserInfo on User{
        _id
        fullname
        phone
        email
        gender
        dob
        address{
            city{
                name
                name_with_type
                type
                code
            }
            district{
                name
                name_with_type
                type
                code
                parent_code
            }
            description
            ward{
                name
                name_with_type
                type
                code
                parent_code
            }
            
        }
        role
        isVerify
        picture
        subscribe
        favorites
        carts{
            product
            quantity
            option
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

export {UserInfoFragment, UserProviderInfoFragment,}