import {gql} from "apollo-boost"


const CommentInfoFragment = gql`
    fragment CommentInfo on Comment{
        _id
        rating
        author{
            _id
            fullname 
            role
            picture
        }
        updatedAt
        title
        content
        picture
        subComment{
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


export {CommentInfoFragment}