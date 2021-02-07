import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AUTHENTICATE } from '../graphql/Mutations';
import { useHistory } from 'react-router';
import {
    Link,
  } from "react-router-dom";

import { useMutation } from '@apollo/client';

import actions from "../actions";

export default function Login() {
    const history = useHistory();

    const [state , setState] = useState({
        email : "",
        password : "",
    });
    const [response, setResponse] = useState({success: true, msg: ""});

    const dispatch = useDispatch();
    const [authenticate] = useMutation(AUTHENTICATE);

    const handleChange = (e) => {
        const {id , value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }
    
    const handleSubmit = (e) => {
        authenticate({ variables: { email: state.email, password: state.password}})
            .then(({ data }) => {
                if (data.authenticate !== "") {
                    dispatch(actions.auth.login(data.authenticate, {email: state.email}));
                    history.push('/');
                } else {
                    setResponse({
                        success: false,
                        msg: "Invalid credentials!"
                    })
                }
            })
            .catch(e => {
                setResponse({
                    success: false,
                    msg: "An error has occured."
                })
            })
        e.preventDefault();
    }

    return (
        <>
            <div className="Form-container mt-100 pt-80">
                <label className="Form-header">LOGIN</label>
                {!response.status && <span className="f-18 fw-bold fc-red">{response.msg}</span>}
                <form onSubmit={handleSubmit}>
                    <label> Email: </label>
                    <input type="email"
                        id="email" 
                        aria-describedby="emailHelp"
                        value={state.email}
                        required
                        onChange={handleChange} />
                    <label> Password:</label>
                    <input type="password"
                        id="password"
                        value={state.password}
                        required
                        onChange={handleChange} />
                    <input type="submit"
                        className="btn btn-login" 
                        value="LOGIN" />
                </form>
                <span>No account yet? <Link to="/register"><strong>REGISTER HERE</strong></Link></span>
            </div>
        </>
    )
}