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
                regularDiscount
                deal{
                    last
                }
                provider{
                    owner{
                        ...UserProviderInfo
                    }
                    discountWithCode{
                        _id
                        code
                        value
                    }
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
            }


        }
    }
    ${UserProviderInfoFragment}
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
                
                brand{
                    name
                    _id
                }
                provider{
                    owner{
                        ...UserProviderInfo
                    }
                    discountWithCode{
                        _id
                        code
                        value
                    }
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
                categories{
                    ...CategoryInfo
                }
                deal{
                    last
                }
                describeFields
                
            }
            meanStar
            commentCount
            timeLeft
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