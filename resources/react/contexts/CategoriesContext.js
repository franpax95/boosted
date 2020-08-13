import React, { useState } from 'react';
import axios from 'axios';

const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [exercises, setExercises] = useState([]);




    const getCategories = async () => {
        setLoading(true);
        
        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/categories`, config);

            setLoading(false);
            setCategories(response.data.success);
        }catch(error){
            console.error(error);
            setError('Something is wrong. Please, try again later.');
            setLoading(false);
        }
    }

    const getCategory = async (category_id) => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/categories/${category_id}`, config);
            const { category, exercises } = response.data.success;

            setLoading(false);
            setCategory(category);
            setExercises(exercises);
        }catch(error){
            console.error(error);
            setError('Something is wrong. Please, try again later.');
            setLoading(false);
        }
    }

    const submit = async (category) => {
        const isEditing = !!category.id;
        setLoading(true);

        try{
            const token = sessionStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            isEditing
                ? await axios.post(`/api/categories/${category.id}`, category, config)
                : await axios.post(`/api/categories`, category, config);

            setExercises([]);
            setCategory({});
            setCategories([]); 
            setLoading(false);
        }catch{
            setError(error);
            setLoading(false);
        }
    }

    const deleteCategory = async (user_id, cat_id) => {
        setLoading(true);
        try{
            await axios.delete(`/api/categories/${user_id}/${cat_id}`);

            setCategory({});
            setCategories([]);
            setLoading(false);
        }catch(error){
            setError(error);
        }
    }

    const unsetError = () => { 
        setError(''); 
    }

    const cleanCategoryExercises = () => { setExercises([]); }


    const value = {
        loading, error, categories, category, exercises,
        getCategories, getCategory, deleteCategory, submit, unsetError, cleanCategoryExercises
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };