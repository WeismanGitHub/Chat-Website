import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const axios = require('axios').default;

function LeaveRoom({ socket, roomId }) {
    const navigate = useNavigate();
    function onClick(event) {
        socket.emit('leave_room', { roomId: roomId})
        event.preventDefault();
        axios.post('/api/v1/room/leave')
        .then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return <button className='mediumButton' onClick={onClick}>Leave Room</button>
}

export default LeaveRoom