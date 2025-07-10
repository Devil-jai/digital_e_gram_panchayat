import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../Firebase'
import toast from 'react-hot-toast'

function UpdateDeletesServices() {
    const [services , setServices] = useState([])
    const [selectedService , setSelectedService] = useState(null)
    const [showModal , setShowModal] = useState(false)

    const {register , handleSubmit , formState : {errors, isSubmitting} , reset , setValue } = useForm()

    const fetchServices = async () =>{
        const snapshot = await getDocs(collection(db,'services'))
        const serviceList = snapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }))
        setServices(serviceList)
    }

    useEffect(()=>{
        fetchServices()
    },[])

    const handleEdit = service =>{
        setSelectedService(service)
        Object.entries(service).forEach(([key , value])=>{
            if(key !== 'id') setValue(key , value)
        })
    setShowModal(true)
    }

    const onUpdate = async data =>{
        try {
            await updateDoc(doc(db,'services',selectedService.id),{
                ...data,
            })
            toast.success('Service update')
            setShowModal(false)
            reset()
            fetchServices()
        } catch(error){
            toast.error('Failed to update service')
        }
    }

    const onDelete = async id =>{
        const confirm = window.confirm('Are you sure to delte this service?')
        if(!confirm) return
        
        try{
            await deleteDoc(doc(db,'services',id))
            toast.success('Service deleted')
            fetchServices()
        }
        catch(error){
            toast.error('Failed to delte service')
        }
    }

  return (
     <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Update/Delete Services</h2>

      {/* List of services */}
      <div className="max-w-4xl mx-auto space-y-4">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-md shadow flex justify-between items-start"
          >
            <div>
              <h4 className="font-bold text-lg">{service.title}</h4>
              <p>{service.description}</p>
              <p className="text-sm text-gray-500">Category: {service.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-4 py-1 rounded"
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded"
                onClick={() => onDelete(service.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full overflow-scroll max-w-xl p-6 rounded shadow relative">
            <button
              onClick={() => {
                setShowModal(false)
                reset()
              }}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">Edit Service</h3>
            <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full p-2 border rounded"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className="w-full p-2 border rounded"
                  rows={3}
                ></textarea>
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium">Category</label>
                <input
                  type="text"
                  {...register('category', { required: 'Category is required' })}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block font-medium">Department</label>
                <input type="text" {...register('department')} className="w-full p-2 border rounded" />
              </div>

              {/* Start Date & End Date */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block font-medium">Start Date</label>
                  <input type="date" {...register('startDate')} className="w-full p-2 border rounded" />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium">End Date</label>
                  <input type="date" {...register('endDate')} className="w-full p-2 border rounded" />
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <label className="block font-medium">Eligibility</label>
                <textarea {...register('eligibility')} className="w-full p-2 border rounded" rows={2}></textarea>
              </div>

              {/* Documents Required */}
              <div>
                <label className="block font-medium">Documents Required</label>
                <textarea {...register('documentsRequired')} className="w-full p-2 border rounded" rows={2}></textarea>
              </div>

              {/* Benefits */}
              <div>
                <label className="block font-medium">Benefits</label>
                <textarea {...register('benefits')} className="w-full p-2 border rounded" rows={2}></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


export default UpdateDeletesServices