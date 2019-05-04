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
        options{
            price
            description
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
            price
            description
            total
            sold
            picture
        }
    }
`;


export {ProductInfoFragment, ProductCacheFragment}