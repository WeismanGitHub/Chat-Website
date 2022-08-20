import { useNavigate } from 'react-router-dom';
import { cookieExists } from '../helpers'
import React from 'react';

import Account from './account'
import Room from './room'

function Home() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('token')) {
            navigate('/authentication')
        }
    }, [])

    return (
        <>
            <Account/>
            <Room/>
        </>
    )
}

export default Home;
