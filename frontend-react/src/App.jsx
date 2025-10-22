import { useState } from 'react'
import './App.css'
import './assets/CSS/style.css'
import Main from './components/Main'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Dummy from './components/Dummy'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>


   
    
      
    </>
  )
}

export default App
