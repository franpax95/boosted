import React from 'react';
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

export const ImageInput = ({ name = '', value = null, onChange = undefined }) => (
    <input className="ImageInput" type="file" name={name} />
);

export const SelectInput = ({ name = '', value = '', onChange = undefined, children }) => (
    <select className="SelectInput" name={name} value={value} onChange={onChange}>
        {children}
    </select>
);