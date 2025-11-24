import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <img src={logo} alt=""  />
                <h1 className='font-bold text-xl ms-[-10px] mt-3'>ZapShift</h1>
            </div>
            
        </div>
    );
};

export default Logo;