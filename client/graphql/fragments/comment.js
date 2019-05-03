import {gql} from "apollo-boost"


const CommentInfoFragment = gql`
    fragment CommentInfo on Comment{
        rating
        author{
            fullname 
            role
        }
        updatedAt
        title
        content
        picture
    }

`;


export {CommentInfoFragment}