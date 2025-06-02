import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerbythunk } from '../store/userThunk'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header';

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
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/verify');
        }
    }, [isAuthenticated]);;


    const handleChange = (e) => {
        setSignup((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,

        }))

        // console.log(signup)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerbythunk(signup)).unwrap();
            toast.success('signup successful \n email verify code in your email');
            // console.log('signup response:', res);

        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'signup failed');
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen ">
                <div className="hero-content flex-col">
                    <Header />
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="pt-4 pl-4 text-2xl">Sign Up !!</h1>
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
                                <input type="text" name='username' placeholder="username" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type={show ? 'text' : 'password'} name='password' placeholder="password" required onChange={handleChange} />
                                    <span onClick={() => setShow(!show)}>
                                        {show ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </label>

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
