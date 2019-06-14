import {gql} from "apollo-boost"
import {CategoryInfoFragment} from "./category";
import {CommentInfoFragment} from "./comment";
import {UserProviderInfoFragment} from "./user";

const ProductInfoFragment = gql`
    fragment ProductInfo on Product{
        _id
        name
        description
        regularDiscount
        
        provider{
            owner{
                ...UserProviderInfo
            }
            discountWithCode{
                value
                code
                _id
            }
            options{
                _id
                price
                description
                total
                sold
                picture
            }
            
        }
        categories{
            ...CategoryInfo
        }
        comments{
            ...CommentInfo
        }
        deal{
            last
        }
        brand{
            name
        }
        describeFields
        
    }
    ${UserProviderInfoFragment}
    ${CategoryInfoFragment}
    ${CommentInfoFragment}
`;

const ProductCacheFragment = gql`    
    fragment ProductCacheInfo on Product{
        _id
        name
        description
        regularDiscount
        deal{
            last
        }
        provider{
            owner{
                ...UserProviderInfo
            }
            discountWithCode{
                value
                code
                _id
            }
            options{
                _id
                price
                description
                total
                sold
                picture
            }
        }
    }
    ${UserProviderInfoFragment}
`;


export {ProductInfoFragment, ProductCacheFragment}