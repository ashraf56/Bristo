import React from 'react';
import Menuitems from './Menuitems';
import Cover from '../Pages/Cover/Cover';
import SETTitle from './SETTitle';
import { Link } from 'react-router-dom';


const MainCategory = ({ items, title, img }) => {
    return (
        <div>

            {
                title &&
                <Cover
                    img={img}
                    title={title}
                ></Cover>
            }



            <div className='grid md:grid-cols-2 justify-between'>
                {
                    items.map(item =>

                        <Menuitems
                            key={item._id}
                            item={item}
                        ></Menuitems>


                    )
                }
            </div>

            <Link to={`/order/${title}`}>
                <button className='btn btn-warning'>Show all</button>
            </Link>
        </div>
    );
};

export default MainCategory;