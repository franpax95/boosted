import React, { useState, useContext, useEffect, useRef } from 'react';
import './Routines.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as RoutinesContext } from '../../contexts/RoutinesContext';

import { animated, useSpring } from 'react-spring';

import { Spinner, Fatal, Layout, UtilWrapper } from '../../components/util';
import { RoutinesTable } from '../../components/Table';
import { RoutineSidebar } from '../../components/Sidebar';
import Exercise from '../../components/Exercise';
import Timer from '../../components/Timer';
import Counter from '../../components/Counter';



const Routines = props => {
    const RoutinesRef = useRef();

    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Routines: txt } = texts;

    /** routines state */
    const { 
        loading, error,
        routines, routine, exercises, 
        getRoutines, getRoutine, deleteRoutine, unsetError
    } = useContext(RoutinesContext);

    /** Routine related state */
    const [index, setIndex] = useState(0);

    /** id by rest url */
    const { id: rout_id } = props.match.params;

    /* fetchData effect */
    useEffect(() => {
        if(error) unsetError();

        const fetchData = async () => {
            /* get all routines */
            if(!rout_id && !routines.length && !loading) 
                await getRoutines();
                
            /* get single routine */
            if(rout_id && (!Object.values(routine).length || routine.id != rout_id) && !loading) 
                await getRoutine(rout_id);
        }

        fetchData();
    }, [routines, props.match.params.id]);

    /** prev and next onClick events */
    const prev = () => { if(index > 0) changeIndex(index - 1); }
    const next = () => { if(index < exercises.length-1) changeIndex(index + 1); }

    const changeIndex = (newIndex) => {
        RoutinesRef.current.style.opacity = 0;
        setTimeout(() => { setIndex(newIndex); }, 200);
        setTimeout(() => { RoutinesRef.current.style.opacity = 1; }, 500);
    }
    
    if(error)   return <UtilWrapper><Fatal error={error} /></UtilWrapper>;
    if(loading) return <UtilWrapper><Spinner /></UtilWrapper>;
    return (<>
        {!rout_id
            ? <Layout title={txt.title[0]}>
                <RoutinesTable routines={routines} deleteRoutine={deleteRoutine} />
            </Layout>
            : <>
                <div className="Routine" style={{ transition: 'opacity .2s ease-in' }} ref={RoutinesRef}>
                    <div className="exercise-wrapper"><Exercise {...exercises[index]} /></div>
                    <div className="buttons-wrapper">
                        <button onClick={() => prev()}>{txt.prev}</button>
                        <button onClick={() => next()}>{txt.next}</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        {(Object.values(routine).length > 0)
                            ? (routine.exercises[index].tOn > 0)
                                ? <Timer
                                    index={index}
                                    contract={routine.exercises[index].tOn}
                                    rest={routine.exercises[index].tOff}
                                    reps={routine.exercises[index].nRep}
                                    texts={txt.timer}
                                />
                                : <Counter
                                    index={index}
                                    reps={routine.exercises[index].nRep}
                                />
                            : ''
                        }
                    </div>
                    <div style={{ minHeight: '10vh' }}></div>
                </div>
                <RoutineSidebar exercises={exercises} onClick={changeIndex} active={index} />
            </>
        }
    </>);
}

export default Routines;