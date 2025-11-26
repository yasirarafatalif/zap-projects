import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { data, useParams } from 'react-router';

const Payment = () => {
    const axois = useAxios()
    const {id}=useParams();
    console.log(id);
    const {data:percel=[]}= useQuery({
        queryKey: ['percel', id],
        queryFn: async()=>{
            const res = await axois.get(`/percel/${id}`)
            
            return res.data;
        }
    })
   console.log(percel);
    const [method, setMethod] = useState("Card");



  const product = {
    name: "Premium Course Access",
    description: "Get lifetime access to all modules, updates and certificates.",
    price: 120,
  };

  return (
   <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
  <div className="w-full flex flex-col lg:flex-row gap-6">

    {/* Product Details */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full lg:w-1/3">
      <h2 className="text-2xl font-bold text-gray-800">{percel?.parcelName}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <p className="text-xl font-semibold mt-3 text-indigo-600">
        Price: ${percel?.cost}
      </p>
    </div>

    {/* Payment Section */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full lg:w-1/3 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Payment Information</h2>

      <div>
        <span className="font-medium text-gray-700">Select Payment Method</span>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {["Bkash", "Nagad", "Card", "PayPal"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`py-2 px-3 rounded-xl border shadow-sm text-sm font-medium transition ${
                method === m
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Card Info */}
      {method === "Card" && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 text-lg">Card Details</h3>

          <input
            type="text"
            placeholder="Card Number"
            className="input input-bordered w-full rounded-xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="input input-bordered w-full rounded-xl"
            />
            <input
              type="text"
              placeholder="CVV"
              className="input input-bordered w-full rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Bkash/Nagad */}
      {(method === "Bkash" || method === "Nagad") && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 text-lg">{method} Number</h3>

          <input
            type="text"
            placeholder={`Enter your ${method} number`}
            className="input input-bordered w-full rounded-xl"
          />
        </div>
      )}

      {/* PayPal */}
      {method === "PayPal" && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700 text-lg">PayPal Email</h3>

          <input
            type="email"
            placeholder="Enter PayPal email"
            className="input input-bordered w-full rounded-xl"
          />
        </div>
      )}

      <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-xl text-lg py-3 shadow-md">
        Confirm Payment
      </button>
    </div>

    {/* Summary */}
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full lg:w-1/3">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Summary</h2>

      <div className="space-y-2 text-gray-700">
        <p className="flex justify-between">
          <span>Product Price:</span>
          <span>${percel?.cost}</span>
        </p>

        <p className="flex justify-between">
          <span>Service Charge:</span>
          <span>$5</span>
        </p>

        <hr className="my-2" />

        <p className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span>${product.price + 5}</span>
        </p>
      </div>

      <button className="btn bg-gray-800 hover:bg-black text-white w-full mt-6 rounded-xl py-3 shadow-md">
        Download Invoice
      </button>
    </div>

  </div>
</div>

  );
};

export default Payment;