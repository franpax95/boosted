import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context as UserContext } from './UserContext';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [exercise, setExercise] = useState({});
    const [exercises, setExercises] = useState([]);

    const { token } = useContext(UserContext);
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });

    const getExercises = async () => {
        setLoading(true);

        try{
            const response = await axios.get(`/api/exercises`, config());

            setLoading(false);
            setExercises(response.data.success);
        }
        catch(error){
            console.error(error);
            //setError('Something is wrong. Please, try again later.');
            setError(error.response.data.error);
            setLoading(false);
        }
    }

    const getExercise = async (exercise_id) => {
        setLoading(true);

        try{
            const response = await axios.get(`/api/exercises/${exercise_id}`, config());

            setLoading(false);
            setExercise(response.data.success);
        }
        catch(error){
            console.error(error);
            //setError('Something is wrong. Please, try again later.');
            setError(error.response.data.error);
            setLoading(false);
        }
    }

    const submit = async (exercise) => {
        const isEditing = !!exercise.id;
        setLoading(true);

        const formDataSubmit = new FormData();
        formDataSubmit.append('name', exercise.name);
        formDataSubmit.append('category_id', Number(exercise.category_id));
        formDataSubmit.append('description', exercise.description);
        if(exercise.image !== null && exercise.image instanceof File)
            formDataSubmit.append('image', exercise.image);

        try{
            isEditing
                ? await axios.post(`/api/exercises/${exercise.id}`, formDataSubmit, config())
                : await axios.post(`/api/exercises`, formDataSubmit, config());
        
            setExercise({});
            setExercises([]);
            setLoading(false);  
        }catch{
            setError(error);
            setLoading(false);
        }
    }

    const deleteExercise = async (id) => {
        setLoading(true);

        try{
            await axios.delete(`/api/exercises/${id}`, config());
            setLoading(false);

            setExercise({});
            setExercises([]);
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }

    const unsetError = () => { setError(''); }

    const cleanExercises = () => { if(exercises.length) setExercises([]); }




    const value = {
        loading, error, exercise, exercises,
        getExercises, getExercise, submit, deleteExercise, unsetError, cleanExercises
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };