import React from 'react';
import './styles.css';

const Form = ({ 
    src = '',
    icon = '',
    title = '',
    subtitle = '',
    description = '',
    onSubmit = undefined,
    children
}) => (
    <div className="Form">
        <div className="info-container" style={{ backgroundImage: `url(${src})` }}>
            <div className="icon">{icon}</div>
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
            <div className="description">{description}</div>
        </div>

        <div className="form-container">
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    </div>
);

export default Form;