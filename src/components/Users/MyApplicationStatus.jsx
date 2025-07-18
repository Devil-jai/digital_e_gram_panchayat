import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

function MyApplicationStatus() {
      const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchUserApplications = (user) => {
    const userAppRef = collection(db, "users", user.uid, "servicesApplications");
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

  if (loading)
    return (
      console.log("loading")
    );

  return (
     <div>
      {applications.length === 0 ? (
        <p className="text-center">No Applications found</p>
      ) : (
        <div>
          {applications.map((app) => (
            <div key={app.id} className="flex flex-col">
              <div>{app.serviceName}</div>
            < span><strong>Name:</strong> {app.applicantName}</span>
                          <p><span><strong> User ID:</strong> {app.userId}</span></p>
             <span><strong>Aadhaar:</strong> {app.aadhaar}</span>
              <span><strong>Mobile:</strong> {app.mobile}</span>
               <span><strong>Applied On:</strong> {app.createdAt?.toDate().toLocaleString()}</span>
                             <p > <span><strong> Status:</strong> {app.status || 'Pending'}</span></p>
                               <div className="mt-2 text-sm text-center">
                  <strong>Status:</strong>{" "}
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
  )
}

export default MyApplicationStatus