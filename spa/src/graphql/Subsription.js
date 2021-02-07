import { gql } from '@apollo/client';

export const COMMENT_ADDED = gql`
    subscription CommentAdded ($postId:Int!) {
        commentAdded(postId: $postId) {
            content,
            createdAt
        }
    }
`;