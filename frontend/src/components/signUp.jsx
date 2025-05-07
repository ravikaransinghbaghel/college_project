import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerbythunk } from '../store/userThunk'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function signUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAthentication);
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        fullname: "",
        gender: "",
        email: "",

    });
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);;


    const handleChange = (e) => {
        setSignup((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,

        }))

        console.log(signup)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerbythunk(signup)).unwrap();
            toast.success('signup successful');
            // console.log('signup response:', res);

        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'signup failed');
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen ">
                <div className="hero-content flex-col  lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name='fullname' placeholder="full name" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">username</span>
                                </label>
                                <input type="email" name='username' placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required onChange={handleChange} />

                            </div>
                            <div className="form-control flex gap-4">
                                <label className="label">
                                    <span className="label-text">male</span>
                                </label>
                                <input type="radio" name="gender" className="radio radio-accent" value="male" onChange={handleChange} />

                                <label className="label">
                                    <span className="label-text">female</span>
                                </label>
                                <input type="radio" name="gender" className="radio radio-accent" value="female" onChange={handleChange} />

                            </div>

                            <div className="form-control mt-6">
                                <button onClick={handleClick} className="btn btn-primary">Sign up</button>
                            </div>
                            <p className='font-bold'>alleady have a account please <Link to="/login" className='underline text-blue-600 '>login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default signUp;
