import React from 'react';

const NavBar = () => {
    return (
        <div className="navbar bg-base-100 border mb-5">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl"><span className="text-primary">CFT</span>Stock Sentiment</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className="text-xl">Home</a></li>
                    <li><a className="text-xl">Analysis</a></li>
                    <li><a className="text-xl">About Us</a></li>
                    <li><a className="text-xl">Contact</a></li>
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