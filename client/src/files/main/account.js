import { ToastContainer } from 'react-toastify';
import UpdateAccount from './account/update-account'
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccount from './account/delete-account'
import Logout from './account/logout'

function Account() {
    return (
        <div className='account'>
            <UpdateAccount/>
            <br/>
            <br/>
            <Logout/>
            <br/>
            <br/>
            <DeleteAccount/>
            <ToastContainer/>
        </div>
    )
}

export default Account