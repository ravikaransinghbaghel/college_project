import React, { useEffect } from 'react';
import { Massage, Sidebar } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getprofilebythunk, getusersfilebythunk } from '../store/userThunk';


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getprofilebythunk());
    dispatch(getusersfilebythunk());

  }, []);

  const { isAthentication, screenloading } = useSelector((state) => state.user);

  // Redirect if not authenticated
  useEffect(() => {
    console.log("home page = " + isAthentication, screenloading);
    if (!isAthentication && screenloading) {
      navigate('/login');
    }
  }, [isAthentication, screenloading]);

  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <Massage />
    </div>
  );
}

export default Home;
