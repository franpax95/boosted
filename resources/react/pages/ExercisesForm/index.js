import React, { useState, useContext, useEffect } from 'react';
import './ExercisesForm.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as CategoriesContext } from '../../contexts/CategoriesContext';
import { Context as ExercisesContext } from '../../contexts/ExercisesContext';

import { Prompt, Redirect } from 'react-router-dom';

import { Spinner, Fatal, Layout } from '../../components/util';
import Form from '../../components/Form';
import { Input, Submit, TextArea, ImageInput, SelectInput } from '../../components/Input';

import { GiBiceps, GiAncientScrew } from 'react-icons/gi';


const ExercisesForm = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { ExercisesForm: txt } = texts;

    /** rest id by url */
    const { id: ex_id } = props.match.params;

    /** categories state */
    const { 
        loading: cat_loading, error: cat_error, categories, 
        getCategories, unsetError: unsetCatError, cleanCategoryExercises
    } = useContext(CategoriesContext);

    /** exercises state */
    const { 
        loading, error, exercise, 
        getExercise, unsetError, submit
    } = useContext(ExercisesContext);

    /** form data */
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories.length ? categories[0].id : 0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    /** to redirect when submitting is ok */
    const [success, setSuccess] = useState(false);

    /** componentDidMount effect (fetching categories) */
    useEffect(() => {
        if(cat_error) unsetCatError();

        const fetchData = async () => {
            if(!categories.length) await getCategories();
        }
        fetchData();
    }, []);

    /** componentDidUpdate effect (fetching exercise form data if edit) */
    useEffect(() => {
        if(error) unsetError();

        const fetchData = async () => {
            /** fetch form data for editting */
            if(ex_id && (!Object.values(exercise).length || ex_id !== exercise.id) && !loading)
                await getExercise(ex_id);
            /** reset form data */
            else {
                setName('');
                setCategoryId(categories.length ? categories[0].id : 0);
                setDescription('');
                setImage(null);
            }
        }
        fetchData();
    }, [ex_id]);

    /** set input values effect when exercise update cause of fetch effect */
    useEffect(() => {
        if(ex_id && Object.values(exercise).length){
            setName(exercise.name);
            setCategoryId(exercise.category.id);
            setDescription(exercise.description);
        }
    }, [exercise]);


    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, categoryId, description, image);

        let ex;
        if(ex_id) ex = { id: ex_id, name, category_id: categoryId, description, image };
        else ex = { name, category_id: categoryId, description, image };

        await submit(ex);
        if(!error && !loading) {
            setSuccess(true);
            cleanCategoryExercises();
        }
    }



    const renderForm = () => {
        if(success)     return <Redirect to='/exercises' />;
        if(loading)     return <Spinner />;
        if(error)       return <Fatal error={error} />;
        if(cat_error)   return <Fatal error={cat_error} />;

        return(<>
            <Input
                type = 'text'
                name = 'name'
                placeholder = {txt.input.name}
                icon = {<GiAncientScrew />}
                value = {name}
                onChange = {e => setName(e.target.value)}
            />
            <br />
            {cat_loading
                ? <Spinner size='24px' />
                : <SelectInput name="categoryId" onChange={e => setCategoryId(Number(e.target.value))} value={categoryId}>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </SelectInput>
            }
            <br />
            <TextArea name='description' placeholder={txt.input.description} value={description} onChange={e => setDescription(e.target.value)} />
            <br />
            <ImageInput type="file" name="image" onChange={e => setImage(e.target.files[0])} />
            <br /><br />
            <Submit value={txt.input.submit} />
        </>);
    }

    return (
        <Layout className="ExercisesForm" title={ex_id ? `${txt.title[1]}: ${exercise.name}` : txt.title[0]}>
            <Prompt
                when={!!name.length && !success}
                message={txt.prompt.name}
            />
            
            <Form 
                src = '/util/forms/exercisesform.jpg'
                icon = {<GiBiceps />}
                title = {ex_id ? txt.edit.title : txt.add.title}
                subtitle = {ex_id ? txt.edit.subtitle : txt.add.subtitle}
                description = {ex_id ? txt.edit.description : txt.add.description}
                onSubmit = {onSubmit}
            >
                {renderForm()}
            </Form>
        </Layout>
    );
}

export default ExercisesForm;