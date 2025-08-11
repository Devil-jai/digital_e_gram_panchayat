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
    return <div className="flex justify-center items-center h-64">loading</div>;
  }

  if (!userData) {
    return (
      <div className="text-center text-red-600">Profile data not found.</div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1681483567775-2f447b13431a?w=1920&auto=format&fit=crop&q=80')",
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Profile Card */}
      <div className="relative z-10 max-w-md w-full p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-300 drop-shadow">
          My Profile
        </h2>
        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {userData.firstName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {userData.address || "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {userData.role || "User"}
          </p>
          <p>
            <strong>UID:</strong> {userData.uid || "uid"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
