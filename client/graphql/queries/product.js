import {gql} from "apollo-boost"
import {UserInfoFragment} from "../fragments/user";

const fetchDealProducts = gql`
    query{
        getProducts{
            _id
            name
            options{
                price
                total
                sold
                picture
                deal{
                    last
                }
            }
            
        }
    }
`;

export {
  fetchDealProducts
}