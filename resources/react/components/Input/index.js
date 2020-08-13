import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styles.css';

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

export const SelectInput = ({ name = '', value = '', onChange = undefined, children }) => (
    <select className="SelectInput" name={name} value={value} onChange={onChange}>
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
    const filt = (exs, cat_id) => exs.filter(ex => ex.category.id === cat_id);

    const [currentCategoryId, setCurrentCategoryId] = useState(categories.length ? categories[0].id : 0);
    const [currentExercises, setCurrentExercises] = useState(categories.length ? filt(exercises, categories[0].id) : []);

    useLayoutEffect(() => {
        setCurrentExercises(filt(exercises, currentCategoryId));
    }, [currentCategoryId]);



    const onChange = e => {
        const newFormExercises = [
            ...formExercises.slice(0, index),
            { ...formExercises[index], [e.target.name]: Number(e.target.value) },
            ...formExercises.slice(index+1, formExercises.length)
        ];
        // newFormExercises[index] = { ...formExercises[index], [e.target.name]: Number(e.target.value) };
        setFormExercises(newFormExercises);
    }

    return (
        <div className="ExerciseInput">
            <SelectInput name="category_id" value={currentCategoryId} onChange={e => setCurrentCategoryId(Number(e.target.value))}>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </SelectInput>

            <SelectInput name="id" value={formExercises[index].id} onChange={onChange}>
                {currentExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </SelectInput>

            <input 
                type="number"
                name="nRep" 
                value={formExercises[index].nRep}
                onChange={onChange}
                min={0}
            />

            <input 
                type="number"
                name="tOn" 
                value={formExercises[index].tOn}
                onChange={onChange}
                min={0}
            />

            <input 
                type="number"
                name="tOff" 
                value={formExercises[index].tOff}
                onChange={onChange}
                min={0}
            />
        </div>
    );
}