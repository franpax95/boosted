import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context as UserContext } from './UserContext';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);


    const { token } = useContext(UserContext);
    const config = () => ({ headers: { Authorization: `Bearer ${token()}` } });




    const getCategories = async () => {
        setLoading(true);
        
        try{
            const response = await axios.get(`/api/categories`, config());

            setLoading(false);
            setCategories(response.data.success);
        }catch(error){
            console.error(error);
            //setError('Something is wrong. Please, try again later.');
            setError(error.response.data.error);
            setLoading(false);
        }
    }

    const getCategory = async (category_id) => {
        setLoading(true);

        try{
            const response = await axios.get(`/api/categories/${category_id}`, config());
            const { category, exercises } = response.data.success;

            setLoading(false);
            setCategory(category);
            setExercises(exercises);
        }catch(error){
            console.error(error);
            //setError('Something is wrong. Please, try again later.');
            setError(error.response.data.error);
            setLoading(false);
        }
    }

    const submit = async category => {
        const isEditing = !!category.id;
        setLoading(true);

        try{

            isEditing
                ? await axios.post(`/api/categories/${category.id}`, category, config())
                : await axios.post(`/api/categories`, category, config);

            setExercises([]);
            setCategory({});
            setCategories([]); 
            setLoading(false);
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }

    const deleteCategory = async (id) => {
        setLoading(true);

        try{
            await axios.delete(`/api/categories/${id}`, config());
            setLoading(false);

            setCategories([]);
            setCategory({});
            setExercises([]);
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }

    const unsetError = () => { setError(''); }

    const cleanCategoryExercises = () => { if(exercises.length) setExercises([]); }
    const cleanCategory = () => { if(Object.values(category).length) setCategory({}); }





    const value = {
        loading, error, categories, category, exercises,
        getCategories, getCategory, deleteCategory, submit,
        unsetError, cleanCategoryExercises, cleanCategory
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };