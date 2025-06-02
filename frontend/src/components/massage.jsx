import React, { useState, useEffect } from 'react';
import User from './User';
import Chat from './Chat';
import toast from 'react-hot-toast';
import { IoIosSend } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";
import { sendMassageThunk } from '../store/MassageTHunk';
import { massageHidden } from '../store/userSlice';
import socket from './socket'

function Massage() {
  const dispatch = useDispatch();
  const { selectoruser, hidden ,userProfile} = useSelector(state => state.user);
  // const { massageState } = useSelector(state => state.massage);
  const [massage, setMassage] = useState({
    massagetext: '',
  });

  const handleChange = (e) => {
    setMassage(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessage = async (e) => {
    // e.preventDefault();
    try {
      await dispatch(sendMassageThunk({
        recieverId: selectoruser?._id,
        massage: massage.massagetext,

      }));

      socket.emit('massage', {
        senderId: userProfile?._id,     
        receiverId: selectoruser?._id,
        massage: massage.massagetext,
      });

      setMassage(prev => ({
        ...prev,
        massagetext: ''
      }));
    } catch (err) {
      toast.error(err?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    // console.log("Selector user changed:", selectoruser);
    setMassage((prev) => ({
      ...prev,
      massagetext: ''
    }));
  }, [selectoruser]);

  return (
    <div className={`${hidden == 'massage' ? 'hidden' : 'block'} w-full sm:block sm:w-[75%] h-full`}>
      <div className="user w-full max-h-fit pl-5 bg-gray-700 rounded-md flex gap-7 items-center">
        <div onClick={() => { dispatch(massageHidden()) }} className=""><FaArrowLeftLong /></div>
        {selectoruser ? <User user={selectoruser} /> : <User />}
      </div>

      <div className=" pt-5 h-[80%] overflow-y-scroll">
        <Chat sendMass={sendMessage}/>
      </div>

      <div className="send w-full h-[10%] flex items-center justify-around gap-2 px-2">
        <input
          type="text"
          name='massagetext'
          value={massage.massagetext}
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
