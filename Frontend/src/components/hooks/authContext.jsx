import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        name: '',
    },
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            phoneNumber: '',
            name: '',
        },
    });

    return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>;
};
