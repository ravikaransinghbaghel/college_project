import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginbythunk } from '../store/userThunk';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './Header';

function login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAthentication, screenloading } = useSelector((state) => state.user);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);
    useEffect(() => {
        // console.log("login page " + isAthentication, screenloading);
        if (isAthentication && !screenloading) {
            navigate('/');
        }
    }, [isAthentication, screenloading]);

    const handleChange = (e) => {
        setLogin((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginbythunk(login)).unwrap();
            toast.success('Login successful');
        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'Login failed');
        }
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content  flex-col ">
                    <Header />
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="pt-4 pl-4 text-2xl">login !!</h1>
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required onChange={handleChange} />
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
                            <label className="label text-red-300 pt-5">
                                <Link to="/forgot" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                            <div className="form-control mt-6">
                                <button onClick={handleClick} className="btn btn-primary">Login</button>
                            </div>
                            <p className='font-bold'>do not have a account please <Link to="/signup" className='underline text-blue-600 '>sign up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default login;
