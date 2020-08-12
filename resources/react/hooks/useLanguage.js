import { useContext, useState, useEffect } from 'react';
import { Context as LangContext } from '../contexts/LangContext';

import espTexts from '../lang/esp';
import engTexts from '../lang/eng';

export const useLanguage = () => {
    const [lang, setLang] = useContext(LangContext);
    const [texts, setTexts] = useState(
        (lang === 'esp') ? espTexts : engTexts
    );

    useEffect(() => {
        setTexts((lang === 'esp') ? espTexts : engTexts);
    }, [lang]);

    return [texts, setLang];
}