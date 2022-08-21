import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const axios = require('axios').default;

function JoinRoom() {
    const navigate = useNavigate();
    
    function onClick(event) {
        event.preventDefault();
        axios.post('/api/v1/room/join', { roomId: event.target[0].value })
        .then(res => {
            navigate('/');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }
    return (<div class='entryForm'>
        <form onSubmit={onClick}>
            Enter Room Id
            <br/>
            <input type='text' name='roomId' maxlength='24' minlength='24' placeholder='****' />
            <br/>
            <button type='submit'>Join Room</button>
        </form>
    </div>)
}

export default JoinRoom