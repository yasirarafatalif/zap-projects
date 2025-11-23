import React, { useEffect, useRef, useState } from 'react';
import Container from '../../Comeponents/Shared/Container';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Contact = () => {
    const [data, setData] = useState([]);
    const mapref = useRef(null)
    console.log(data);

    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(d => setData(d));
    }, []);

    const handelSubmit = (e) => {
        e.preventDefault()
        const location = e.target.loc.value;
        const disrict = data.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
        if (disrict) {
            const corrd = [disrict.latitude, disrict.longitude]
            mapref.current.flyTo(corrd, 13)

        }
    }
    const position = [23.6850, 90.3563]
    return (

        <Container>
            <div>






                <div className="w-full flex flex-col items-center">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b3b40] text-center">
                        We are available in 64 districts
                    </h2>

                    <form onSubmit={handelSubmit} className="mt-4 flex items-center w-full max-w-xl bg-base-200 rounded-full p-2 shadow-sm">

                        {/* Search Icon */}
                        <label className="px-3 text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                />
                            </svg>
                        </label>

                        {/* Input */}
                        <input
                            type="text"
                            name="loc"
                            placeholder="Search here"
                            className="input w-full bg-transparent "
                        />

                        {/* Button */}
                        <button
                            type="submit"
                            className="btn bg-[#c7f36c] hover:bg-[#b4e65c] text-black rounded-full px-6"
                        >
                            Search
                        </button>
                    </form>

                </div>


                <div className='w-full h-[800px] '>
                    <MapContainer center={position} zoom={8}
                        ref={mapref}
                        scrollWheelZoom={false}
                        className='h-[800px]'
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            data.map((location, index) =>
                                <Marker
                                    key={index}
                                    position={[location.latitude, location.longitude]}>
                                    <Popup>
                                        {location.distict} <br /> {location.covered_area.join(',')}.
                                    </Popup>
                                </Marker>
                            )
                        }
                    </MapContainer>
                </div>
            </div>
        </Container>
    );

};

export default Contact;