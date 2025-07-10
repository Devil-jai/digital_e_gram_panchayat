import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { addDoc, collection, getDoc, getDocs, Timestamp, doc } from 'firebase/firestore'
import { db } from '../../Firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function ApplyServices() {
  const [servicedata, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [applicantName, setApplicantName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchService = async () => {
    try {
      const snapshot = await getDocs(collection(db, "services"));
      const service = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServiceData(service);
    } catch (error) {
      toast.error("Failed to fetch government services");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setApplicantName(`${data.firstName} ${data.lastName}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      await addDoc(collection(db, "users", user.uid, "servicesApplications"), {
        ...data,
        applicantName: applicantName,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        createdAt: Timestamp.now(),
      });

      toast.success("Applied successfully!");
      reset();
      setSelectedService(null);
    } catch (error) {
      console.log(error);
      toast.error("Application failed");
    }
  };

  useEffect(() => {
    fetchService();
    fetchUserName();
  }, []);

  return (
    <div className="h-screen overflow-y-auto relative">
      <div
        className="absolute top-0 left-0 w-full min-h-screen z-10 pt-16 pb-10 px-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-10">Available Government Services</h1>

        {servicedata.length === 0 ? (
          <p className="text-center text-gray-300">No government services found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {servicedata.map((service) => (
              <div
                key={service.id}
                className="w-[280px] xl:w-[340px] p-5 bg-white border border-green-500 rounded-2xl shadow-md hover:shadow-green-600 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between gap-3 xl:gap-6 text-gray-900"
              >
                <div className="flex flex-col gap-3">
                  <div className="text-green-600 font-bold text-lg text-center py-2">{service.title}</div>
                  <p className="text-sm"><strong>Eligibility:</strong> {service.eligibility}</p>
                  <p className="text-sm"><strong>Benefits:</strong> {service.benefits}</p>
                  <p className="text-sm"><strong>Description:</strong> {service.description}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Posted on:</strong> {service.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedService && (
          <div className="fixed inset-0 flex items-center justify-center z-50 mt-20" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative flex flex-col gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-2 right-3 text-gray-500 hover:text-black"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold mb-4 text-center text-green-700">
                Apply for {selectedService.title}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm">Service Name</label>
                  <input
                    value={selectedService.title}
                    disabled
                    className="py-1 px-3 border rounded-xl bg-gray-100 text-gray-600"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm">Your Name</label>
                  <input
                    value={applicantName}
                    disabled
                    className="py-1 px-3 border rounded-xl bg-gray-100 text-gray-600"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm">Aadhaar Number</label>
                  <input
                    {...register("aadhaar", {
                      required: "Aadhaar is required",
                      pattern: {
                        value: /^\d{4}-\d{4}-\d{4}$/,
                        message: "Format: 1234-5678-9012",
                      },
                    })}
                    className="py-1 px-3 border rounded-xl"
                    placeholder="1234-5678-9012"
                  />
                  {errors.aadhaar && (
                    <p className="text-red-500 text-sm mt-1">{errors.aadhaar.message}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm">Mobile Number</label>
                  <input
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    className="py-1 px-3 border rounded-xl"
                    placeholder="9876543210"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyServices;
