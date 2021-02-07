import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment'
import { useMutation } from '@apollo/client';
import { ADD_POST } from "../graphql/Mutations";
import '../css/ImageUpload.css';
import { GET_POSTS } from "../graphql/Queries";
import swal from 'sweetalert';

export default function AddPost() {
    const history = useHistory();
    const [state , setState] = useState({
        title : "",
        content : "",
    })

    const [stateImg , setImgState] = useState({
        file : "",
        imagePreviewUrl : "",
    })

    const [addPost] = useMutation(ADD_POST);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
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
        addPost({ 
                variables: { 
                    post: {
                        title: state.title,
                        content: state.content,
                        image: stateImg.imagePreviewUrl
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

    const handleCancel = () => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: { 
                confirm: true, 
                cancel: true,
            }
          }).then((res) => {
              if (res) {
                  history.push('/');
              }
          });
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
                    <li>Create New Post</li>
                </ul>
            </section>
            <section className="flex flex-row flex-end mt-63 px-123">
                <span className="f-20 fw-bold ml-50 underline cursor-pointer" onClick={handleSavePost}>Save Post</span>
                <span className="f-20 fw-bold ml-50 underline" onClick={handleCancel}>Cancel</span>
            </section>
            <section className="mt-33 px-123">
                <div className="flex flex-column news-info">
                    <span className="f-20">{moment().format('yyyy.MM.DD')}</span>
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
        </div>
    )
}