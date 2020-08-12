import React from 'react';
import './styles.css';

export const RoutineForm = ({
    src = '',
    title = '',
    description = '',
    onSubmit = undefined,
    children
}) => (
    <div className="RoutineForm">
        <div className="header" style={{ backgroundImage: `url(${src})` }}>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
        </div>
        <form className="form-container" onSubmit={onSubmit}>
            {children}
        </form>
    </div>
)

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