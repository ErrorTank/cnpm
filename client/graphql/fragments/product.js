import {gql} from "apollo-boost"
import {CategoryInfoFragment} from "./category";
import {CommentInfoFragment} from "./comment";

const ProductInfoFragment = gql`
    fragment ProductInfo on Product{
        _id
        name
        description
        regularDiscount
        
        provider{
            owner{
                address
                name
                phone
                email
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
`;


export {ProductInfoFragment, ProductCacheFragment}