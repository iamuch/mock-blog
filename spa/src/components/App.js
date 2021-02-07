import '.././css/App.css';
import '.././css/Common.css';
import '.././css/Banner.css';

import Header from './Header';
import Banner from './Banner';
import NewsList from './NewsList';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ViewPost from './ViewPost';
import AddPost from './AddPost';
import EditPost from './EditPost';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route render={({ location }) => {
            const { pathname, key } = location;
            let applyTransition = false;
            if (pathname === "/login" || pathname === "/register") {
              applyTransition = true;
            }
            return (
              <>
                <Header path={pathname}></Header>
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={key}
                    timeout={applyTransition ? 300 : 0}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    classNames={applyTransition ? 'slide' : ''}
                  >
                    <Switch location={location}>
                      <Route exact path="/" component={Banner} />
                      <Route restricted={true} component={Login} path="/login"/>
                      <Route path="/register" component={Register} />
                      <Route path="/post/view/:id" component={ViewPost} />
                      <Route path="/post/create" component={AddPost} />
                      <Route path="/post/edit/:id" component={EditPost} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
                {(function() {
                  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
                    return <NewsList/>;
                  }
                })()}
              </>
            )
          }}/>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
