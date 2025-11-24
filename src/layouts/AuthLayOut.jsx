import React from 'react';
import Logo from '../Comeponents/Shared/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayOut = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 flex flex-col px-6 md:px-20 py-8 md:py-10">

                {/* Logo */}
                <div className="mb-8 md:mb-10">
                    <Logo />
                </div>

                {/* Form Area */}
                <div className="flex justify-center items-start">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* VERTICAL LINE (only for desktop) */}
            <div className="hidden md:block w-[2px] bg-gray-200"></div>

            {/* RIGHT SIDE IMAGE AREA */}
            <div className="w-full md:w-1/2 bg-[#fafdf0] flex justify-center items-center py-10 md:py-0">
                <img 
                    src={authImage} 
                    alt="auth" 
                    className="max-w-xs sm:max-w-sm md:max-w-md"
                />
            </div>

        </div>
    );
};

export default AuthLayOut;
