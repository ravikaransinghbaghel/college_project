import { Outlet } from 'react-router-dom'
import {Toaster } from 'react-hot-toast'

function App() {


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
