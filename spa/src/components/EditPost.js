import {
    Link, useHistory,
  } from "react-router-dom";

import Comment from './Comment';
import { useEffect, useState } from "react";
import Button from "./Button";
import moment from 'moment';
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_POST, GET_POSTS } from "../graphql/Queries";
import { ADD_COMMENT, UPDATE_POST } from "../graphql/Mutations";

export default function EditPost(props) {
    const id = parseInt(props.match.params.id);
    const history = useHistory();
    const [post, setPost] = useState({});
    const [state , setState] = useState({
        title : "",
        content : "",
        comment: "",
        comments: []
    });
    const [stateImg , setImgState] = useState({
        file : "",
        imagePreviewUrl : "",
    });

    const [updatePost] = useMutation(UPDATE_POST);
    const [addComment] = useMutation(ADD_COMMENT);

    const [viewedPost] = useLazyQuery(GET_POST, { onCompleted: (data) => {
            setPost(data.post);
            setState({
                title: data.post.title,
                content: data.post.content,
                comments: data.post.comments
            });

            setImgState({
                file: "",
                imagePreviewUrl: data.post.image
            })
        }
    });
        
    useEffect(() => {
        viewedPost({variables: { id: id}});
    },[]);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmit = () => {
        if (state.comment !== "") {
            addComment({ variables: { postId: id, content: state.comment},
                refetchQueries: [{query: GET_POST, variables: { id: id}}]
            })
            .then(res => {
                setState({comments: [...state.comments, res.data.addComment], comment: ""})
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          setImgState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file);
    }

    const handleSavePost = () => {
        updatePost({
                variables: { 
                    post: {
                            id: id,
                            title: state.title,
                            content: state.content,
                            image: stateImg.imagePreviewUrl,
                        }
                    },
                refetchQueries: [{query: GET_POSTS}]
            })
            .then(() => {
                history.push('/');
            })
            .catch(e => {
                console.log(e);
            })
    }

    let {imagePreviewUrl} = stateImg;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img alt="" src={imagePreviewUrl} />);
    }

    return (
        <div className="mt-100">
            <section className="bg-gray">
                <ul className="breadcrumb">
                    <li><Link to="/">HOME</Link></li>
                    <li>{post.title}</li>
                </ul>
            </section>
            <section className="flex flex-row flex-end mt-63 px-123">
                <span className="f-20 fw-bold ml-50 underline cursor-pointer" onClick={handleSavePost}>Save Post</span>
                <Link to={`/`}><span className="f-20 fw-bold ml-50 underline">Cancel</span></Link>
            </section>
            <section className="mt-33 px-123">
                <div className="flex flex-column news-info">
                    <span className="f-20">{moment(post.createdAt).format('yyyy.MM.DD')}</span>
                    <textarea onChange={handleChange} className="h-150 w-100p mt-19 mb-31 p-15 f-40 ff-2 fs-normal fw-bold" id="title" value={state.title} onChange={handleChange} placeholder="Title"/>
                    <div className="preview-component">
                        <div className="img-preview">
                            {$imagePreview}
                        </div>
                        <label htmlFor="file-upload" className="btn custom-file-upload f-20 fw-bold">
                            UPLOAD IMAGE
                        </label>
                        <input required id="file-upload" type="file" onChange={handleImageChange} />
                    </div>
                    <textarea onChange={handleChange} className="h-394 w-100p mb-160 p-15 f-18 ff-2 fs-normal" id="content" value={state.content} onChange={handleChange} placeholder="Content"/>
                </div>
            </section>
            <section className="comment px-123 ">
                <div className="mt-60 mb-39 "><span className="f-50 fw-bold">COMMENT</span></div>
                <div className="flex flex-column">
                    {state.comments.slice().sort(function(a, b) { 
                            return a.id - b.id;
                        }).map((cm, i) => {
                        return <Comment key={i} comment={cm}/>
                    })}
                </div>
                <textarea className="h-200 w-100p p-40 fs-italic" id="comment" value={state.comment} onChange={handleChange} placeholder="Write comment"/>
                <div className="mt-40 mb-148 flex flex-row flex-end"><Button width="210px" label="SUBMIT" onClick={handleSubmit} /></div>
            </section>
        </div>
    )   
}