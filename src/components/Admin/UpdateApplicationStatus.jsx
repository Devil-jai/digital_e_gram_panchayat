import { collectionGroup, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../Firebase";
import img from "../../assets/img.png";
import { HiIdentification, HiStatusOnline, HiUser } from "react-icons/hi";
import { MdCreditCard, MdPhone } from "react-icons/md";
import Loader from "../Loader";

function UpdateApplicationStatus() {
  const [applications, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchApplications = async () => {
    try {
      const snapshot = await getDocs(collectionGroup(db, "servicesApplications"));
      const appList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ref: doc.ref,
        userId: doc.ref.path.split("/")[1],
        ...doc.data(),
      }));
      setApplication(appList);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ref, newStatus) => {
    try {
      await updateDoc(ref, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchApplications();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen overflow-y-auto relative">
      {/* Background Image */}
      <img
        src={img}
        alt="Background"
        onLoad={() => setImageLoaded(true)}
        className={`h-screen w-full object-cover fixed top-0 left-0 transition-opacity duration-700 ease-in-out z-0 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay & Content */}
      <div
        className="absolute top-0 left-0 w-full min-h-screen z-10 pt-16 pb-10 px-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h2 className="font-bold text-center lg:text-3xl sm:text-2xl text-2xl  max-[405px]:text-[18px] 2xl:text-5xl xl:text-4xl mb-12 mt-16 text-white tracking-wide drop-shadow">
          Update Applications Status
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No applications found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {applications.map((app) => (
              <div
                key={app.id}
                className="w-[280px] p-5 bg-white border border-blue-500 rounded-2xl shadow-md hover:shadow-blue-500 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 text-gray-900"
              >
                <div className="w-full text-green-600 font-bold text-lg text-center rounded-md py-2">
                  {app.serviceName}
                </div>

                <p className="text-sm flex items-start gap-2">
                  <HiUser className="text-blue-700 mt-1" />
                  <span>
                    <strong>Name:</strong> {app.applicantName}
                  </span>
                </p>
                <p className="text-sm flex items-start gap-2">
                  <HiIdentification className="text-blue-700 mt-1" />
                  <span>
                    <strong>User ID:</strong> {app.userId}
                  </span>
                </p>
                <p className="text-sm flex items-start gap-2">
                  <MdCreditCard className="text-blue-700 mt-1" />
                  <span>
                    <strong>Aadhaar:</strong> {app.aadhaar}
                  </span>
                </p>
                <p className="text-sm flex items-start gap-2">
                  <MdPhone className="text-blue-700 mt-1" />
                  <span>
                    <strong>Mobile:</strong> {app.mobile}
                  </span>
                </p>
                <p className="text-sm font-semibold text-blue-800 flex items-start gap-2">
                  <HiStatusOnline className="text-blue-700 mt-1" />
                  <span>
                    <strong>Status:</strong> {app.status || "Pending"}
                  </span>
                </p>

                <div className="mt-3 flex gap-2">
                  {app.status === "approved" ? (
                    <button
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-sm"
                      disabled
                    >
                      Approved
                    </button>
                  ) : app.status === "rejected" ? (
                    <button
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm"
                      disabled
                    >
                      Rejected
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => updateStatus(app.ref, "approved")}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app.ref, "rejected")}
                        className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateApplicationStatus;
