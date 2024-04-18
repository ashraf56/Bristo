import React from 'react';

const Menuitems = ({ item }) => {
    let { image, name, price } = item
    return (
        <div>
            <div className=' border flex  border-solid border-slate-200'>
                <div className='card-body  flex space-x-2'>
                    <img src={image} style={{ borderRadius: '0 200px 200px 200px' }} className="w-[100px]" />
                    <div className="card-title uppercase">
                        {name}
                    </div>
                    <div className="card-side">
                        <p>{price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menuitems;