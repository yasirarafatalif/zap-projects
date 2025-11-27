import React from 'react';
import Logo from '../../Comeponents/Shared/Logo';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const About = () => {
    const axios = useAxios();
    const {data:percel=[], isLoading}= useQuery({
        queryKey:['/homepercel'],
        queryFn: async()=>{
            const res = await axios.get('/percel')
            console.log(res.data);
        }

    })
    return (
        <div className='flex items-center'>
           <Logo></Logo>
            
        </div>
    );
};

export default About;