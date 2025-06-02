import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import socket from './components/socket';
import { useSelector } from 'react-redux';

function App() {

  const { userProfile } = useSelector(state => state.user);

  useEffect(() => {
    if (userProfile?._id) {
      socket.emit('user_connected', userProfile._id);
    }
  }, [userProfile]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Outlet />
    </>
  )
}

export default App
