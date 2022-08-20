import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../../helpers'
import { toast } from 'react-toastify';

function CopyId() {
    const roomId = getCookie('roomId')

    function onClick(event) {
        event.preventDefault()
        navigator.clipboard.writeText(roomId)
        .then(() => {
            toast('Copied!')
        })
    }

    return <button class='copyIdButton' onClick={onClick}>Copy Room ID</button>
}


export default CopyId