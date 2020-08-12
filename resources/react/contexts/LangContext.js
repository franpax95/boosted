import React, { useState } from 'react';


const Context = React.createContext([{}, () => {}]);

const Provider = ({ children }) => {
    const [lang, setLang] = useState('esp');

    return (
        <Context.Provider value={[lang, setLang]}>
            {children}
        </Context.Provider>
    );
}

export { Context, Provider };