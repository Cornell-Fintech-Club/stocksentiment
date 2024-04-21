import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Define a User data interface
interface User {
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);  // State for user data
  const [formData, setFormData] = useState<User | null>(null);  // State for form inputs
  const [hasChanged, setHasChanged] = useState(false);  // State to track if any changes were made

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);  // Reference to user's document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as User;
          setUser(data);  // Set user data
          setFormData({ ...data });  // Initialize form data with user data
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => {
      unsubscribe();  // Clean up auth state change listener
    };
  }, []);  // Run once when the component mounts

  // Handler for input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
      setHasChanged(true);  // Mark that changes have been made
    }
  };

  // Handler for updating the profile
  const handleSubmit = async () => {
    if (auth.currentUser && formData) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, formData, { merge: true });  // Update Firestore with the new data
      setUser(formData);  // Update the original user data
      setHasChanged(false);  // Reset the change state after update
    }
  };

  if (!user) {
    return <div>Loading...</div>;  // Show loading while fetching data
  }

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <div>
        <h2>Personal Details:</h2>
        <p>
          Name: <input type="text" name="name" value={formData?.name} onChange={handleChange} />
        </p>
        <p>
          Email: <input type="text" name="email" value={formData?.email} onChange={handleChange} />
        </p>
      </div>
      {hasChanged && (  // Conditionally render "Update Profile" button
        <button onClick={handleSubmit}>Update Profile</button>
      )}
    </div>
  );
}
