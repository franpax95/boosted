import React, { useState } from 'react';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [routine, setRoutine] = useState({});
    const [routines, setRoutines] = useState([]);
    const [exercises, setExercises] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        exercises: []
    });
    const [goBack, setGoBack] = useState(false);



    const getRoutines = async () => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/routines`, config);

            setLoading(false);

            const { success } = response.data;
            if(Array.isArray(success))  setRoutines(success);
        }
        catch(error){
            console.error(error);
            // console.log(typeof(error));
            // console.log(Object.values(error));
            setError('Something is wrong. Please, try again later.');
            setLoading(false);
        }
        finally{ 
            setGoBack(false);
        }
    }

    const getRoutine = async (routine_id) => {
        setLoading(true);
        
        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/routines/${routine_id}`, config);
            
            setLoading(false);
            setRoutine(response.data.success.routine);
            setExercises(response.data.success.exercises);
        }
        catch(error){ 
            console.error(error);
            // console.log(typeof(error));
            // console.log(Object.values(error));
            // setError('Something is wrong. Please, try again later.'); 
            setError(Object.values(error)[2].data.error);
            setLoading(false);
        }
    }

    const sendFormData = async (user_id) => {
        setLoading(true);
        try{
            await axios.post(`/api/routines/${user_id}`, formData);
            setLoading(false);    
            setExercises([]);
            setGoBack(true);
            resetFormData();
        }
        catch(error){ setError(error); }
    }

    const resetFormData = () => {
        setFormData({
            name: '',
            description: '',
            exercises: []
        });
    }

    const unsetError = () => { setError(''); }


    const value = {
        loading, error, routine, routines, exercises, formData, goBack,
        getRoutine, getRoutines, setFormData, sendFormData, resetFormData, unsetError
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };