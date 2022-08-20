import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { cookieExists } from '../../helpers'
const axios = require('axios').default;

function RoomRelated() {
    const navigate = useNavigate();

    function joinRoom(event) {
        event.preventDefault();
        
        axios.post('/api/v1/room/join', { roomId: event.target[0].value })
        .then(res => {
            navigate('/room');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    function rejoinRoom(event) {
        event.preventDefault()
        navigate('/room')
    }

    function leaveRoom(event) {
        event.preventDefault();

        axios.post('/api/v1/room/leave')
        .then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    function createRoom(event) {
        event.preventDefault();

        axios.post('/api/v1/room/create')
        .then(res => {
            navigate('/room');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    if (cookieExists('roomId')) {
        return (
            <div className='leftColumn'>
                <br/>
                <button className='bigButton' onClick={rejoinRoom}>
                    Rejoin Room
                </button>
                <br/>
                <br/>
                <button className='bigButton' onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>
        )
    } else {
        return (
            <div className='leftColumn'>
                <br/>
                <button className='bigButton' onClick={createRoom}>
                    Create Room
                </button>
                <br/>
                <br/>
                <div className='entryForm'>
                    <form onSubmit={joinRoom}>
                        Enter Room Id
                        <br/>
                        <input type='text' name='roomId' maxlength='24' minlength='24' placeholder='****' />
                        <br/>
                        <button type='submit'>Join Room</button>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}

export default RoomRelated