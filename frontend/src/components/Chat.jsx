import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMassageThunk } from '../store/MassageTHunk';

function Chat() {
  const { selectoruser, userProfile } = useSelector(state => state.user);
  const { massageState } = useSelector(state => state.massage); // You can rename this to messageState
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectoruser?._id && userProfile?._id) {
      dispatch(getMassageThunk({ recieverId: selectoruser._id })).unwrap();
    }
  }, [selectoruser, userProfile, dispatch(getMassageThunk)]);

  return (
    <>
      {
        massageState && massageState.length > 0 ? (
          massageState.map((msg, i) =>
            <div className='px-1' id={`${i}`} key={`${i}`}>
              <div className={`chat ${userProfile?._id === msg?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-header">
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg?.massage || 'No content'}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          )) : (
          <div className='text-center text-gray-400'>No Messages</div>
        )
      }
    </>
  );
}

export default Chat;
