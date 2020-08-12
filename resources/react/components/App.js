import React, { useContext, useEffect } from 'react';
import './App.css';

import { useInnerWidth } from '../hooks/useInnerWidth';
import { Context as UserContext } from '../contexts/UserContext';

import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useTransition, animated, config } from 'react-spring';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Categories from '../pages/Categories';
import CategoriesForm from '../pages/CategoriesForm';
import Exercises from '../pages/Exercises';
import ExercisesForm from '../pages/ExercisesForm';
import Routines from '../pages/Routines';
import RoutinesForm from '../pages/RoutinesForm';
import NotFound from '../pages/NotFound';



const AuthRoute = ({ path, component, isAuth }) => isAuth
    ? <Route exact path={path} component={component} />
    : <Redirect to="/login" />


const App = () => {
    /** window width state */
    const width = useInnerWidth();

    /** user state */
    const { isAuth, user, getUserDetails } = useContext(UserContext);
    
    /** transition between routes */
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, position: 'absolute' },
        enter: { opacity: 1 },
        update: { opacity: 1 },
        leave: { opacity: 0 },
        // config: config.molasses,
        config: { duration: 300 }
    });

    /** get user if session active */
    useEffect(() => {
        if(isAuth && !Object.values(user).length) 
            getUserDetails();
    }, []);


    return (<>
        {(width > 768) ? <Navbar /> : <Sidebar />}
        
        {transitions.map(({ item: location, props, key }) => (
            <animated.div key={key} style={{ ...props, width: '100%', height: '100%' }}>
                <div className="App">
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <AuthRoute exact path={["/category/add", "/category/edit/:id"]} component={CategoriesForm} isAuth={isAuth} />
                        <AuthRoute exact path={["/categories", "/categories/:id"]} component={Categories} isAuth={isAuth} />
                        <AuthRoute exact path={["/exercise/add", "/exercise/edit/:id"]} component={ExercisesForm} isAuth={isAuth} />
                        <AuthRoute exact path={["/exercises", "/exercises/:id"]} component={Exercises} isAuth={isAuth} />
                        <AuthRoute exact path={["/routine/add", "/routine/edit/:id"]} component={RoutinesForm} isAuth={isAuth} />
                        <AuthRoute exact path={["/routines", "/routines/:id"]} component={Routines} isAuth={isAuth} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </animated.div>
        ))}
    </>);
}

export default App;