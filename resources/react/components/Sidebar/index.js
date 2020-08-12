import React, { useState, useContext, useRef } from 'react';
import './styles.css';

import { Context as UserContext } from '../../contexts/UserContext';
import { useLanguage } from '../../hooks/useLanguage';

import { useSpring, animated } from 'react-spring';
import { Link, NavLink } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

import { FaRegUser } from 'react-icons/fa';
import { GoThreeBars, GoSignIn, GoSignOut } from 'react-icons/go';



export const RoutineSidebar = ({ exercises = [], onClick, active = -1 }) => (
    <div className="RoutineSidebar">
        {exercises.map((exercise, index) => <button
            key={index}
            onClick={() => onClick(index)}
            className={(active === index) ? 'active' : ''}
        >
            <b>{index + 1}</b>.-{exercise.name}
        </button>)}
    </div>
);



const Sidebar = () => {
    /** lang context */
    const [texts, setLang] = useLanguage();
    const { Navbar: txt } = texts;

    /** user state to display user options (or not) */
    const { isAuth, user, logout } = useContext(UserContext);

    /** ref for Sidebar (necessary to handleClickoutside) */
    const ref = useRef();

    /** onClickOutside */
    Sidebar.handleClickOutside = (e) => { 
        if(!ref.current.contains(e.target)) setDisplay(false);
    }

    /** sidebar transition effect */
    const [display, setDisplay] = useState(false);
    const spring = useSpring({ right: display ? '0' : '-400px' });

    /** onClick effect */
    const onLangClick = lang => {
        setDisplay(false);
        setLang(lang);
    }

    /** logout */
    const localLogOut = async () => {
        logout();
        window.location.reload(false);
    }

    return (<>
        <button className="sidebar-three-bars" onClick={() => setDisplay(true)}>
            <GoThreeBars />
        </button>

        <animated.div className="Sidebar" ref={ref} style={spring}>
            <Link to="/" className="logo" onClick={() => setDisplay(false)}>{txt.home}</Link>

            <NavLink to="/categories" className="main" activeClassName="main active" onClick={() => setDisplay(false)}>{txt.categories}</NavLink>
            <NavLink to="/addcategory" className="sub" activeClassName="sub active" onClick={() => setDisplay(false)}>{txt.addcategory}</NavLink>
            
            <NavLink to="/exercises" className="main" activeClassName="main active" onClick={() => setDisplay(false)}>{txt.exercises}</NavLink>
            <NavLink to="/addexercise" className="sub" activeClassName="sub active" onClick={() => setDisplay(false)}>{txt.addexercise}</NavLink>
            
            <NavLink to="/routines" className="main" activeClassName="main active" onClick={() => setDisplay(false)}>{txt.routines}</NavLink>
            <NavLink to="/addroutine" className="sub" activeClassName="sub active" onClick={() => setDisplay(false)}>{txt.addroutine}</NavLink>

            <br /><br />

            {isAuth
                ? <>
                    <a className="main" href="/profile"><FaRegUser />{user.name}</a>
                    <button className="main" onClick={() => localLogOut()}><GoSignOut />{txt.logout}</button>
                </>
                : <>
                    <a className="main" href="/login"><FaRegUser />{txt.login}</a>
                    <a className="main" href="/register"><GoSignIn />{txt.register}</a>
                </>
            }

            <br /><br />

            <button className="main" onClick={() => onLangClick('esp')}>
                <img src="/util/countryflags/spain.svg" alt={txt.lang.spanish} />
                {txt.lang.spanish}
            </button>
            <button className="main" onClick={() => onLangClick('eng')}>
                <img src="/util/countryflags/unitedkingdom.png" alt={txt.lang.english} />
                {txt.lang.english}
            </button>
        </animated.div>
    </>);
}

const clickOutsideConfig = { handleClickOutside: () => Sidebar.handleClickOutside };
export default onClickOutside(Sidebar, clickOutsideConfig);