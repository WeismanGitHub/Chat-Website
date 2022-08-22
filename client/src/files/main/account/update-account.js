import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const axios = require('axios').default;

function UpdateAccount() {
    const [user, setUser] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/api/v1/user')
            .catch(err => {
                console.log(err.message)
            })
            setUser(res.data.user)
        }
        fetchUser()
    }, [])
    
    async function updateAccountHandler(event) {
        event.preventDefault();
        
        axios.post('/api/v1/user/update', {
            name: event.target[0].value,
            password: event.target[1].value
        }).then(res => {
            window.location.reload(false);
            setUser(res.data.user)
            toast('Account updated!')
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div>
            <br/>
            Name: {user?.name}
            <br/>
            <br/>
            <form onSubmit={updateAccountHandler}>
                <div>Update Account</div>
                Name:
                <br/>
                <input id='Your Name' type='text' name='name' placeholder={user?.name} maxlength='15' minlength='1'/>
                <br/>
                Password:
                <br/>
                <input id='Your Password' type='password' placeholder="password" name='password' maxlength='50' minlength='6'/>
                <br/>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateAccount