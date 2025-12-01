import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';
import Spiner from '../Comeponents/Spiner/Spiner';

const AdminRoute = ({ children }) => {
    const {user,loading}= useAuth();
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (loading || roleLoading) return <Spiner></Spiner>
      if (role.role !== 'admin'){
        return navigate('/')
      }
    return children;
};

export default AdminRoute;