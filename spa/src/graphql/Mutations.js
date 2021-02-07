import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation Authenticate ($email:String!, $password: String!) {
        authenticate(email: $email, password: $password)
    }
`;

export const REGISTER = gql`
    mutation Register ($email:String!, $password: String!) {
        register(email: $email, password: $password)
    }
`;

export const ADD_POST = gql`
    mutation AddPost($post: PostInput) {
        addPost(post: $post) {
            id,
            title,
            content
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment ($postId:Int!, $content: String!) {
        addComment(postId: $postId, content: $content) {
            content,
            createdAt
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($post: PostInput) {
        updatePost(post: $post) {
            id,
            title,
            content,
            image
        }
    }
`;