import {gql} from "apollo-boost"
import {UserInfoFragment, UserProviderInfoFragment} from "../fragments/user";
import {ProductCacheFragment, ProductInfoFragment} from "../fragments/product";
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


const replyComment = gql`
    mutation ($pID: String!, $cmtID: String!, $subCmt: SubCommentInput!){
        replyComment(productID: $pID, commentID: $cmtID, data: $subCmt){
            _id
            author{
                _id
                fullname
                picture
            }
            content
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

const getProducts = gql`
    query($mainFilter: MainFilterInput, $productFilter: ProductFilterInput, $categoryID: ID, $rating: Int, $skip: Int, $take: Int, $brand: ID, $provider: ID, $priceRange: String){
        getProducts(mainFilter: $mainFilter, productFilter: $productFilter, categoryID: $categoryID, skip:$skip, take: $take, rating: $rating, brand: $brand, provider: $provider, priceRange: $priceRange){
            products{
                info{
                    ...ProductCacheInfo
                }

                meanStar
                commentCount
            }
            total
            execTime
            productFilters{
                categories{
                    _id
                    name
                    childs{
                        _id
                        name
                        count
                    }
                }
                providers{
                    _id
                    name
                    count
                }
                brands{
                    _id
                    name
                    count
                }
            }
        }
    }
    ${ProductCacheFragment}
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

const searchProducts = gql`
    query($keyword: String){
        searchProducts(keyword: $keyword){
            products{
                info{
                    ...ProductCacheInfo
                }

                meanStar
                commentCount
            }
            
        }
    }
    ${ProductCacheFragment}
`;

export {
    fetchIndexDealProducts,
    getFullProductDetails,
    getBasicProductInfo,
    getProductComments,
    replyComment,
    getProducts,
    searchProducts
}