import { ToastContainer } from 'react-toastify';
import UpdateAccount from './account/update-account'
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccount from './account/delete-account'
import Logout from './account/logout'

function Account({ socket, roomId }) {
    return (
        <div class='account'>
            <UpdateAccount/>
            <br/>
            <Logout/>
            <br/>
            <DeleteAccount socket={socket} roomId={roomId}/>
            <ToastContainer/>
        </div>
    )
}

export default Account