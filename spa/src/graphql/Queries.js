import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query Posts($pagination: Pagination) {
        posts(pagination: $pagination) {
            id,
            title,
            content,
            image,
            createdAt,
            comments {
                content
            }
        }
    }
`;

export const GET_POST = gql`
    query Post($id: Int) {
        post(id: $id) {
            title,
            content,
            image,
            createdAt,
            comments {
                id,
                content,
                createdAt
            }
        }
    }
`;