import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginbythunk } from '../store/userThunk';

function login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAthentication,screenloading } = useSelector((state) => state.user);

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    useEffect(() => {
        console.log("login page " + isAthentication , screenloading);
        if (isAthentication ) {
            navigate('/');
        }
    }, [isAthentication]);

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
            //   console.log(res.success);

            //   if( res.success===true){
            //         navigate('/');
            //   }
            // navigate to dashboard or home if needed
        } catch (err) {
            console.error(err);
            toast.error(err?.message || 'Login failed');
        }
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content  flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='username' placeholder="email" className="input input-bordered" required onChange={handleChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required onChange={handleChange} />
                                <label className="label text-red-300 ">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
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
