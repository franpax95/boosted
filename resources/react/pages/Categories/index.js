import React, { useContext, useEffect } from 'react';
import './Categories.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as CategoriesContext } from '../../contexts/CategoriesContext';

import { Spinner, Fatal, Layout, UtilWrapper } from '../../components/util';
import { CategoriesTable, ExercisesTable } from '../../components/Table';


const Categories = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Categories: txt } = texts;

    /** categories state */
    const { 
        loading, error,
        categories, category, exercises, 
        getCategories, getCategory, deleteCategory, unsetError
    } = useContext(CategoriesContext);

    /** rest id by url */
    const { id: cat_id } = props.match.params;


    /* fetchData effect */
    useEffect(() => {
        if(error) unsetError();

        const fetchData = async () => {
            /* get all categories */
            if(!cat_id && !categories.length && !loading && !error)
                await getCategories();

            /* get single category */
            if(cat_id && (!exercises.length || category.id != cat_id) && !loading && !error) 
                await getCategory(cat_id);
        }

        fetchData();
    }, [categories, cat_id]);


    if(error)   return <UtilWrapper><Fatal error={error} /></UtilWrapper>;
    if(loading) return <UtilWrapper><Spinner /></UtilWrapper>;
    return (
        <Layout className="Categories" title={cat_id ? `${txt.title[1]}: ${category.name}` : txt.title[0]}>
            {cat_id 
                ? <ExercisesTable exercises={exercises} /> 
                : <CategoriesTable categories={categories} />
            }
        </Layout>
    );
}

export default Categories;