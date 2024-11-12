import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Products from './Components/Products';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <Router>
      <div>
      <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            },
          }}
        />
        <Routes>
          <Route path='/' element={<Products/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
