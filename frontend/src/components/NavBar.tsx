import React, { useEffect, useState } from 'react';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
// Import your logo image
import logo from '../CFT_logo_cropped-r.png'; // Replace with the actual path to your logo image

const NavBar = () => {
    const location = useLocation();
    const [authUser, setAuthUser] = useState<any | null>(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });

        return () => {
            listen();
        }
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            console.log("sign out successful")
        }).catch(error => console.log(error))
    }
    return (
        <>
            {location.pathname != "/login" && location.pathname != "/signup" ?
                (<div className="navbar bg-base-100 border">
                    <div className="navbar-start">
                        {/* Replace the text with your logo */}
                        <Link to="https://www.cornellfintechclub.com/" className="btn btn-ghost normal-case text-xl">
                            <img src={logo} alt="CFT Stock Sentiment Logo" className="h-8 w-auto" />
                        </Link>
                        <a className="btn btn-ghost normal-case text-xl">Stock Sentiment</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <Link to="/"><button className={location.pathname === '/' ? 'btn btn-primary' : 'btn btn-ghost'}>Home</button></Link>
                        <Link to="/analysis"><button className={location.pathname === '/analysis' ? 'btn btn-primary' : 'btn btn-ghost'}>Analysis</button></Link>
                        <Link to="/news"><button className={location.pathname === '/news' ? 'btn btn-primary' : 'btn btn-ghost'}>News</button></Link>
                        <Link to="/aboutus"><button className={location.pathname === '/aboutus' ? 'btn btn-primary' : 'btn btn-ghost'}>About Us</button></Link>
                        <Link to="/contact"><button className={location.pathname === '/contact' ? 'btn btn-primary' : 'btn btn-ghost'}>Contact</button></Link>
                    </div>
                    <div className="navbar-end">
                        <>
                            {authUser ? (<div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <span className="text-3xl">P</span>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <Link to="/profile">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                            </a>
                                        </li>
                                    </Link>
                                    <Link to="/settings"><li><a>Settings</a></li></Link>
                                    <li><a className="logout-link" onClick={logout}>Logout</a></li>
                                </ul>
                            </div>
                            ) : (<Link to="/login"><a className="btn btn-outline btn-primary">Login</a>
                            </Link>)}
                        </>

                    </div>
                </div>)
                : (<div>
                </div>)
            }
        </>
    )
}

export default NavBar;
