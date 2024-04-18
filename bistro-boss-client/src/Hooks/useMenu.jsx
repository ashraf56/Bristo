import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const useMenu = () => {
    // let [menu,setmenu]=useState([])
    // let [loding,setLoading]=useState(true)

    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(r=> r.json())
    //     .then(data=>{
    //         setmenu(data)
    //         setLoading(false)
    //     })
    // },[])

    let { data: menu = [], isloading: loding, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            let res = await fetch('http://localhost:5000/menu');

            return res.json()
        }


    })

    return [menu, loding, refetch];
};

export default useMenu;