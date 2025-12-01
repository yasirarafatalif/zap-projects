import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';

const RiderCheck = () => {
    const axiosSecure = useAxios();
    const { data: parcel = [] , refetch} = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })
    const handelApprove = (id) => {
        const roleUpdate = {
            status: 'rider'
        }

        Swal.fire({
            title: "Are you Sure?",
            text: `You Request Checking`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Agree"
        }).then((result) => {
            refetch()
            axiosSecure.patch(`/riders/${id}`, roleUpdate)
                .then(res => {
                    if (res.data.modifiedCount) {
                        if (result.isConfirmed) {
                            Swal.fire({

                                title: "Confirme",
                                text: "We are chcking your detalis",
                                icon: "success"
                            });
                        }

                    }

                })
        });


    }

      const handelRejects = (id) => {
          Swal.fire({
            title: "Are you Sure?",
            text: `You Request Checking`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Agree"
        }).then((result) => {
            axiosSecure.delete(`/riders/${id}`)
                .then(res => {
                    refetch()
                    // console.log(res.data);
                    if (res.data.deletedCount) {
                        if (result.isConfirmed) {
                            Swal.fire({

                                title: "Confirme",
                                text: "We are delete your request",
                                icon: "success"
                            });
                        }

                    }

                })
        });
      }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>NID Number</th>
                            <th>location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcel.map((d, i) => (<tr key={d._id}>
                                <th>{i + 1}</th>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.nid}</td>
                                <td>{d?.district}</td>
                                <td>{d.status}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                    <button
                                        onClick={() => handelApprove(d._id)}
                                        className="btn btn-ghost bg-green-300 mx-3 btn-xs">Approve</button>
                                    <button
                                    onClick={()=>handelRejects(d._id)}
                                    className="btn btn-ghost bg-red-400 btn-xs">Rejects</button>

                                </td>

                            </tr>))

                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default RiderCheck;