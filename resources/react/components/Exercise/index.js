import React from 'react';
import './Exercise.css';

import Img from 'react-cool-img';
import spinner from '../../assets/spinner.svg';

const Exercise = ({ name = '', category = { id: -1, name: '' }, description = '', image = null }) => (
    <div className={`Exercise ${(image) ? 'with-img' : ''}`}>
        <div className="name">{name}</div>
        <div className="category">{category.name}</div>
        <div className="description">{description}</div>
        {image && <div className="image">
            <Img src={image} alt={name} placeholder={spinner} />
        </div>}
    </div>
);

export default Exercise;