import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from '../FireBase/Config';
import { Spin } from 'antd'

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {

    const [user, setuser] = useState({})
    const History = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setuser({ displayName, email, uid, photoURL })
                setIsLoading(false);
                History.push('/')
                return;
            } else {
                setIsLoading(false);
                History.push('/login')
            }
        });

        return () => {
            unsubscibed()
        }
    }, [History])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
