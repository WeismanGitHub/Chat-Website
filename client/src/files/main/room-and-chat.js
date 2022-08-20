import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cookieExists } from '../../helpers'
import CreateRoom from './room/create-room'
import RejoinRoom from './room/rejoin-room'
import LeaveRoom from './room/leave-room'
import JoinRoom from './room/join-room'

function RoomAndChat() {
    if (cookieExists('roomId')) {
        return (
            <div className='leftColumn'>
                <br/>
                <br/>
                <br/>
            </div>
        )
    } else {
        return (
            <div className='leftColumn'>
                <br/>

                <br/>
                <br/>
                <ToastContainer/>
            </div>
        )
    }
}

export default RoomAndChat