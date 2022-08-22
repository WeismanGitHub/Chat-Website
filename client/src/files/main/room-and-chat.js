import { cookieExists, getCookie } from '../../helpers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateRoom from './room/create-room'
import LeaveRoom from './room/leave-room'
import JoinRoom from './room/join-room'
import ChatBox from './chat/chat-box'
import CopyId from './room/copy-id'
import Users from './chat/users'


function RoomAndChat({ socket, roomId }) {
    if (cookieExists('roomId')) {
        socket.emit('join_room', { roomId: roomId })
        return (
            <>
                <div class='roomAndChat'>
                    <br/>
                    <ChatBox socket={socket} roomId={roomId}/>
                    <div>
                        <Users class='users' socket={socket}/>
                    </div>
                    <div>
                        <LeaveRoom socket={socket} roomId={roomId}/>
                        <CopyId/>
                    </div>
                </div>
                <ToastContainer/>
            </>
        )
    } else {
        return (
            <div class='roomAndChat'>
                <br/>
                <CreateRoom/>
                <br/>
                <br/>
                <JoinRoom/>
                <ToastContainer/>
            </div>
        )
    }
}

export default RoomAndChat