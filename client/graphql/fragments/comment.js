import {gql} from "apollo-boost"


const CommentInfoFragment = gql`
    fragment CommentInfo on Comment{
        rating
        author{
            fullname 
            role
            picture
        }
        updatedAt
        title
        content
        picture
        subComment{
            author{
                fullname
                picture
            }
            content
        }
    }

`;


export {CommentInfoFragment}