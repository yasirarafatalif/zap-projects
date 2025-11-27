import { Truck } from 'lucide-react';
import React from 'react';




const steps = [
  {
    title: "Booking Pick & Drop",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const Work = () => {
   return (
    <div className="px-6 md:px-16 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        How it Works
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <Truck className="w-10 h-10 text-teal-700 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;