import axios from 'axios'
import React,{useEffect} from 'react'
import axiosInstance from '../../axiosInstance'

const Dashbord = () => {
    // const accessToken= localStorage.getItem('access_token')
    useEffect(()=>{
    const fetchProtectedData=async()=>{
        try{
           const responce= await axiosInstance.get("/protected"//,{
          //   headers: {
          //       Authorization:`Bearer ${accessToken}`
          //   }
          //  }
          )
           console.log('Success', responce.data)
        }catch(error){
              console.error('error fetching data:', error)
        }
    }
    fetchProtectedData();
    },[])
  return (
    <div className='text-light container'>Dashbord</div>
  )
}

export default Dashbord