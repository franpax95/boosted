import React from 'react';
import './Exercise.css';

const Exercise = ({ name = '', category = { id: -1, name: '' }, description = '', image = null }) => (
    <div className={`Exercise ${(image) ? 'with-img' : ''}`}>
        <div className="name">{name}</div>
        <div className="category">{category.name}</div>
        <div className="description">{description}</div>
        {image && <div className="image"><img src={image} alt={name} /></div>}
    </div>
);

export default Exercise;