import React, { useEffect, useState } from 'react';
import { set, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

const SendPercel = () => {
    const {user}=useAuth();
    const { handleSubmit, register, control, watch, formState: { errors } } = useForm();
    const [reginospromise, setreginospromise] = useState([])
    const [reginos, setreginos] = useState([]);
    const axiosSecure =useAxios();
    // console.log(reginospromise);
    const dublicateRegions = reginospromise.map(c => c.region)
    const singelRegions = [...new Set(dublicateRegions)]


    // const senderRegios= useWatch({control,name:"senderArea"})
    const senderRegion = watch("senderDistrict")
    const reciverRegion = watch("receiverDistrict")
    const parcelType = watch("parcelType");
    const disctritBYRegions = (regino) => {
        const discticts = reginospromise.filter(c => c.region === regino)
        const disctict = discticts.map(d => d.district)
        return disctict;

    }
    // console.log(singelRegions)
    useEffect(() => {
        fetch("/warehouses.json")
            .then(res => res.json())
            .then(d => setreginospromise(d))
    }, [])



    const handelPercel = (data) => {
        // console.log(data);
        const isDocument = data.parcelType == 'document';
        const percelWeight = parseFloat(data.parcelWeight)
        const isSameDistricts = data.senderDistrict == data.receiverDistrict
        let cost = 0;
        if (isDocument) {
            cost = isSameDistricts ? 60 : 110;
        }
        else {
            if (percelWeight < 3) {
                cost = isSameDistricts ? 60 : 150;
            }
            else {
                const minCharge = isDocument ? 110 : 150;
                const extraWeight = percelWeight - 3;
                const extraCharge = isSameDistricts ? extraWeight * 40 : extraWeight * 40 + 40
                cost = extraCharge + minCharge
            }
        }
        data.cost = cost
        console.log(data);
        // console.log('cost', data);
        Swal.fire({
            title: "Are you Sure?",
            text:`You Will pay ${cost} Taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Agree"
        }).then((result) => {
            if (result.isConfirmed) {
                 axiosSecure.post('/percel',data)
                 .then(res=>{
                    console.log(res.data);
                 })
                Swal.fire({
                   
                    title: "Order Conform",
                    text: "Your pay was success",
                    icon: "success"
                });
            }
        });


    }



    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-xl p-12">

                <h1 className="text-4xl font-bold text-gray-800">Send A Parcel</h1>
                <p className="text-gray-600 mt-2 text-lg">Enter your parcel details</p>

                <hr className="my-8" />

                <form onSubmit={handleSubmit(handelPercel)}>

                    {/* PARCEL TYPE */}
                    <div className="flex items-center gap-10 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="document"
                                {...register("parcelType", { required: true })}
                                className="radio radio-success"
                                defaultChecked
                            />
                            <span className="text-gray-700 font-semibold">Document</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("parcelType", { required: true })}
                                className="radio radio-success"
                            />
                            <span className="text-gray-700 font-semibold">Non-Document</span>
                        </label>
                    </div>

                    {/* PARCEL INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                        <div>
                            <input
                                
                                type="text"
                                placeholder="Parcel Name"
                                {...register("parcelName", { required: true })}
                                className="input input-bordered w-full rounded-xl h-14 px-4 shadow-sm"
                            />
                            {errors.parcelName && <p className="text-red-400">Required</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Parcel Weight (kg)"
                                {...register("parcelWeight", {
                                    required: parcelType === "document" ? false : "Weight is required"
                                })}
                                className="input input-bordered w-full rounded-xl h-14 px-4 shadow-sm"
                            />

                            {errors.parcelWeight && (
                                <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>
                            )}

                        </div>
                    </div>

                    {/* SENDER + RECEIVER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* SENDER */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sender Details</h2>

                            <div className="space-y-4">

                                <div>
                                    <input
                                    defaultValue={user?.displayName}
                                        type="text"
                                        placeholder="Sender Name"
                                        {...register("senderName", { required: true })}
                                        className="input input-bordered w-full rounded-xl h-14 px-4"
                                    />
                                    {errors.senderName && <p className="text-red-400">Required</p>}
                                </div>
                                <div>
                                    <input
                                    defaultValue={user?.email}
                                        type="email"
                                        placeholder="Sender Email"
                                        {...register("senderEmail", { required: true })}
                                        className="input input-bordered w-full rounded-xl h-14 px-4"
                                    />
                                    {errors?.senderEmail && <p className="text-red-400">Required</p>}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Sender Address"
                                        {...register("senderAddress", { required: true })}
                                        className="input input-bordered w-full rounded-xl h-14 px-4"
                                    />
                                    {errors?.senderAddress && <p className="text-red-400">Required</p>}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Sender Phone No"
                                        {...register("senderPhone", { required: true })}
                                        className="input input-bordered w-full rounded-xl h-14 px-4"
                                    />
                                    {errors.senderPhone && <p className="text-red-400">Required</p>}
                                </div>

                                <select
                                    {...register("senderDistrict", { required: true })}
                                    className="select select-bordered w-full rounded-xl h-14"
                                >
                                    <option value="">Select your District</option>
                                    {/* <option>Dhaka</option> */}
                                    {
                                        singelRegions.map((r, i) => <option value={r} key={i}>{r}</option>)
                                    }
                                </select>
                                {errors.senderDistrict && <p className="text-red-400">Required</p>}
                                <select
                                    {...register("senderArea", { required: true })}
                                    className="select select-bordered w-full rounded-xl h-14"
                                >
                                    <option value="">Select your Area</option>
                                    {/* <option>Dhaka</option> */}
                                    {
                                        disctritBYRegions(senderRegion).map((r, i) => <option value={r} key={i}>{r}</option>)
                                    }
                                </select>
                                {errors?.senderArea && <p className="text-red-400">Required</p>}

                                <textarea
                                    placeholder="Pickup Instruction"
                                    {...register("pickupInstruction")}
                                    className="textarea textarea-bordered w-full rounded-xl p-4 min-h-28"
                                ></textarea>

                            </div>
                        </div>

                        {/* RECEIVER */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Receiver Details</h2>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    {...register("receiverName", { required: true })}
                                    className="input input-bordered w-full rounded-xl h-14 px-4"
                                />
                                {errors.receiverName && <p className="text-red-400">Required</p>}
                                <input
                                    type="email"
                                    placeholder="Receiver Email"
                                    {...register("receiverEmail", { required: true })}
                                    className="input input-bordered w-full rounded-xl h-14 px-4"
                                />
                                {errors.receiverEmail && <p className="text-red-400">Required</p>}

                                <input
                                    type="text"
                                    placeholder="Receiver Address"
                                    {...register("receiverAddress", { required: true })}
                                    className="input input-bordered w-full rounded-xl h-14 px-4"
                                />
                                {errors.receiverAddress && <p className="text-red-400">Required</p>}

                                <input
                                    type="text"
                                    placeholder="Receiver Contact No"
                                    {...register("receiverPhone", { required: true })}
                                    className="input input-bordered w-full rounded-xl h-14 px-4"
                                />
                                {errors.receiverPhone && <p className="text-red-400">Required</p>}

                                <select
                                    {...register("receiverDistrict", { required: true })}
                                    className="select select-bordered w-full rounded-xl h-14"
                                >
                                    <option value="">Select your District</option>
                                    {
                                        singelRegions.map((r, i) => <option value={r} key={i}>{r}</option>)
                                    }
                                </select>
                                {errors.receiverDistrict && <p className="text-red-400">Required</p>}


                                <select
                                    {...register("reciverArea", { required: true })}
                                    className="select select-bordered w-full rounded-xl h-14"
                                >
                                    <option value="">Select your Area</option>
                                    {/* <option>Dhaka</option> */}
                                    {
                                        disctritBYRegions(reciverRegion).map((r, i) => <option value={r} key={i}>{r}</option>)
                                    }
                                </select>
                                {errors?.senderArea && <p className="text-red-400">Required</p>}
                                <textarea
                                    placeholder="Delivery Instruction"
                                    {...register("deliveryInstruction")}
                                    className="textarea textarea-bordered w-full rounded-xl min-h-28 p-4"
                                ></textarea>

                            </div>
                        </div>
                    </div>

                    <button className="btn bg-green-500 text-white w-full mt-8 rounded-xl h-14 text-lg">
                        Submit
                    </button>

                </form>

            </div>
        </div>
    );
};

export default SendPercel;
