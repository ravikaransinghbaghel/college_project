import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { emailverifybythunk } from '../store/userThunk';
import { IoIosClose } from 'react-icons/io';
import Header from './Header';

function Emailverify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        emailOtp: "",
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
            await dispatch(emailverifybythunk(login)).unwrap();
            toast.success('email verify successful');

            navigate('/')

        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'email verify failed ');
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content  flex-col">
                    <Header />
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pr-2">
                        <div className="flex justify-between pt-4 pl-4 text-2xl">
                            <h1 className="">verify email !!</h1>
                            <h1 onClick={() => { navigate('/signup') }}><IoIosClose /></h1>
                        </div>
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">OTP</span>
                                </label>
                                <input type="text" name='emailOtp' placeholder="email OTP" className="input input-bordered" required onChange={handleChange} />
                            </div>

                            <div className="form-control mt-6">
                                <button onClick={handleClick} className="btn btn-primary">verify</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Emailverify;
