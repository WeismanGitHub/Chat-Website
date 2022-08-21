import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

function Users({ socket }) {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        axios.get('/api/v1/room/users').then(res => {
            setUsers(res.data)
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }, [])

    useEffect(() => {
        socket.on('send_users', (users) => {
            setUsers(users)
        })

        socket.on('connect_error', (err) => {
            console.log(err.message)
        })
    }, [socket]);

    return (
        <div class='users'>
           {users.map(user => {
                return (<>
                    {user.name}
                    <br/>
                </>)
            })}
            <ToastContainer/>
        </div>
    )
}


export default Users;
