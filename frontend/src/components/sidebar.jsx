import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutbythunk } from '../store/userThunk';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userProfile } = useSelector(state => state.user);
    // console.log('User in Sidebar:', userProfile);
    const { users } = useSelector(state => state.user);
    // console.log('User in Sidebar:', users);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(logoutbythunk()); // 🔥 unwrap directly gives resolved value or throws error
            toast.success('Logout successful');
            // console.log('Logout response:', res);

            // Navigate after successful logout
            navigate('/login');
        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'Logout failed');
        }
    };

    return (
        <div className='w-[25%] h-full '>
            <div className="flex justify-center w-[99%] h-11 rounded-md bg-black text-white">
                whatapp
            </div>
            <div className="search flex justify-center pt-2">
                <label className="input input-bordered flex w-[99%] items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <CiSearch />
                </label>
            </div>
            <div className="m-4 h-[70%] overflow-y-scroll">
                {
                    users && users.map((user, index) => (
                        <User key={index} user={user} />

                    ))
                }
            </div>
            {userProfile && (
                <div className="logout w-full mt-5 bg-[#484646] flex justify-around items-center h-20">
                    <div className="avatar avatar-online">
                        <div className="w-16 rounded-full">
                            <img src={userProfile.avatar} />
                        </div>
                    </div>
                    <button className="btn btn-primary rounded-lg px-10" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}

        </div>
    );
}

export default sidebar;
