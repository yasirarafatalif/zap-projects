import React from 'react';
import riderImage from '../../assets/agent-pending.png'

const RiderFrom = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center items-start">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT CONTENT */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Be a Rider</h1>
                    <p className="text-gray-600 mt-2">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>


                    <hr className="my-8" />


                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                        Tell us about yourself
                    </h2>


                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
                            <input type="text" placeholder="Your age" className="input input-bordered w-full" />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
                            <select className="select select-bordered w-full">
                                <option>Select your District</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Rajshahi</option>
                            </select>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="text" placeholder="NID" className="input input-bordered w-full" />
                            <input type="text" placeholder="Contact" className="input input-bordered w-full" />
                        </div>


                        <select className="select select-bordered w-full">
                            <option>Select wire-house</option>
                            <option>Warehouse A</option>
                            <option>Warehouse B</option>
                        </select>


                        <button className="btn w-full bg-lime-300 text-gray-900 hover:bg-lime-400">
                            Submit
                        </button>
                    </form>
                </div>


                {/* RIGHT IMAGE */}
                <div className="flex justify-center items-center">
                    <img
                        src={riderImage}
                        alt="Rider Illustration"
                        className="w-80 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default RiderFrom;