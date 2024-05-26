import {Route , Routes} from 'react-router-dom'
import Home from "../view/home"
import Login from "../view/login"
import Group from '../view/group'
import Teacher from '../view/teacher/teacher'
import Student from '../view/student'
import Chart from '../view/chart'
function AppRouter(){
    return(
        <>
           
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/subject" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/group" element={<Group />} />
                <Route path="/student" element={<Student />} />
                <Route path="/chart" element={<Chart />} />
            </Routes>
        
        </>
    )
}

export default AppRouter