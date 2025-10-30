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
import AuthProvider from './AuthProvider'
import Dashbord from './components/dashbord_components/Dashbord'
import PrivateRout from './PrivateRout'
import PublicRout from './PublicRout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/register' element={<PublicRout><Register/></PublicRout>}/>
      <Route path='/login' element={<PublicRout><Login/></PublicRout>}/>
      <Route path='/dashbord' element={<PrivateRout><Dashbord/></PrivateRout>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AuthProvider>


   
    
      
    </>
  )
}

export default App
