import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Firebase';
import toast from 'react-hot-toast';

function StaffLogin() {
     const ADMIN_EMAIL = 'staff@gmail.com'

    const {
        register , handleSubmit , formState:{errors , isSubmitting} 
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async({email , password}) =>{
        if(email !== ADMIN_EMAIL){
            toast.error("You are not authorised to access this portal.")
            return;
        }
         
        try{
            const {user } = await signInWithEmailAndPassword(auth,email , password)

            await setDoc(doc(db,"admin",user.uid),
            {
                email:user.email,
                lastLogin : serverTimestamp(),
                role:"admin"
            },
        {merge:true}
    );
    toast.success("Login Successful")
    navigate("/admin/dashboard")
        } catch(err){
            if(err.code === "auth/invalid-credential"){
                toast.error("Invalid Password")
            }
            else toast.error(err.message)

        }
    }
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Staff Login
        </h1>

        {/* Email field */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            autoComplete="username"
            placeholder="admin@example.com"
            className="p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password field */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing In…" : "Login"}
        </button>
      </form>
    </div>
  )
}

export default StaffLogin