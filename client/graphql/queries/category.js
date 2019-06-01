import {gql} from "apollo-boost";
import {CategoryInfoFragment} from "../fragments/category";

const getCacheCategoriesInfo = gql`
  query{
    getCacheCategoriesInfo{
      _id
      name
      parent
    }
  }
`;

const getCategoriesParents = gql`
  query($cID: String){
    getCategoriesParents(categoryID: $cID){
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragment}
`;

export {
  getCacheCategoriesInfo,
  getCategoriesParents
}