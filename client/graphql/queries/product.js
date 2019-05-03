import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";
import {ProductInfoFragment} from "../fragments/product";

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

export {
    fetchIndexDealProducts,
    getFullProductDetails
}