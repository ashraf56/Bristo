import { useContext } from "react";
import { ContextAuth } from "../Authentication/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

let useCart = () => {
  let { user, loader } = useContext(ContextAuth);
  let [axiosSecure] = useAxiosSecure();
  // let token=localStorage.getItem('boss-token')

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    enabled: !!user?.email && !!localStorage.getItem("boss-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`)

      return res.data;
    },

  })


  return [cart, refetch]
}

export default useCart;



// queryFn: async () => {
//     const response = await fetch(`http://localhost:5000/cart?email=${user?.email}`,{
//   headers:{
//     authorization: `bearer ${token}`
//   }
//     })

//     return response.json()
//   },