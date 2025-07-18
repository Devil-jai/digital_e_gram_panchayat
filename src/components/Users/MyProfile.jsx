import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";


function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("User profile not found.");
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

console.log(userData);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        loading
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center text-red-600">Profile data not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">My Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {userData.firstName  || "N/A"}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
        <p><strong>Address:</strong> {userData.address || "N/A"}</p>
        <p><strong>Role:</strong> {userData.role || "User"}</p>
        <p><strong>uid:</strong> {userData.uid || "uid"}</p>
    
      </div>
    </div>
  );
}

export default MyProfile;
