import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMassageThunk } from '../store/MassageTHunk';
import socket from './socket'

function Chat({ sendMass }) {
  const [messages, setMessages] = useState([]);
  const { selectoruser, userProfile } = useSelector(state => state.user);
  const { massageState, chackMassage } = useSelector(state => state.massage);
  const dispatch = useDispatch();
  // console.log(chackMassage)

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on('receive_massage', (data) => {
      console.log('New private message:', data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_massage'); // Clean up
    };
  }, []);

  useEffect(() => {
    if (selectoruser?._id && userProfile?._id) {
      dispatch(getMassageThunk({ recieverId: selectoruser._id }));
    }
  }, [selectoruser, dispatch, sendMass]);

  const allMassage = [...massageState, ...messages]
  console.log(allMassage);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [massageState, allMassage]);

  function formatTime(dateStr) {
    const date = new Date(dateStr);
    const time = date.toLocaleTimeString("en-IN", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const day = date.toLocaleDateString("en-IN", { weekday: "long" });
    return `${time} - ${day}`;
  }





  return (
    <>
      <div
        className=" flex flex-col gap-2"
      >
        {
          chackMassage && allMassage.length > 0 ? (
            allMassage.map((msg, i) =>
              <div className='px-1' id={`${i}`} key={`${i}`}>
                <div className={`chat ${userProfile?._id === msg?.senderId ? 'chat-end' : 'chat-start'}`}>
                  <div className="chat-header">
                    <time className="text-xs opacity-50">{formatTime(msg?.createdAt)}</time>
                  </div>
                  <div className="chat-bubble">{msg?.massage || 'No content'}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              </div>
            )) : (
            <div className='text-center text-gray-400'>No Messages</div>
          )
        }
        <div ref={bottomRef} />
      </div>
    </>
  );
}

export default Chat;
