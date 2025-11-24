import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
// import LogInFrom from '../../Comeponents/Shared/LogInFrom';

const LogIn = () => {
    const navigate =useNavigate()
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const { user, signIn, createUser, signInWithGoogle } = useAuth();
    const handeelLogIN = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                toast.success("You Are SuccessFully Create Account")
            })
            .catch(err => {
                console.log(err);
            })
    }
     const handeelgoogle = (data) => {
        signInWithGoogle()
            .then(result => {
                toast.success("You Are SuccessFully Create Account")
            })
            .catch(err => {
                console.log(err);
            })
    }
       if(user){
        navigate('/')
    }
    return (
        <div className="w-full max-w-md">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
            <p className="text-gray-600 mb-6">Login with ZapShift</p>

            {/* Email */}
            <form onSubmit={handleSubmit(handeelLogIN)} >
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none"
                />
                {errors.email?.type === "required" && <span className='text-red-400'>This field is required</span>}

                {/* Password */}
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                    {...register("password", { required: true, minLength: 6 })}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none"
                />
                {errors.password?.type === "required" && <span className='text-red-400'>This field is required</span>}
                {errors.password?.type === "minLength" && <span className='text-red-400'>This Should be 6 lenth</span>}

                <p className="text-sm text-gray-500 hover:underline cursor-pointer mb-4">
                    Forget Password?
                </p>

                {/* Login Button */}
                <button className="w-full bg-[#c7f36c] hover:bg-[#b8e85a] rounded-md py-2 font-semibold text-black mb-3">
                    Login
                </button>
            </form>

            {/* Register link */}
            <p className="text-sm text-gray-600 mb-3">
                Don’t have any account?{" "}
                <Link to="/register" className="text-green-600 font-semibold">
                    Sing Up
                </Link>
            </p>

            {/* OR divider */}
            <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-gray-300"></div>
                <p className="text-gray-500 text-sm">Or</p>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button onClick={handeelgoogle} className="w-full rounded-md bg-gray-100 py-2 flex items-center justify-center gap-2 border border-gray-200">
                {/* <img src={googleLogo} alt="google" className="w-5 h-5" /> */}
                {/* <OctagonAlert /> */}
                <span className="text-sm">Login with google</span>
            </button>
        </div>

    );
};

export default LogIn;