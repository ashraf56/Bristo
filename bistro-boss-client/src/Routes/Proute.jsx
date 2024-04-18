import React, { useContext } from 'react';
import { ContextAuth } from '../Authentication/Authprovider';
import { Navigate, NavigationType } from 'react-router-dom';

const Proute = ({ children }) => {
    let { user, loader } = useContext(ContextAuth)
    if (loader) {
        return <progress className="progress bg-slate-100  w-56"></progress>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' replace></Navigate>

};

export default Proute;