import React, { useContext, useState } from 'react';
import './Navbar.css';

import { Context as UserContext } from '../../contexts/UserContext';
import { useLanguage } from '../../hooks/useLanguage';

import { useTransition, animated } from 'react-spring';
import { Link, NavLink } from 'react-router-dom';

import { FaRegUser } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';



const Dropdown = ({ name = "", to = "", children }) => {
    const [display, setDisplay] = useState(false);

    const transition = useTransition(display, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200 }
    });

    return (
        <div className="Dropdown" onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
            {to.length
                ? <NavLink to={to} className="header" activeClassName="header active">{name}</NavLink>
                : <div className="header">
                    {name} {display ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </div>
            }

            {display && transition.map(({ item, key, props }) => (
                item && <animated.div className="content" key={key} style={props}>
                    {children}
                </animated.div>
            ))}
        </div>
    );
}


const Navbar = () => {
    /** user state to display user options (or not) */
    const { isAuth, user, logout } = useContext(UserContext);

    /** lang context */
    const [texts, setLang] = useLanguage();
    const { Navbar: txt } = texts;

    return (
        <div className="Navbar">
            <div className="left">
                <Link to="/" className="logo">{txt.home}</Link>
                <Dropdown to="/categories" name={txt.categories}>
                    <Link to="/category/add">{txt.addcategory}</Link>
                </Dropdown>
                <Dropdown to="/exercises" name={txt.exercises}>
                    <Link to="/exercise/add">{txt.addexercise}</Link>
                </Dropdown>
                <Dropdown to="/routines" name={txt.routines}>
                    <Link to="/routine/add">{txt.addroutine}</Link>
                </Dropdown>
            </div>

            <div className="right">
                {isAuth
                    ? <>
                        <Link className="user" to="/profile"><FaRegUser />{user.name}</Link>
                        <button className="user" onClick={() => logout()}><GoSignOut />{txt.logout}</button>
                    </>
                    : <>
                        <Link className="user" to="/login"><FaRegUser />{txt.login}</Link>
                        <Link className="user" to="/signup"><GoSignIn />{txt.signup}</Link>
                    </>
                }

                <Dropdown name={<MdLanguage size="30px" />}>
                    <button onClick={() => setLang('esp')}>
                        <img src="/util/countryflags/spain.svg" alt={txt.lang.spanish} />
                        {txt.lang.spanish}
                    </button>
                    <button onClick={() => setLang('eng')}>
                        <img src="/util/countryflags/unitedkingdom.png" alt={txt.lang.english} />
                        {txt.lang.english}
                    </button>
                </Dropdown>
            </div>
        </div>
    );
}

export default Navbar;