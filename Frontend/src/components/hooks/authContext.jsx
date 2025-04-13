import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        phoneNumber: '',
        name: '',
        role: '',
    },
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            phoneNumber: '',
            name: '',
            role: '',
        },
    });

    return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};
