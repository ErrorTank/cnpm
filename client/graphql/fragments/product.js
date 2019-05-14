import {gql} from "apollo-boost"
import {UserProviderInfoFragment} from "./user";
import {CategoryInfoFragment} from "./category";
import {CommentInfoFragment} from "./comment";

const ProductInfoFragment = gql`
    fragment ProductInfo on Product{
        _id
        name
        description
        regularDiscount
        discountWithCode{
            value
            code
            _id
        }
        provider{
            ...UserProviderInfo
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
        options{
            _id
            price
            description
            describeFields
            total
            sold
            picture
        }
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
        options{
            _id
            price
            description
            total
            sold
            picture
        }
    }
`;


export {ProductInfoFragment, ProductCacheFragment}