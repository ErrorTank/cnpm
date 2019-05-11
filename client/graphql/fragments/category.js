import {gql} from "apollo-boost"


const CategoryInfoFragment = gql`
    fragment CategoryInfo on Category{
        _id
        name
        childrens{
            _id
            name
        }
    }
    
`;


export {CategoryInfoFragment}