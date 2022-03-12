import App from '../App'
import Personal from '../pages/Personal'
import Edit from '../pages/Edit'
import List from '../pages/List'
import Login from '../pages/Login'
import Register from '../pages/Register'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

 const pageRouter =  ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path='/list' element={<List/>}></Route>
                    <Route path='/personal' element={<Personal/>}></Route>
                    <Route path='/edit' element={<Edit/>}></Route>
                </Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
            </Routes>
        </Router>
    )
}
export default pageRouter