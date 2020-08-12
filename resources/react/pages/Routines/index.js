import React, { useState, useContext, useEffect } from 'react';
import './Routines.css';

import { useLanguage } from '../../hooks/useLanguage';
import { Context as RoutinesContext } from '../../contexts/RoutinesContext';

import { Spinner, Fatal, Layout, UtilWrapper } from '../../components/util';
import { RoutinesTable } from '../../components/Table';
import { RoutineSidebar } from '../../components/Sidebar';



const Routines = (props) => {
    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Routines: txt } = texts;

    /** routines state */
    const { 
        loading, error,
        routines, routine, exercises, 
        getRoutines, getRoutine, unsetError
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

    
    if(error)   return <UtilWrapper><Fatal error={error} /></UtilWrapper>;
    if(loading) return <UtilWrapper><Spinner /></UtilWrapper>;
    return (<>
        {!rout_id
            ? <Layout title={txt.title[0]}>
                <RoutinesTable routines={routines} />
            </Layout>
            : <div className="Routine">
                <RoutineSidebar exercises={exercises} onClick={setIndex} active={index} />
            </div>
        }
    </>);
}

export default Routines;