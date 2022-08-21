import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cookieExists, getCookie } from '../../helpers'
import CreateRoom from './room/create-room'
import LeaveRoom from './room/leave-room'
import JoinRoom from './room/join-room'
import CopyId from './room/copy-id'
import io from 'socket.io-client';
import ChatBox from './chat/chat-box'
import Users from './chat/users'


function RoomAndChat() {
    if (cookieExists('roomId')) {
        const roomId = getCookie('roomId')
        const socket = io.connect('/')
        socket.roomId = roomId
        
        socket.emit('join_room', { roomId: roomId })

        return (
            <>
                <div class='roomAndChat'>
                    <br/>
                    <ChatBox socket={socket} roomId={roomId}/>
                    <div>
                        <Users class='users' socket={socket} roomId={roomId}/>
                    </div>
                    <div>
                        <LeaveRoom/>
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