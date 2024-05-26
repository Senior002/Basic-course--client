import {Link} from 'react-router-dom'
import './Navbar.css'
function Navbar(){
    return(
        <>
            <ul className='d-flex justify-content-center mt-4'>
                <li className='mx-3'>
                    <Link className='navbar_item' to="/subject">Subject</Link>
                </li>
                <li className='mx-3'>
                    <Link className='navbar_item' to="/teacher">Teacher</Link>
                </li>
                <li className='mx-3'>
                    <Link className='navbar_item' to="/group">Group</Link>
                </li>
                <li className='mx-3'>
                    <Link className='navbar_item' to="/">Exit</Link>
                </li>
            </ul>
        </>
    )
}

export default Navbar