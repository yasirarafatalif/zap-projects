import React, { use } from 'react';

import HomeSlider from '../Slider/HomeSlider';
import Reviews from '../Reviews/Reviews';
import HomeServices from '../HomeServices/HomeServices';
import FQAQuestion from './FQA/FQAQuestion';
import useAuth from '../../Hooks/useAuth';
import Work from '../How It Work/Work';


const Home = () => {
  const {user}=useAuth()
  // console.log(user);

  return (
    <div className='gap-y-6'>
      <Work></Work>
     
      <Reviews ></Reviews>
      <HomeServices></HomeServices>
       <HomeSlider ></HomeSlider>

      <FQAQuestion></FQAQuestion>




    </div>
  );
};

export default Home;