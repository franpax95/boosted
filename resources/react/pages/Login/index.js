import React, { useState, useContext } from 'react';
import './Login.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as UserContext } from '../../contexts/UserContext';

import { Link } from 'react-router-dom';

import { Spinner, Fatal } from '../../components/util';
import Form from '../../components/Form';
import { Input, Submit } from '../../components/Input';

import { GiBrutalHelm } from 'react-icons/gi';
import { AiOutlineMail, AiOutlineKey } from 'react-icons/ai';


const Login = () => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Login: txt } = texts;

    /** user state */
    const { loading, error, isAuth, login } = useContext(UserContext);

    /** formData state */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /** event handlers */
    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    const renderForm = () => {
        if(loading) return <Spinner />;
        if(error)   return <Fatal error={error} />;
        if(isAuth)  return <h2 style={{ padding: '5vh 5vw' }}>{txt.success}</h2>

        return(<>
            <h2>{txt.formtitle}</h2>
            <br /><br />
            <Input
                type = 'email'
                name = 'email'
                placeholder = {txt.input.email}
                icon = {<AiOutlineMail />}
                value = {email}
                onChange = {e => setEmail(e.target.value)}
            />
            <br />
            <Input
                type = 'password'
                name = 'password'
                placeholder = {txt.input.password}
                icon = {<AiOutlineKey />}
                value = {password}
                onChange = {e => setPassword(e.target.value)}
            />
            <br /><br />
            <Submit value={txt.input.submit} />
            <br /><br /><br />
            <Link className="link" to="/signup">{txt.link}</Link>
        </>);
    }

    return (
        <div className="Login">
            <Form 
                src = '/util/forms/loginform.jpg'
                icon = {<GiBrutalHelm />}
                title = {txt.title}
                subtitle = {txt.subtitle}
                description = {txt.description}
                onSubmit = {onSubmit}
            >
                {renderForm()}
            </Form>
        </div>
    );
}

export default Login;