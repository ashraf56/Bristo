import React from 'react';

const SETTitle = ({ subtitle, heading }) => {
    return (

        <div className="mx-auto text-center text-white md:w-4/12 my-8">
            <p className="text-yellow-600 mb-2">--- {subtitle} ---</p>
            <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>

    );
};

export default SETTitle;