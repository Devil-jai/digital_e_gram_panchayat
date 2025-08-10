import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase'
import toast from 'react-hot-toast'
import img from '../../assets/img.svg'
function UserLogin() {
    const {
        register , handleSubmit , formState:{errors}
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) =>{
        const {email , password} = data
        try {
            await signInWithEmailAndPassword(auth,email , password)
            toast.success("Login Successful!")
            navigate('/user/dashboard')
        } catch (error) {
            if(error.code === 'auth/user-not-found'){
                toast.error('No user found with this email')
            }
            else if(error.code === 'auth/wrong-password'){
                toast.error('Incorrect Password')
            }
            else{
                toast.error(error.message)
            }
        }
    }
  return (
    <div className="flex justify-center items-center w-full poppins-medium ">
      <div className="md:w-1/2 w-full  flex flex-col items-center justify-center h-screen">
        <div className=" min-[448px]:w-3/4 w-full min-[448px]:px-0 px-8">
          <div className=" mb-10 text-center">
            <h2 className="xl:text-3xl mb-3 text-gray-500 lg:text-[20px] md:text-[16px] min-[576px]:text-2xl min-[448px]:text-xl min-[350px]:text-[18px] text-[16px] font-bold">
            Welcome
          </h2>
          <p className="text-gray-500">Don't have an account ? <Link to='/userRegistration' className="hover:underline">Signup</Link></p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 lg:px-10"
          >
           

            <div className=" flex flex-col">
              <label className="mb-1 text-gray-400 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                
                className="py-1 border rounded-[6px] border-gray-300 px-3"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            

          
              <div className="flex flex-col ">
                <label className="mb-1 text-gray-400 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  min-[350px]:text-[14px] text-[12px]">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not exceed 20 characters",
                    },
                  })}
                  
                  className="py-1 border rounded-[6px] border-gray-300 px-3"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

          

            <button
              type="submit"
              className="btn mt-3 xl:text-[16px] lg:text-[14px] md:text-[12px] min-[576px]:text-[16px]  text-[14px] bg-purple-800 text-white py-2 rounded-[6px]  cursor-pointer hover:bg-purple-900"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
      <div className=" hidden md:flex justify-center items-center">
        <img src={img} alt="" className=" lg:w-96 w-70  " />
      </div>
    </div>
  )
}

export default UserLogin