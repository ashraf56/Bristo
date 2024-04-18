import React, { useContext } from 'react';
import { ContextAuth } from '../Authentication/Authprovider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
  let { user } = useContext(ContextAuth)
  let [axiosSecure] = useAxiosSecure()

  const { data: isAdmin, isLoading: loading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !!user?.email && !!localStorage.getItem("boss-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`)

      return res.data.admin;
    },

  })


  return [isAdmin, loading]

};

export default useAdmin;