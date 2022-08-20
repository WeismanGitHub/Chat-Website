import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { cookieExists } from '../helpers'
import { getCookie } from '../helpers'
import io from 'socket.io-client';
import Users from './users'
import Chat from './home/chat'
import axios from 'axios'

function Room() {
    const navigate = useNavigate()

    React.useEffect(()=> {
        if (!cookieExists('roomId')) {
            navigate('/')
        }
    }, [])

    const roomId = getCookie('roomId')
    const socket = io.connect('/')
    socket.roomId = roomId
    
    socket.emit('join_room', { roomId: roomId })

    function leaveRoom(event) {
        event.preventDefault();
        
        axios.post('/api/v1/room/leave')
        .then(res => {
            socket.emit('update_users', { roomId: roomId })
            socket.emit('leave_room', { roomId: roomId })
            navigate('/');
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
    }

    function copyId(event) {
        event.preventDefault()
        navigator.clipboard.writeText(roomId)
        .then(() => {
            toast('Copied!')
        })
    }

    return (
        <>
            <Chat socket={socket} roomId={roomId}/>
            <button className='leaveRoomButton' onClick={leaveRoom}>
                Leave Room
            </button>
            <button class='copyIdButton' onClick={copyId}>Copy Room ID</button>
            <Users socket={socket} roomId={roomId}/>
            <ToastContainer/>
        </>
    )
}

export default Room;
