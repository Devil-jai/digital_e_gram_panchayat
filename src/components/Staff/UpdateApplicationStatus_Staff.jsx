import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, collectionGroup, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../Firebase";

function UpdateApplicationStatus_Staff() {
    const [applications , setApplication] = useState([])
    const [loading , setLoading] = useState(true)


    const fetchApplications = async () =>{
       try{
         const snapshot = await getDocs(collectionGroup(db,'servicesApplications'))
        const appList = snapshot.docs.map(doc=>({
            id:doc.id,
            ref:doc.ref,
            userId:doc.ref.path.split('/')[1],
            ...doc.data(),
        }))
        setApplication(appList)
    } catch(error){
        toast.error("Failed to load applications")
    } finally{
        setLoading(false)
    }

 
}

   const updateStatus = async (ref,newStatus) => {
        try{
            await updateDoc(ref,{status:newStatus})
            toast.success(`Marked as ${newStatus}`)
            fetchApplications();
        } catch(error){
            toast.error("Update filed")
        }

    }

console.log(applications);

    useEffect(()=>{
        fetchApplications()
    },[])


  if (loading) return console.log("loading");
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
                              <div className="">
                {app.status === 'approved' ? (
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-sm" disabled>
                    Approved
                  </button>
                ) : app.status === 'rejected' ? (
                  <button className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm" disabled>
                     Rejected
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateStatus(app.ref, 'approved')}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"
                    >
                       Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.ref, 'rejected')}
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
  )
}

export default UpdateApplicationStatus_Staff