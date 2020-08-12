import React from 'react';
import './styles.css';

export const Spinner = ({ size = '64px' }) => {
    const divSize = `${parseInt(size)}px`;
    return (
        <div className="Spinner" style={{ width: size, height: size }}>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
        </div>
    )
};

export const Fatal = ({ error = 'ERROR!', className = '' }) => (
    <div className={`Fatal ${className}`}>{error}</div>
);

export const Layout = ({ title = 'title', className = '', children }) => (
    <div className="Layout">
        <div className="layout-title">{title}</div>
        <div className={className}>{children}</div>
    </div>
);

export const UtilWrapper = ({ children }) => <div style={{
    width: '100%',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}}>{children}</div>;