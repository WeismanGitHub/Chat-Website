import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const axios = require('axios').default;

function CreateRoom() {
    const navigate = useNavigate();
    
    function onClick(event) {
        event.preventDefault();

        axios.post('/api/v1/room/create')
        .then(res => {
            navigate('/')
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return <button class='bigButton' onClick={onClick}>Create Room</button>
}


export default CreateRoom