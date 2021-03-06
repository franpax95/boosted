import React, { useState, useContext } from 'react';
import './SignUp.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as UserContext } from '../../contexts/UserContext';

import { Link } from 'react-router-dom';

import { Spinner, Fatal } from '../../components/util';
import Form from '../../components/Form';
import { Input, Submit } from '../../components/Input';

import { GiSwordwoman } from 'react-icons/gi';
import { AiOutlineUser, AiOutlineMail, AiOutlineKey } from 'react-icons/ai';


const SignUp = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { SignUp: txt } = texts;

    /** user state */
    const { loading, error, isAuth, signup } = useContext(UserContext);

    /** formData state */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    /** event handlers */
    const onSubmit = (e) => {
        e.preventDefault();
        signup(name, email, password, repassword);
    }

    const renderForm = () => {
        if(loading) return <Spinner />;
        if(error)   return <Fatal error={error} />;
        if(isAuth)  return <h2 style={{ padding: '5vh 5vw' }}>{txt.success}</h2>
        return (<>
            <h2>{txt.formtitle}</h2>

            <br /><br />

            <Input
                type = 'text'
                name = 'name'
                placeholder = {txt.input.name}
                icon = {<AiOutlineUser />}
                value = {name}
                onChange = {e => setName(e.target.value)}
            />

            <br />

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

            <br />

            <Input
                type = 'password'
                name = 'repassword'
                placeholder = {txt.input.repassword}
                icon = {<AiOutlineKey />}
                value = {repassword}
                onChange = {e => setRepassword(e.target.value)}
            />

            <br /><br />

            <Submit value={txt.input.submit} />

            <br /><br /><br />

            <Link className="link" to="/login">{txt.link}</Link>
        </>)
    }

    return (
        <div className="SignUp">
            <Form 
                src = '/util/forms/signupform.jpg'
                icon = {<GiSwordwoman />}
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

export default SignUp;