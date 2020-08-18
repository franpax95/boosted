import React, { useState, useContext, useEffect } from 'react';
import './CategoriesForm.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as CategoriesContext } from '../../contexts/CategoriesContext';

import { Prompt, Redirect } from 'react-router-dom';

import { Spinner, Fatal, Layout } from '../../components/util';
import Form from '../../components/Form';
import { Input, Submit } from '../../components/Input';

import { GiRunningNinja, GiCatch } from 'react-icons/gi';


const CategoriesForm = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { CategoriesForm: txt } = texts;

    /** rest id by url */
    const { id: cat_id } = props.match.params;

    /** categories state */
    const { 
        loading, error, category, 
        getCategory, unsetError, submit
    } = useContext(CategoriesContext);

    /** form data */
    const [name, setName] = useState('');

    /** to redirect when submitting is ok */
    const [success, setSuccess] = useState(false);

    /** fetchData effect */
    useEffect(() => {
        if(error) unsetError();

        const fetchData = async () => {
            /** fetch form data for editting */
            if(cat_id && (!Object.values(category).length || cat_id !== category.id) && !loading)
                await getCategory(cat_id);

            /** reset form data */
            else setName('');
        }
        fetchData();
    }, [cat_id]);

    /** set input values effect when category update cause of fetch effect */
    useEffect(() => {
        if(cat_id && Object.values(category).length) 
            setName(`${category.name}`);
    }, [category]);

    const validateFormData = () => {
        if(!name.length) alert(txt.validate.name)

        else  return true;

        return false;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if(validateFormData()){
            let cat;
            if(cat_id) cat = { id: cat_id, name };
            else cat = { name };

            await submit(cat);
            if(!error && !loading) setSuccess(true);
        }
    }



    const renderForm = () => {
        if(success) return <Redirect to='/categories' />;
        if(loading) return <Spinner />;
        if(error)   return <Fatal error={error} />;

        return(<>
            <Input
                type = 'text'
                name = 'name'
                placeholder = {txt.input.name}
                icon = {<GiCatch />}
                value = {name}
                onChange = {e => setName(e.target.value)}
            />
            <br /><br />
            <Submit value={txt.input.submit} />
        </>);
    }

    return (
        <Layout className="CategoriesForm" title={cat_id ? `${txt.title[1]}: ${category.name}` : txt.title[0]}>
            <Prompt
                when={!!name.length && !success}
                message={txt.prompt.name}
            />
            
            <Form 
                src = '/util/forms/categoriesform.jpg'
                icon = {<GiRunningNinja />}
                title = {cat_id ? txt.edit.title : txt.add.title}
                subtitle = {cat_id ? txt.edit.subtitle : txt.add.subtitle}
                description = {cat_id ? txt.edit.description : txt.add.description}
                onSubmit = {onSubmit}
            >
                {renderForm()}
            </Form>
        </Layout>
    );
}

export default CategoriesForm;