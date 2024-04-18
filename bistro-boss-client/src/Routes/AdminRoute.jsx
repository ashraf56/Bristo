import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ContextAuth } from '../Authentication/Authprovider';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    let { user, loader } = useContext(ContextAuth)
    let [isAdmin, isADminLoading] = useAdmin();
    let location = useLocation()
    if (loader || isADminLoading) {
        return <progress className="progress bg-red-100 w-56"></progress>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;