import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { auth, db } from "../firebase";
import { doc, getFirestore } from "firebase/firestore";
import { setDoc } from "firebase/firestore";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn, setLoggedIn] = useState(false)

  const logIn = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);
        setLoggedIn(true)
      },).catch((error) => { console.log(error) })
  }
  return (
    <>{userLoggedIn ? <Navigate to={"/"} replace={true} /> :
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-100/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-red-800">Log In</h1>
          <form className="space-y-4" onSubmit={logIn}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" className="grow bg-base-100" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow bg-base-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <a href="./SignUp" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Don't Have An Account?</a>
            &nbsp;
            <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
            <div>

              <button className="btn btn-active btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    }
    </>
  );
}