import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { About, Home, Login, SignUp } from './components'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Forgot from './components/Forgot.jsx'
import Emailverify from './components/EmailVerify.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/forgot",
        element: <Forgot />
      },
      {
        path: "/verify",
        element: <Emailverify />
      },
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
