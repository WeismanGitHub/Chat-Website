import { cookieExists, getCookie } from '../helpers'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import React from 'react';

import Account from './main/account'
import Room from './main/room-and-chat'

function Home() {
    const navigate = useNavigate()

    const socket = io.connect('/')
    const roomId = getCookie('roomId')

    React.useEffect(()=> {
        if (!cookieExists('token')) {
            navigate('/authentication')
        }
    }, [])

    return (
        <>
            <Account socket={socket} roomId={roomId}/>
            <Room socket={socket} roomId={roomId}/>
        </>
    )
}

export default Home;
