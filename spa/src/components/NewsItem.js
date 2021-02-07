import React from "react";
import { useHistory } from "react-router-dom";
import moment from 'moment';

import actions from '../actions';
import { useDispatch } from "react-redux";

export default function NewsItem(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickPost = () => {
        dispatch(actions.posts.setPost(props));
        history.push(`/post/view/${props.post.id}`)
    }

    return (
        <div className="App-news-item col-4 cursor-pointer" onClick={handleClickPost}>
            <div className="App-news-item-thumbnail">
                <img alt="" src={props.post.image}></img>
            </div>
            <p className="App-news-item-date">{moment().format('yyyy.MM.DD')}</p>
            <p className="App-news-item-content">{props.post.title}</p>
        </div>
    )
}