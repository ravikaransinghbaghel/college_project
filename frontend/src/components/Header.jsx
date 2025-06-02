import React from 'react';

function Header() {
    return (
        <div className="w-full bg-[rgb(29,35,42)] py-2 rounded-md">
            <div className=' flex max-w-[90%] justify-between mx-auto h-[10vh]'>
                <div className="logo">
                    <img className='h-full object-cover  rounded-[25px]' src="../../halchaal.webp" alt="logo" />
                </div>
                <h1 className='h-full flex items-center text-xl font-serif'>Ke Haal Chal</h1>

            </div>
        </div>
    );
}

export default Header;
