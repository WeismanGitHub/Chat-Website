import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './styles.css';

import Authentication from './files/main/authentication'
import Main from './files/main'

const NotFound = (<h1>This page doesn't exist!</h1>)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Router>
            <Routes>
                <Route exact path='/' element={<Main/>}/>
                <Route exact path='/authentication' element={Authentication} />
                <Route path='*' element={NotFound}/>
            </Routes>
        </Router>
    </>
)