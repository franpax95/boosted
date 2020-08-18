import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './Counter.css';

const Counter = ({ reps = 0, index = -1 }) => {
    const [r, setR] = useState(0);

    useEffect(() => {
        setR(0);
    }, [index]);

    const plus = () => {
        if(r > 0) setR(r - 1);
    }

    const minus = () => {
        if(r < reps) setR(r + 1);
    }

    return (
        <div className="Counter">
            <button onClick={plus}>
                <FiMinus />
            </button>
            <div className="display">
                {`${r} / ${reps}`}
            </div>
            <button onClick={minus}>
                <FiPlus />
            </button>
        </div>
    )
}

export default Counter;