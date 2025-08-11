import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

function MyApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserApplications = (user) => {
    const userAppRef = collection(
      db,
      "users",
      user.uid,
      "servicesApplications"
    );
    getDocs(userAppRef)
      .then((snapshot) => {
        const appList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(appList);
      })
      .catch((error) => {
        console.error("Error fetching application status:", error);
        toast.error("Failed to load application status");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserApplications(user);
      } else {
        toast.error("User not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return console.log("loading");

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4  py-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1707819128876-2f6ca16d0c0f?w=1920&auto=format&fit=crop&q=80')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
          My Application Status
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-white/90 bg-white/10 backdrop-blur-md py-4 rounded-xl shadow-lg">
            No Applications found
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-2xl hover:shadow-green-400 transition-all"
              >
                <h2 className="text-xl font-semibold text-green-300 mb-3">
                  {app.serviceName}
                </h2>
                <p className="text-white/90">
                  <strong>Name:</strong> {app.applicantName}
                </p>
                <p className="text-white/90">
                  <strong>User ID:</strong> {app.userId}
                </p>
                <p className="text-white/90">
                  <strong>Aadhaar:</strong> {app.aadhaar}
                </p>
                <p className="text-white/90">
                  <strong>Mobile:</strong> {app.mobile}
                </p>
                <p className="text-white/90">
                  <strong>Applied On:</strong>{" "}
                  {app.createdAt?.toDate().toLocaleString()}
                </p>

                <div className="mt-4 text-sm">
                  <strong className="text-white/90">Status:</strong>{" "}
                  <span
                    className={`font-semibold px-3 py-1 rounded-full ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status || "pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplicationStatus;
