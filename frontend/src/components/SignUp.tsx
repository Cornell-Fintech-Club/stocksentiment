import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { auth, db } from "../firebase";
import { doc, getFirestore } from "firebase/firestore";
import { setDoc } from "firebase/firestore";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [name, setName] = useState("");
  const [userLoggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const signUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (name === "") {
      setErrorMessage("Invalid or missing name");
      throw new Error("missing-name");
    }
    else if (password !== verifyPassword) {
      setErrorMessage("Passwords don't match");
      throw new Error("verify-password-fail");
    }

    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          name: name,
          bio: "",
          pronouns: ""
        });
        console.log(userCredential)
        setLoggedIn(true)
      }).catch((error) => {
        console.log(error);
        handleError(error);
      })
  }

  const handleError = (error: any) => {
    if (error.code === 'auth/email-already-in-use') {
      setErrorMessage("Email already in use");
    }
    else if (error.code === 'auth/missing-password') {
      setErrorMessage("Missing password");
    }
    else if (error.code === 'auth/invalid-email') {
      setErrorMessage("Invalid email");
    }
    else {
      setErrorMessage("Error logging in");
    }
  }

  return (
    <>{userLoggedIn ? <Navigate to={"/"} replace={true} /> :
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-100/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-red-800">Sign Up</h1>
          <form className="space-y-4" onSubmit={signUp}>
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557" /></svg>
                <input type="text" className="grow bg-base-100" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
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
            <div>
              <label className="label">
                <span className="text-base label-text">Re-type Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow bg-base-100" placeholder="Re-type Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
              </label>
            </div>
            {errorMessage !== "" ? (<div role="alert" className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Warning: {errorMessage}</span>
            </div>) : <></>
            }
            <div>
              <button className="btn btn-active btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    }
    </>
  );
}