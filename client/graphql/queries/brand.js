import {gql} from "apollo-boost";

const getCacheBrandsInfo = gql`
    query{
        getCacheBrandsInfo{
            _id
            name
            logo
        }
    }
`;

export {
  getCacheBrandsInfo,

}