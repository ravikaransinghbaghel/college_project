import React, { useState, useEffect } from 'react';
import User from './User';
import Chat from './Chat';
import { IoIosSend } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { sendMassageThunk } from '../store/MassageTHunk';

function Massage() {
  const dispatch = useDispatch();
  const { selectoruser, userProfile } = useSelector(state => state.user);
  // const { massageState } = useSelector(state => state.massage);
  const [massage, setMassage] = useState({
    massagetext: '',
  });

  // // Update sender/receiver info
  // useEffect(() => {
  //   if (selectoruser?._id && userProfile?._id) {
  //     setMassage(prev => ({
  //       ...prev,
  //       // recieverId: selectoruser?._id,
  //       senderId: userProfile?._id
  //     }));
  //   }
  // }, [selectoruser, userProfile]);



  const handleChange = (e) => {
    setMassage(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendMassageThunk({
        recieverId: selectoruser?._id,
        massage:massagetext,

      }));

      setMassage(prev => ({
        ...prev,
        massage: ''
      }));
    } catch (err) {
      console.error(err);
    }

  };



  return (
    <div className='w-[75%] h-full'>
      <div className="user w-full max-h-fit pl-5 bg-gray-700 rounded-md">
        {selectoruser ? <User user={selectoruser} /> : <User />}
      </div>

      <div className=" pt-5 h-[80%] overflow-y-scroll">
        <Chat />
      </div>

      <div className="send w-full h-[10%] flex items-center justify-around gap-2 px-2">
        <input
          type="text"
          name='massagetext'
          placeholder="Type here"
          className="input input-bordered w-[90%] rounded-lg"
          onChange={handleChange}
        />

        <button className="btn btn-active btn-primary text-3xl rounded-lg" onClick={sendMessage}>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default Massage;
