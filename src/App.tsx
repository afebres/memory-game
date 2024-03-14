import React from 'react'
import './App.css'
import Home from './views/Home'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer hideProgressBar={true} autoClose={10000} />
      <Provider store={store}>
        <div className='App'>
          <Home />
        </div>
      </Provider>
    </>
  )
}

export default App
