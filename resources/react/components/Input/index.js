import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styles.css';

import { useLanguage } from '../../hooks/useLanguage';

import { animated, useSpring } from 'react-spring';

export const Input = ({
    type = 'text',
    name = '',
    placeholder = 'Input',
    icon = '',
    value = '',
    onChange = undefined
}) => (
    <div className="Input">
        <div className="icon">{icon}</div>
        <input
            type = {type}
            name = {name}
            placeholder = {placeholder}
            value = {value}
            onChange = {onChange}
        />
    </div>
);

export const Submit = ({ value = '' }) => <input type="submit" className="Submit" value={value} />;

export const TextArea = ({ name = '', placeholder = '', value = '', onChange = undefined }) => (
    <textarea className="TextArea" placeholder={placeholder} name={name} value={value} onChange={onChange}></textarea>
);

export const ImageInput = ({ name = '', onChange = undefined }) => (
    <input className="ImageInput" type="file" name={name} onChange={onChange} />
);

export const SelectInput = ({ name = '', value = '', size = '', onChange = undefined, children }) => (
    <select className={`SelectInput ${size}`} name={name} value={value} onChange={onChange}>
        {children}
    </select>
);

export const NumberInput = ({ name = '', value = '', onChange = undefined }) => (
    <input className="NumberInput" type="number" name={name} value={value} onChange={() => onChange} />
);

export const ExerciseInput = ({ 
    index = 0,
    exercises = [],
    categories = [],
    formExercises,
    setFormExercises
}) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { General: txt } = texts;

    
    /** filt exercises by category */
    const filt = (exs, cat_id) => exs.filter(ex => ex.category.id === cat_id);

    /** select states */
    const [currentCategoryId, setCurrentCategoryId] = useState(categories.length ? categories[0].id : 0);
    const [currentExercises, setCurrentExercises] = useState(categories.length ? filt(exercises, categories[0].id) : []);

    /** select update render */
    useLayoutEffect(() => {
        const currExs = filt(exercises, currentCategoryId);
        setCurrentExercises(currExs);
        const newFormExercises = [
            ...formExercises.slice(0, index),
            { ...formExercises[index], id: currExs[0].id },
            ...formExercises.slice(index+1, formExercises.length)
        ];
        setFormExercises(newFormExercises);
    }, [currentCategoryId]);

    const onChange = e => {
        const newFormExercises = [
            ...formExercises.slice(0, index),
            { ...formExercises[index], [e.target.name]: Number(e.target.value) },
            ...formExercises.slice(index+1, formExercises.length)
        ];
        setFormExercises(newFormExercises);
    }

    /** opacity transition effect */
    const spring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 400 }
    });

    return (
        <animated.div className="ExerciseInput" style={spring}>
            <SelectInput name="category_id" value={currentCategoryId} onChange={e => setCurrentCategoryId(Number(e.target.value))} size='small'>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </SelectInput>

            <SelectInput name="id" value={formExercises[index].id} onChange={onChange} size='small'>
                {currentExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </SelectInput>

            <span>{txt.nRep}</span>
            <input type="number" className="NumberInput" name="nRep" value={formExercises[index].nRep} onChange={onChange} min={0} />
            <span>{txt.tOn}</span>
            <input type="number" className="NumberInput" name="tOn" value={formExercises[index].tOn} onChange={onChange} min={0} />
            <span>{txt.tOff}</span>
            <input type="number" className="NumberInput" name="tOff" value={formExercises[index].tOff} onChange={onChange} min={0} />
        </animated.div>
    );
}