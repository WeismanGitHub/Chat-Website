import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const axios = require('axios').default;


function createRoom() {
    const navigate = useNavigate();
    
    function onClick(event) {
        event.preventDefault();

        axios.post('/api/v1/room/create')
        .then(res => {
            navigate('/room');
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }

    return <button className='bigButton' onClick={onClick}></button>
}


export default createRoom