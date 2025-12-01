import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';

const UserMenagment = () => {
    const axiosSecure= useAxios();
    const {data: percels=[], refetch}= useQuery({
        queryKey:['user-role'],
        queryFn: async ()=>{
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })
    const handelApprove= (user)=>{
       const userRole= {
        role: 'admin'
       }
       axiosSecure.patch(`/users/${user?._id}` ,userRole)
       .then(res=>{
        refetch()
         Swal.fire({
                    title: "Are you Sure?",
                    text: `${user?.display_name} set as Admin`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, I Agree"
                })
       })
    }


      const handelRejects= (user)=>{
       const userRole= {
        role: 'user'
       }
       axiosSecure.patch(`/users/${user?._id}` ,userRole)
       .then(res=>{
        refetch()
         Swal.fire({
                    title: "Are you Sure?",
                    text: `${user?.display_name} set as User`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, I Agree"
                })
       })
    }

    // console.log(percels);
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               No:
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Ststus</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            percels.map((percel,i)=>(<tr key={percel._id}>
                            <th>
                                {i+1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                            src={percel?.photoURl || "https://img.daisyui.com/images/profile/demo/2@94.webp" }
                                                
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{percel.display_name}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                              {percel?.email}
                            </td>
                            <td>{percel?.role}</td>
                            <th>
                                <button 
                                onClick={()=>handelApprove(percel)}
                                className="btn btn-ghost bg-green-300 btn-xs">Approve</button>
                                <button 
                                onClick={()=>handelRejects(percel)}
                                className="btn btn-ghost bg-red-400 mx-3 btn-xs">Rejects</button>
                                <button className="btn btn-ghost bg-amber-300 btn-xs">Details</button>
                            </th>
                        </tr>))
                        }
                     
                    </tbody>
                    {/* foot */}
               
                </table>
            </div>

        </div>
    );
};

export default UserMenagment;