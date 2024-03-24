import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import logo from '../CFT_logo_cropped-r.png';
import logo2 from '../LinkedIn.png';
import logo3 from '../Instagram.png';


export default function Contact() {
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("submitted");

        const target = e.currentTarget as HTMLFormElement;
        emailjs.sendForm("service_1xdhqhj", "template_jttfv5p", target, "CSasOsvUH2DF3UoWg");
    }
    return (
        <div className="h-full">
            <div className="hero min-h-screen">
                <div
                    className="relative inset-x-0 -top-20 -z-10 overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-primary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl mt-[-2rem] sm:mt-[-3rem] lg:mt-[-4rem]">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                            Contact Us
                        </h1>
                        <div className="mt-4 flex items-center justify-center gap-x-6">
                            <Link to="https://www.cornellfintechclub.com/" className="btn btn-ghost normal-case text-xl">
                            <img src={logo} alt="CFT Stock Sentiment Logo" className="h-10 w-auto" />
                            </Link>
                            <Link to="https://www.linkedin.com/" className="btn btn-ghost normal-case text-xl">
                            <img src={logo2} alt="LinkedIn" className="h-10 w-auto" />
                            </Link>
                            <Link to="https://www.instagram.com/" className="btn btn-ghost normal-case text-xl">
                            <img src={logo3} alt="Instagram" className="h-10 w-auto" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex flex-col justify-center mt-3 overflow-hidden">
                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-2 ring-gray-100/50 lg:max-w-3xl">
                            <h1 className="text-3xl font-semibold text-center text-red-800">Contact Form</h1>
                            <form onSubmit={sendEmail} className="space-y-6">
                                <div className="flex items-center justify-center gap-x-6 mt-6">
                                    <div>
                                        <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                        <input type="text" className="grow bg-base-100" placeholder="Name" name="name" style={{ width: '200px' }}/>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="text" className="grow bg-base-100" placeholder="Email" name="email" style={{ width: '300px' }}/>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center w-full">
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                        <input type="text" className="grow bg-base-100" placeholder="Phone Number" name="number" style={{ width: '583px' }}/>
                                    </label>
                                </div>
                                <div className="flex items-center justify-center w-full" >
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
                                        <input type="text" className="grow bg-base-100" placeholder="Message" name="message" style={{ width: '583px'}}/>
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-active btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}