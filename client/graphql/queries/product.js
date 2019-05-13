import {gql} from "apollo-boost"
import {UserInfoFragment, UserProviderInfoFragment} from "../fragments/user";
import {ProductInfoFragment} from "../fragments/product";
import {CategoryInfoFragment} from "../fragments/category";

const fetchIndexDealProducts = gql`
    query{
        getIndexDealProducts(skip: 0, take: 5){
            
            timeLeft
            product{
                _id
                name
                discountWithCode{
                    _id
                    code
                    value
                }
                regularDiscount
                deal{
                    last
                }
                options{
                    price
                    total
                    sold
                    picture

                }
            }


        }
    }
`;

const getFullProductDetails = gql`
    query($pID: String!){
        getProduct(productID: $pID){
            ...ProductInfo
        }
    }
    ${ProductInfoFragment}
`;

const getBasicProductInfo = gql`
    query($pID: String!){
        getBasicProduct(productID: $pID){
            info{
                _id
                name
                description
                regularDiscount
                describeFields
                discountWithCode{
                    _id
                    code
                    value
                }
                brand{
                    name
                    _id
                }
                provider{
                    ...UserProviderInfo
                }
                categories{
                    ...CategoryInfo
                }
                deal{
                    last
                }
                describeFields
                options{
                    price
                    description
                    describeFields
                    total
                    sold
                    picture
                }
            }
            meanStar
            commentCount
        }
    }
    ${UserProviderInfoFragment}
    ${CategoryInfoFragment}

`;

export {
  fetchIndexDealProducts,
  getFullProductDetails,
  getBasicProductInfo
}