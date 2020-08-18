import React, { useState, useContext, useEffect } from 'react';
import './RoutinesForm.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as CategoriesContext } from '../../contexts/CategoriesContext';
import { Context as ExercisesContext } from '../../contexts/ExercisesContext';
import { Context as RoutinesContext } from '../../contexts/RoutinesContext';

import { Prompt, Redirect } from 'react-router-dom';

import { Spinner, Fatal } from '../../components/util';
import { RoutineForm } from '../../components/Form';
import { Input, Submit, TextArea, ExerciseInput } from '../../components/Input';

import { GiBattleMech } from 'react-icons/gi';



const RoutinesForm = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { RoutinesForm: txt } = texts;

    /** rest id by url */
    const { id: rout_id } = props.match.params;

    /** categories state */
    const { 
        loading: cat_loading, error: cat_error, categories, 
        getCategories, unsetError: unsetCatError
    } = useContext(CategoriesContext);

    /** exercises state */
    const { 
        loading: ex_loading, error: ex_error, exercises, 
        getExercises, unsetError: unsetExError
    } = useContext(ExercisesContext);

    /** routines state */
    const {
        loading, error, routine,
        getRoutine, submit, unsetError
    } = useContext(RoutinesContext);

    /** form data */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formExercises, setFormExercises] = useState([]);

    /** to redirect when submitting is ok */
    const [success, setSuccess] = useState(false);

    /** componentDidMount effect (fetching categories & exercises) */
    useEffect(() => {
        if(cat_error) unsetCatError();
        if(ex_error) unsetExError();

        const fetchData = async () => {
            if(!categories.length) await getCategories();
            if(!exercises.length) await getExercises();
        }
        fetchData();
    }, []);

    /** componentDidUpdate effect (fetching exercise form data if edit) */
    useEffect(() => {
        if(error) unsetError();

        const fetchData = async () => {
            /** fetch form data for editting */
            if(rout_id && (!Object.values(routine).length || rout_id !== routine.id) && !loading)
                await getRoutine(rout_id);
            /** reset form data */
            else {
                setName('');
                setDescription('');
                setFormExercises([]);
            }
        }
        fetchData();
    }, [rout_id]);

    /** set input values effect when routine update cause of fetch effect */
    useEffect(() => {
        if(rout_id && Object.values(routine).length){
            setName(routine.name);
            setDescription(routine.description);
            console.log('ROUTINE EXERCISES', routine.exercises);
            setFormExercises(routine.exercises);
        }
    }, [routine]);


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(name, description, formExercises);

        let newRoutine;
        if(rout_id) newRoutine = { id: rout_id, name, description, exercises: formExercises };
        else newRoutine = { name, description, exercises: formExercises };

        await submit(newRoutine);
        if(!error && !loading) setSuccess(true);
    }

    const addFormExercise = e => {
        e.preventDefault();
        const newFormExercises = formExercises.concat({ id: 0, nRep: 0, tOn: 0, tOff: 0 })
        setFormExercises(newFormExercises);
    }

    const renderForm = () => {
        if(success)     return <Redirect to='/routines' />;
        if(loading)     return <Spinner />;
        if(error)       return <Fatal error={error} />;
        if(cat_error)   return <Fatal error={cat_error} />;
        if(ex_error)    return <Fatal error={ex_error} />;

        return(<>
            <Input
                type = 'text'
                name = 'name'
                placeholder = {txt.input.name}
                icon = {<GiBattleMech />}
                value = {name}
                onChange = {e => setName(e.target.value)}
            />
            <br />
            <TextArea name='description' placeholder={txt.input.description} value={description} onChange={e => setDescription(e.target.value)} />
            <br />
            <button className="add-form-exercise" onClick={addFormExercise}>Añadir form exercise</button>
            <br />
            {formExercises.map((formExercise, index) => (
                <ExerciseInput key={index} index={index} exercises={exercises} categories={categories} formExercises={formExercises} setFormExercises={setFormExercises} />
            ))}
            <br /><br />
            <Submit value={txt.input.submit} />
        </>);
    }

    return(
        <div className="RoutinesForm">
            {/* <Prompt
                when={!!name.length && !success}
                message={txt.prompt.name}
            /> */}
            
            <RoutineForm 
                src = '/util/forms/routinesform.jpg'
                title = {rout_id ? txt.edit.title : txt.add.title}
                description = {rout_id ? txt.edit.description : txt.add.description}
                onSubmit = {onSubmit}
            >
                <h2>{rout_id ? `${txt.title[1]}: ${routine.name}` : txt.title[0]}</h2>
                <br /><br />
                {renderForm()}
            </RoutineForm>
        </div>
    );
}

export default RoutinesForm;