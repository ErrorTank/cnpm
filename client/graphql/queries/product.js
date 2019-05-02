import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";

const fetchIndexDealProducts = gql`
    query{
        getIndexDealProducts(skip: 0, take: 5){
            _id
            name
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
`;

export {
    fetchIndexDealProducts
}