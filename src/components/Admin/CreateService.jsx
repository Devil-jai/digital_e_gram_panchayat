import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../Firebase'
import toast from 'react-hot-toast'

function CreateService() {
    const {
        register , reset ,  handleSubmit , formState : {errors,isSubmitting}
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await addDoc(collection(db,'services'),{
                ...data,
                createdAt:serverTimestamp(),
                status:'active'
            })
            toast.success("Service created successfully")
            reset();
        } catch(error){
            toast.error("Failed to create service")
        }
    }
  return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Create New Service</h2>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Service Title</label>
          <input
            type="text"
            {...register('title', { required: 'Service title is required' })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="Enter service description"
            rows={3}
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            {...register('category', { required: 'Category is required' })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. Health, Education, Welfare"
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Eligibility */}
        <div>
          <label className="block mb-1 font-medium">Eligibility Criteria</label>
          <textarea
            {...register('eligibility')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. Above 60 years, below poverty line"
            rows={2}
          ></textarea>
        </div>

        {/* Documents Required */}
        <div>
          <label className="block mb-1 font-medium">Documents Required</label>
          <textarea
            {...register('documentsRequired')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. Aadhaar card, Ration card"
            rows={2}
          ></textarea>
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            {...register('startDate')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            {...register('endDate')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            {...register('department')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. Rural Development"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block mb-1 font-medium">Scheme Benefits</label>
          <textarea
            {...register('benefits')}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            placeholder="e.g. ₹1000/month pension for senior citizens"
            rows={2}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Create Service'}
        </button>
      </form>
    </div>
  )
}

export default CreateService