import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { logoutbythunk, searchbythunk } from '../store/userThunk';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function sidebar({ onclick }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setquery] = useState('');
    const { userProfile, users, hidden } = useSelector(state => state.user);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await dispatch(logoutbythunk());
            toast.success('Logout successful');

        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'Logout failed');
        }
    };

    const searchquery = (e) => {
        setquery(() => (e.target.value))
        console.log(query);
        dispatch(searchbythunk(query))
    }

    return (
        <div className={`${hidden == 'sidebar' ? 'hidden' : 'block'} w-full sm:block sm:w-[25%] h-full `}>
            <div className="flex justify-center items-center w-[99%] h-11 rounded-md bg-[rgb(29,35,42)] text-xl font-serif">
                Ke-Haal-Chal
            </div>
            <div className="search flex justify-center pt-2">
                <label className="input input-bordered flex w-[99%] items-center gap-2">
                    <input type="text"
                        className="grow"
                        name='search'
                        placeholder="Search"
                        value={query}
                        onChange={searchquery}
                    />
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
