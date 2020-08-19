import React, { useRef, useState, useEffect } from 'react';
import './Home.css';

import { useLanguage } from '../../hooks/useLanguage';

import { animated, useSpring } from 'react-spring';
import { BsArrowBarDown } from 'react-icons/bs';

const useObserver = options => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);

    const observer = useRef(null);

    const observerOptions = options || {};

    useEffect(() => {
        if(elements.length){
            observer.current = new IntersectionObserver(observedEntries => {
                setEntries(observedEntries);
            }, observerOptions);
            
            elements.forEach(element => observer.current.observe(element));
        }

        return () => {
            if(observer.current){
                observer.current.disconnect();
            }
        };
    }, [elements, observerOptions]);

    return [observer.current, setElements, entries];
}

const Home = (props) => {
    /** to scroll effects */
    const HomeRef = useRef();

    /* lang hook */
    const [texts, setLang] = useLanguage();
    const { Home: txt } = texts;

    /** header button click handler */
    const onScrollClick = e => {
        const heightToScroll = HomeRef.current.offsetParent.clientHeight + 5;
        const currentScrollTop = HomeRef.current.offsetParent.scrollTop;
        for(let i=0; i<1000; i++){
            let scroll = (heightToScroll - currentScrollTop) * i / 1000 + currentScrollTop;
            setTimeout(() => { HomeRef.current.offsetParent.scrollTop = scroll }, ((i/1000)*1000));
        }
    }

    const onWheel = e => {
        console.log(e, e.clientY, e.detail, e.view);
        if(e.deltaY > 0) setDisplay(true);
        else setDisplay(false);
    }

    const onScroll = e => {
        console.log('scroll!', e);
    }

    /** spring effects */
    const [display, setDisplay] = useState(false);
    const rightSpring = useSpring({ right: display ? '0px' : '-100px' });
    const leftSpring = useSpring({ left: display ? '0px' : '-100px' });
    const opacitySpring = useSpring({ opacity: display ? 1 : 0 });
    
    useEffect(() => {
        HomeRef.current.addEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="Home" ref={HomeRef}>
            <div className="header">
                <div className="title">{txt. title}</div>
                <div className="subtitle">{txt.subtitle}</div>
                <button onClick={onScrollClick}><BsArrowBarDown /></button>
            </div>
            <div className="section" onWheel={onWheel}>
                <animated.div className="left" style={{ ...leftSpring, ...opacitySpring }}>
                    {display ? 'true' : 'false'}
                </animated.div>
                <animated.div className="right" style={{ ...rightSpring, ...opacitySpring }}>
                    {display ? 'true' : 'false'}
                </animated.div>
            </div>
        </div>
    );
}

export default Home;