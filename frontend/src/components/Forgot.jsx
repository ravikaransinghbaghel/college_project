import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassbythunk } from '../store/userThunk';
import {  IoIosClose } from 'react-icons/io';

function Forgot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setLogin((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(forgotPassbythunk(login)).unwrap();
            toast.success('forgot password successful \n password is in your eamil');

            navigate('/login')

        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'forgot password failed ');
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content  flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pr-2">
                        <div className="flex justify-between pt-4 pl-4 text-2xl">
                            <h1 className="">Forgot password !!</h1>
                            <h1 onClick={()=>{navigate('/login')}}><IoIosClose /></h1>
                        </div>
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>

                            <div className="form-control mt-6">
                                <button onClick={handleClick} className="btn btn-primary">forgot</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;
