import {Link} from 'react-router-dom';

export default function Navbar(){
    return(
        <nav className="navbar">
            <h2>Minekada <span className='style2'>Blog</span> Page</h2>
            <ul className="navbar-nav d-flex flex-row">
                <li className="me-3">
                    <Link className="nav-item" to='/'>Home</Link>
                </li>
                <li className="me-3">
                    <Link className="nav-item" to='/about'>About</Link>
                </li>
                <li className="me-3"> 
                    <Link className="nav-item" to='/articles'>Articles</Link>
                </li>
                <li className="me-3"> 
                    <Link className="nav-item" to='/write-article'>Write</Link>
                </li>
            </ul>
        </nav>      

    )
}