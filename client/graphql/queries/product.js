import {gql} from "apollo-boost"
import {UserInfoFragment, UserProviderInfoFragment} from "../fragments/user";
import {ProductInfoFragment} from "../fragments/product";
import {CategoryInfoFragment} from "../fragments/category";
import {CommentInfoFragment} from "../fragments/comment";

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

const getProductComments = gql`
  query($productID: ID!, $skip: Int!, $take: Int!, $sortByStar: SortEnum){
      getProductComments(productID: $productID, skip: $skip, take: $take, sortByStar: $sortByStar){
          _id
          comments{
              ...CommentInfo
          }
      }
  }
    ${CommentInfoFragment}
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
  getBasicProductInfo,
    getProductComments
}