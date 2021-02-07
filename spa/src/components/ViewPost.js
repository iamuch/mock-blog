import {
    Link
  } from "react-router-dom";

import Comment from './Comment';
import { useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import moment from 'moment';
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST} from "../graphql/Queries";
import { ADD_COMMENT } from "../graphql/Mutations";

export default function ViewPost(props) {
    const id = parseInt(props.match.params.id);
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const [comment, setComment] = useState("");
    const [state, setState] = useState({
        comments: []
    });

    const [addComment] = useMutation(ADD_COMMENT);

    const {data} = useQuery(
        GET_POST,
        { 
            variables: {id: id},
            fetchPolicy: "network-only"
        });

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = () => {
        if (comment !== "") {
            addComment({ variables: { postId: id, content: comment},
                    refetchQueries: [{query: GET_POST, variables: { id: id}}]
                })
                .then(res => {
                    setState({comments: [...state.comments, res.data.addComment]})
                    setComment("");
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    return (
        <div className="mt-100">
            <section className="bg-gray">
                <ul className="breadcrumb">
                    <li><Link to="/">HOME</Link></li>
                    <li>{data?.post.title}</li>
                </ul>
            </section>
            <section className="flex flex-row flex-end mt-63 px-123">
                {isAuthenticated && <Link to={`/post/edit/${id}`}><span className="f-20 fw-bold underline">Edit Post</span></Link>}
            </section>
            <section className="mt-33 px-123">
                <div className="flex flex-column news-info">
                    <span className="f-20">{moment(data?.post.createdAt).format('yyyy.MM.DD')}</span>
                    <span className="h-119 mt-34 mb-47 f-40 ff-2 fw-bold f-spacing-none">{data?.post.title}</span>
                    <div className="h-540 w-100p"><img alt="" style={{maxWidth:'100%', maxHeight:'100%'}} src={data?.post.image}/></div>
                    <span className="mt-60 h-354 f-18 ff-2 spacing-none">
                        {data?.post.content}
                    </span>
                </div>
            </section>
            <section className="comment px-123 ">
                <div className="mt-60 mb-39 "><span className="f-50 fw-bold">COMMENT</span></div>
                <div className="flex flex-column">
                    {data?.post.comments.slice().sort(function(a, b) { 
                            return a.id - b.id;
                        }).map((cm, i) => {
                        return <Comment key={i} comment={cm}/>
                    })}
                </div>
                <textarea className="h-200 w-100p p-40 fs-italic" id="comment" value={comment} onChange={handleChange} placeholder="Write comment"/>
                <div className="mt-40 mb-148 flex flex-row flex-end"><Button width="210px" label="SUBMIT" onClick={handleSubmit} /></div>
            </section>
        </div>
    )   
}