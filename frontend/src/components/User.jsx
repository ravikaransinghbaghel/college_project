import React from 'react';
import { setSelectorUser,sidebarHidden } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function User({ user }) {
    // const { avatar, fullname, username } = user;
    const dispatch = useDispatch();
    const { selectoruser } = useSelector(state => state.user);
    // console.log('User in User Component:', selectoruser,user);


    const selectUser = () => {
        dispatch(setSelectorUser(user));
        dispatch(sidebarHidden());
    }

    return (
        <div onClick={selectUser} className={`flex py-3 gap-5 items-center hover:bg-gray-700 rounded-lg ${user?._id === selectoruser?._id && "bg-slate-700"}`}>
            <div className="avatar avatar-online">
                <div className="w-12 rounded-full">
                    <img src={user?.avatar} />
                </div>
            </div>
            <div className="name">
                <h3>{user?.fullname}</h3>
                <h6>{user?.username}</h6>
            </div>
        </div>
    );
}

export default User;
