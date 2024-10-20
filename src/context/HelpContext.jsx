import React, { createContext, useContext, useMemo, useState } from 'react';
// перерендеривается - поэтому откладывается в долгий ящик дл] тем и языка

export const HelpContext = createContext();

export const HelpProvider = ({ children }) => {
    const [reglog, setReglog] = useState(false);//переменная , которая позволяет автоматически входить только 1 раз при регистрации

const value = useMemo(()=>({
    reglog ,
    setReglog
}) , 
[reglog])


    return (
        <HelpContext.Provider value={value}>
            {children}
        </HelpContext.Provider>
    );
};

export const useHelp = ()=>useContext(HelpContext)