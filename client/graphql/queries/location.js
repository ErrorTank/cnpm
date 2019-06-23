import {gql} from "apollo-boost";

const fetchCities = gql`
    query{
        fetchCities{
            name
            name_with_type
            type
            code
        }
    }
  
`;

const fetchDistricts = gql`
    query($parent: String){
        fetchDistricts(parent: $parent){
            name
            name_with_type
            type
            code
            parent_code
        }
    }

`;

const fetchWards = gql`
    query($parent: String){
        fetchWards(parent: $parent){
            name
            name_with_type
            type
            code
            parent_code
        }
    }

`;

export {
  fetchCities,
  fetchDistricts,
  fetchWards
}
