import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Settings() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "users", userId);

        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document exists!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="flex w-full max-w-4xl">
        {/* Sidebar for navigation */}
        <div className="w-1/4 p-4 border-r">
          <ul className="menu bg-base-100 w-full">
            <li><a href="#personal-information">Personal Information</a></li>
            <li><a href="#security-authentication">Security and Authentication</a></li>
            <li><a href="#portfolio-preferences">Portfolio Preferences</a></li>
            <li><a href="#notification-settings">Notification Settings</a></li>
            <li><a href="#communication-preferences">Communication Preferences</a></li>
            <li><a href="#tax-settings">Tax Settings</a></li>
            <li><a href="#data-privacy-and-security">Data Privacy</a></li>
            <li><a href="#integration-settings">Integration Settings</a></li>
            <li><a href="#accessibility-options">Accessibility Options</a></li>
            <li><a href="#reporting-and-analytics">Reporting and Analytics</a></li>
            <li><a href="#trading-settings">Trading Settings</a></li>
            <li><a href="#theme-and-appearance">Theme and Appearance</a></li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-3/4 p-4">
          <section id="personal-information">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="flex gap-4">
              {/* Form Section */}
              <div className="flex-1">
                <div className="form-control mb-6">
                  <label className="label text-sm font-medium text-gray-700">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Your name" className="input input-bordered w-full text-base" value={userData?.name || ""}
                    onChange={(e) => console.log("Input value:", e.target.value)}
                    />
                </div>

                <div className="form-control mb-6">
                  <label className="label text-sm font-medium text-gray-700">
                    <span className="label-text">Public Email</span>
                  </label>
                  <input type="email" placeholder="name@example.com" className="input input-bordered w-full text-base" value={userData?.email || ""} />
                </div>

                <div className="form-control mb-6">
                  <label className="label text-sm font-medium text-gray-700">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea placeholder="Tell us about yourself" className="textarea textarea-bordered text-base"></textarea>
                </div>

                <div className="form-control mb-6">
                  <label className="label text-sm font-medium text-gray-700">
                    <span className="label-text">Pronouns</span>
                  </label>
                  <input type="text" placeholder="e.g., He/Him, They/Them" className="input input-bordered w-full text-base" />
                </div>

                <div className="form-control mb-6">
                  <label className="label text-sm font-medium text-gray-700">
                    <span className="label-text">Social URLs</span>
                  </label>
                  <input type="url" placeholder="Facebook URL" className="input input-bordered w-full mb-2 text-base" />
                  <input type="url" placeholder="Twitter URL" className="input input-bordered w-full mb-2 text-base" />
                  <input type="url" placeholder="LinkedIn URL" className="input input-bordered w-full mb-2 text-base" />
                  <input type="url" placeholder="Instagram URL" className="input input-bordered w-full text-base" />
                </div>
              </div>
              {/* Profile Picture Section */}
              <div className="flex-1 flex flex-col items-center">
                <div className="label text font-medium text-black-700 text-center mb-2">Profile Picture</div>
                <div className="relative">
                  {/* Profile picture with overlay */}
                  <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full w-40 h-40 object-cover" />
                  <label htmlFor="file-upload" className="absolute bottom-0 left-0 bg-black bg-opacity-75 rounded-full p-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h-2V5H6v2H4V5z" />
                      <path fillRule="evenodd" d="M3 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" clipRule="evenodd" />
                    </svg>
                  </label>
                  {/* Hidden file input for triggering file selection when edit icon is clicked */}
                  <input type="file" id="file-upload" className="hidden" />
                </div>
              </div>
            </div>
          </section>
          {/* ... Other sections above ... */}
          {/* Security and Authentication Section */}
          <section id="security-authentication">
            <h2 className="text-xl font-bold mb-4">Security and Authentication</h2>

            {/* Change Password Subsection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Change Password</h3>
              <div className="border-b-2 border-gray-200 mb-4" />

              <div className="form-control mb-4">
                <label className="label text-sm font-medium text-gray-700">
                  <span className="label-text">Old Password</span>
                </label>
                <input type="password" placeholder="Enter your old password" className="input input-bordered w-full text-base" />
              </div>

              <div className="form-control mb-4">
                <label className="label text-sm font-medium text-gray-700">
                  <span className="label-text">New Password</span>
                </label>
                <input type="password" placeholder="Enter your new password" className="input input-bordered w-full text-base" />
              </div>

              <div className="form-control mb-4">
                <label className="label text-sm font-medium text-gray-700">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input type="password" placeholder="Confirm your new password" className="input input-bordered w-full text-base" />
              </div>

              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot my password?</a>
                <button className="btn btn-primary">Update Password</button>
              </div>
            </div>
            {/* Change Username Subsection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Change Username</h3>
              <div className="border-b-2 border-gray-200 mb-4" />

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Old Username</span>
                </label>
                <input type="text" placeholder="Enter your old username" className="input input-bordered w-full text-base" />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">New Username</span>
                </label>
                <input type="text" placeholder="Enter your new username" className="input input-bordered w-full text-base" />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Confirm New Username</span>
                </label>
                <input type="text" placeholder="Confirm your new username" className="input input-bordered w-full text-base" />
              </div>

              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot my username?</a>
                <button className="btn btn-primary">Update Username</button>
              </div>
            </div>

            {/* Two-Factor Authentication Subsection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Two-factor authentication</h3>
              <div className="border-b-2 border-gray-200 mb-4" />

              <div className="text-center p-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Two-factor authentication is not enabled yet.</span>
                <p className="text-gray-600 mb-6">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.</p>
                <div className="flex flex-col items-center">
                  <button className="btn btn-primary mb-2">Enable two-factor authentication</button>
                  <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Learn more</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
