import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/Queries';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import actions from '../actions';
import Button from "./Button";
import NewsItem from "./NewsItem";

export default function NewsList() {
    const dispatch = useDispatch();
    const [hasLoadMore, setHasLoadMore] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.authenticated);

    const {data, fetchMore} = useQuery(
      GET_POSTS,
      { 
        variables: {pagination: {
          offset: 3,
          limit: 6
        }},
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: false,
        onCompleted: (data) => {
          dispatch(actions.posts.setPosts(data.posts));
      }});
  
    const loadMore = () => {
      fetchMore({
        variables: { pagination: {
          offset: data.posts.length,
          limit: 6
        }},
        updateQuery: (prev, { variables, fetchMoreResult }) => {
          if (!fetchMoreResult || prev.posts.length > variables.offset) return prev;

          if (fetchMoreResult.posts.length < 6) {
            setHasLoadMore(false);
          }
          return {
            ...prev,
            posts: [...prev.posts, ...fetchMoreResult.posts]
          }
        }
      });
    }
    
    return (
        <section className="App-list">
            <div className="flex flex-row flex-align-center flex-space-between mb-65">
                <span className="App-list-header">NEWS</span>
                {isAuthenticated && <Link to="/post/create"><span className="f-20 fw-bold ml-50 underline">Create New Post</span></Link>}
            </div>
            <div className="flex-gap">
                {data?.posts.map((post, i) => {
                  return <NewsItem key={i} post={post}></NewsItem>
                })}
            </div>
            <div className="flex flex-justify-content-center mt-70">
              {hasLoadMore && <Button onClick={loadMore} label="LOAD MORE" width="340px"></Button>}
            </div>
        </section>
    )
}