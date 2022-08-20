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
                    <ChatBox socket={socket} roomId={roomId}/>
                    <LeaveRoom/>
                    <CopyId/>
                    <ToastContainer/>
                </div>
                <div class='users'>
                    <Users socket={socket} roomId={roomId}/>
                </div>
            </>
        )
    } else {
        return (
            <div class='chat'>
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