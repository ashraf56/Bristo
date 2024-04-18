import React from 'react';
import Foodcard from './Foodcard';

const Ordeitem = ({ is }) => {
    return (
        <div>
            <div className='grid md:grid-cols-3 gap-y-9 py-6'>
                {is.map(i => <Foodcard
                    i={i}
                    key={i._id}
                ></Foodcard>)
                }

            </div>
        </div>
    );
};

export default Ordeitem;