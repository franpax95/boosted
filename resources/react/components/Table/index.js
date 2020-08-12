import React, { useState } from 'react';
import './styles.css';

import { useLanguage } from '../../hooks/useLanguage';

import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { FaPlayCircle, FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';



export const CategoriesTable = ({ categories = [], deleteCategory = undefined }) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { General: txt } = texts;

    return (
        <div className="Table CategoriesTable">
            {categories.map(category => (
                <div className="element" key={category.id}>
                    <Link to={`/categories/${category.id}`} className="main">{category.name}</Link>
                    <Link to={`/category/edit/${category.id}`} className="edit">{txt.edit}</Link>
                    <button className="delete" onClick={() => deleteCategory()}>{txt.delete}</button>
                </div>
            ))}
        </div>
    );
}



export const ExercisesTable = ({ exercises = [], deleteExercise = undefined }) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { General: txt } = texts;

    return (
        <div className="Table ExercisesTable">
            {exercises.map(exercise => (
                <div className="element" key={exercise.id}>
                    <Link to={`/exercises/${exercise.id}`} className="main">
                        <div className="img">{exercise.image && <img src={exercise.image} alt={exercise.name} />}</div>
                        <div className="name">
                            {exercise.name}
                            {(exercise.category) && <div className="cat">{exercise.category.name}</div>}
                        </div>
                    </Link>

                    <Link to={`/exercise/edit/${exercise.id}`} className="edit">{txt.edit}</Link>
                    <button className="delete" onClick={() => deleteExercise()}>{txt.delete}</button>
                </div>
            ))}
        </div>
    );
}



const RoutinesElement = ({ id, name, description, onDelete }) => {
    /** totalHeight = initialHeight + expandedHeight */
    const initialHeight = '100px';
    const totalHeight = '350px';
    const expandHeight = `${parseInt(totalHeight) - parseInt(initialHeight)}px`; //250px

    /** expandHeight = descriptionHeight + buttonsHeight */
    const descriptionHeight = '150px';
    const buttonsHeight = `${parseInt(expandHeight) - parseInt(descriptionHeight)}px`; //250px


    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { General: txt } = texts;

    /** spring config */
    const [display, setDisplay] = useState(false);
    const spring = useSpring({ 
        height: display ? totalHeight : initialHeight,
        config: { duration: 500 }
    });

    return (
        <animated.div className="RoutinesElement" style={spring}>
            <div className="header" style={{ height: initialHeight }} onClick={() => setDisplay(!display)}>{name}</div>
            <div className="body" style={{ height: expandHeight }}>
                <div className="description" style={{ height: descriptionHeight }}>{description}</div>
                <div className="buttons" style={{ height: buttonsHeight }}>
                    <Link to={`/routines/${id}`} className="start"><FaPlayCircle />{txt.start}</Link>
                    <Link to={`/routine/edit/${id}`} className="edit"><FaEdit />{txt.edit}</Link>
                    <button className="delete" onClick={() => onDelete()}><TiDelete />{txt.delete}</button>
                </div>
            </div>
        </animated.div>
    );
}

export const RoutinesTable = ({ routines = [], deleteRoutine = undefined }) => (
    <div className="RoutinesTable">
        {routines.map(routine => <RoutinesElement key={routine.id} {...routine} onDelete={deleteRoutine} />)}
    </div>
);