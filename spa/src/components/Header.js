import {
    Link,
  } from "react-router-dom";

import { useHistory } from 'react-router';

import logo from '../images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';

export default function Header(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(actions.auth.logout());
        history.push(`/`);
    }

    const isAuthenticated = useSelector(state => state.auth.authenticated);
    return (
        <div className="App-header">
            <div className="App-logo cursor-pointer"><Link to="/"><img alt="" src={logo} /></Link></div>
            <div className="App-btn-header">
            {isAuthenticated && <div onClick={handleSubmit}>LOGOUT</div>}
            {!isAuthenticated && props.path === "/" && <Link to="/login">LOGIN</Link>}
            {!isAuthenticated && (props.path === "/login" || props.path === "/register") && <Link to="/">CLOSE</Link>}
            </div>
        </div>
    )
}