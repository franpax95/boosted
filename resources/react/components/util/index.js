import React, { useState } from 'react';
import './styles.css';
import { useSpring, animated } from 'react-spring';

export const Spinner = ({ size = '64px' }) => {
    const divSize = `${parseInt(size)}px`;
    
    const spring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
    });

    return (
        <animated.div className="Spinner" style={{ ...spring, width: size, height: size }}>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
            <div style={{ width: divSize, height: divSize }}></div>
        </animated.div>
    );
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