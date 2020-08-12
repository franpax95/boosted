import React, { useState } from 'react';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [exercise, setExercise] = useState({});
    const [exercises, setExercises] = useState([]);

    const getExercises = async () => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/exercises`, config);

            setLoading(false);
            setExercises(response.data.success);
        }
        catch(error){
            console.error(error);
            setError('Something is wrong. Please, try again later.');
            setLoading(false);
        }
    }

    const getExercise = async (exercise_id) => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/exercises/${exercise_id}`, config);

            setLoading(false);
            setExercise(response.data.success);
        }
        catch(error){
            console.error(error);
            setError('Something is wrong. Please, try again later.');
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
        if(exercise.image !== null)
            formDataSubmit.append('image', exercise.image);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            isEditing
                ? await axios.post(`/api/exercises/${formData.id}`, formDataSubmit, config)
                : await axios.post(`/api/exercises`, formDataSubmit, config);
        
            setExercises([]);
            setLoading(false);  
        }catch{
            setError(error);
            setLoading(false);
        }
    }

    const unsetError = () => { 
        setError(''); 
    }




    const value = {
        loading, error, exercise, exercises,
        getExercises, getExercise, submit, unsetError,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };