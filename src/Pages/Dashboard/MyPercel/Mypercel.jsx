import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import useAuth from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Search, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const Mypercel = () => {
    const { user } = useAuth()
    const axios = useAxios()

    const { data: percel = [], refetch } = useQuery({
        queryKey: ['/percel', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/percel?email=${user?.email}`)
            // console.log(res.data);
            return res.data

        }
    })

    const handelPercelDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/percel/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                        refetch();
                    })



            }
        });
    }

    return (
        <div>

            <div className="overflow-x-auto">
                {
                    percel.length? <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Delivery Status</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            percel.map((d, i) => <tr key={d._id}>
                                <th>{i + 1}</th>

                                <td>{d?.parcelName}</td>
                                <td>{d?.cost}</td>
                                <td>pending</td>
                                <td>
                                    {
                                        d?.paymentStatus == 'paid'? "paid" :<Link to={`/dashboard/mypercel/${d._id}`}>
                                    <button className='btn  bg-[#caeb66] hover:bg-primary'>Pay</button>
                                   </Link>
                                    }
                                </td>
                                <td >


                                   
                                    <button className='btn mx-2 bg-[#e8f3f4]  '>Edit </button>
                                    <button
                                        onClick={() => handelPercelDelete(d._id)}
                                        className='btn text-red-700 bg-[#fceaea] '>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>:    <span>You have dont any percel </span>
                }
            </div>

        


        </div>
    );
};

export default Mypercel;