import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <div className="navbar bg-base-100 border">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl"><span className="text-primary">CFT</span>Stock Sentiment</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><a>Analysis</a></li>
                    <li><Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>News</Link></li>
                    <li><Link to="/aboutus" className={location.pathname === '/aboutus' ? 'active' : ''}>About Us</Link></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <span className="text-3xl">P</span>
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar