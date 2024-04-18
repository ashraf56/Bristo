import React, { useEffect, useState } from 'react';
import SETTitle from './SETTitle';
import Menuitems from './Menuitems';
import useMenu from '../Hooks/useMenu';

const Populer = () => {
    let [menu] = useMenu();
    let populer = menu.filter(i => i.category === 'popular')
    return (
        <section className='my-28'>
            <SETTitle
                heading={"Populer "}

            ></SETTitle>
            <div className='grid md:grid-cols-2 justify-between'>
                {
                    populer.map(item =>

                        <Menuitems
                            key={item._id}
                            item={item}
                        ></Menuitems>


                    )
                }
            </div>
        </section>
    );
};

export default Populer;