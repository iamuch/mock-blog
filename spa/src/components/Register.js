import React, { useState } from "react";
import {
    Link, useHistory,
  } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { AUTHENTICATE, REGISTER } from "../graphql/Mutations";
import { useDispatch } from "react-redux";
import actions from "../actions";

export default function Login() {
    const history = useHistory();

    const [state , setState] = useState({
        email : "",
        password : "",
        passwordConfirmation: ""
    });
    const [response, setResponse] = useState({success: true, msg: ""});

    const dispatch = useDispatch();
    const [register] = useMutation(REGISTER);
    const [authenticate] = useMutation(AUTHENTICATE);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    };

    const validatePasswords = () => {
        let isValid = true;
        if (state.password !== state.passwordConfirmation) {
            isValid = false;
            setResponse({
                success: false,
                msg: "Passwords don't match."
            });
        }
        return isValid;
    }
    
    const handleSubmit = (event) => {
        if (validatePasswords()) {
            register({ variables: { email: state.email, password: state.password}})
            .then(res => {
                authenticate({ variables: { email: state.email, password: state.password}})
                    .then(({data}) => {
                        // login after successful registration
                        if (data.authenticate !== "") {
                            dispatch(actions.auth.login(data.authenticate, {email: state.email}));
                            history.push('/');
                        }
                    });
            })
            .catch(e => {
                setResponse({
                    success: false,
                    msg: "An error has occured."
                });
            })
        }
        event.preventDefault();
    }

    return (
        <>
            <div className="Form-container mt-100 pt-20">
                <label className="Form-header">REGISTER</label>
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
                    <label> Confirm Password:</label>
                    <input type="password"
                        id="passwordConfirmation" 
                        value={state.passwordConfirmation}
                        required
                        onChange={handleChange} />
                    <input type="submit"
                        className="btn btn-login" 
                        value="REGISTER" />
                </form>
                <span>Already have an account? <Link to="/login"><strong>LOGIN HERE</strong></Link></span>
            </div>
        </>
    )
}