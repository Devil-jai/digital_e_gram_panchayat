import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../../Firebase';
import toast from 'react-hot-toast';
function UserRegistration() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        watch
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const {firstName , lastName , email , phone , password , address } = data;

        try{
            const userCreadential = await createUserWithEmailAndPassword(
                auth, 
                email,
                password
            );
            const user = userCreadential.user;

            await setDoc(doc(db,"users",user.uid),{
                firstName,
                lastName,
                email,
                phone,
                address,
                uid:user.uid,
                role:"user",
            });
            toast.success("Registration Successful")
            navigate('/userLogin')
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                toast.error("This user already exist. Please login")
            } else{
                toast.error(error.message)
            }
        }
    }

      const password = watch('password');
  return (
   <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            {...register('firstName', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            {...register('lastName', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="block mb-1">Mobile Number</label>
          <input
            type="tel"
            {...register('phone', { required: true, minLength: 10 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">Mobile number is required</p>}
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            {...register('address', { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
        </div>

      
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
        </div>

 <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default UserRegistration