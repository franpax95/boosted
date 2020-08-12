import React, { useContext, useEffect } from 'react';
import './Exercises.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as ExercisesContext } from '../../contexts/ExercisesContext';

import { Spinner, Fatal, Layout, UtilWrapper } from '../../components/util';
import { ExercisesTable } from '../../components/Table';
import Exercise from '../../components/Exercise';



const Exercises = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Exercises: txt } = texts;

    /** exercises state */
    const { 
        loading, error, 
        exercises, exercise, 
        getExercises, getExercise
    } = useContext(ExercisesContext);

    /** rest id by url */
    const { id: ex_id } = props.match.params;

    /* fetchData effect */
    useEffect(() => {
        const fetchData = async () => {
            /* get all exercoses */
            if(!ex_id && !exercises.length && !loading && !error)
                await getExercises();

            /* get single exercise */
            if(ex_id && (!Object.values(exercise).length || exercise.id != ex_id) && !loading && !error) 
                await getExercise(ex_id);
        }

        fetchData();
    }, [exercises, ex_id]);



    if(loading) return <UtilWrapper><Spinner /></UtilWrapper>;
    if(error)   return <UtilWrapper><Fatal error={error} /></UtilWrapper>;
    return (
        <Layout className="Exercises" title={ex_id ? `${txt.title[1]}: ${exercise.name}` : txt.title[0]}>
            {ex_id 
                ? <Exercise {...exercise} /> 
                : <ExercisesTable exercises={exercises} />
            }
        </Layout>
    );
}

export default Exercises;