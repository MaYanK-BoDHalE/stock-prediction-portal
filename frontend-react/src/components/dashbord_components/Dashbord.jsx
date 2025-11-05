import axios from 'axios'
import React,{useEffect, useState} from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons'


const Dashbord = () => {
  const [ticker,setTicker]= useState('')
  const [error,setError]= useState()
  const [loading,setLoading]= useState(false)
  const [plot,setPlot]= useState()
  const [ma100,setMa100]= useState()
  const [ma200,setMa200]= useState()
  const [predicted,setPredicted]= useState()
  const [mse,setMse]= useState()
  const [rmse,setRmse]= useState()
  const [r2score,setR2score]= useState()
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
    const handelSubmit=async(e)=>{
      e.preventDefault();
      setLoading(true);
      try{
        const response= await axiosInstance.post('/predict/', {ticker:ticker});
        console.log('Prediction Response:', response.data)
        // Set plot image URL from response

        const backendRoot= import.meta.env.VITE_BACKEND_ROOT;
        const plotUrl=`${backendRoot}${response.data.plot_image_url}`;
        console.log('Plot URL:', plotUrl);
        const ma100Url=`${backendRoot}${response.data.plot_100_dma_url}`;
        console.log('100 DMA URL:', ma100Url);
        const ma200Url=`${backendRoot}${response.data.plot_200_dma_url}`;
        console.log('200 DMA URL:', ma200Url);
        const predictedUrl=`${backendRoot}${response.data.plot_predict}`;
        console.log('Predicted Price URL:', predictedUrl);
        setMa200(ma200Url);
        setMa100(ma100Url);
        setPlot(plotUrl);
        setPredicted(predictedUrl);
        setMse(response.data.mse);
        setRmse(response.data.rmse);
        setR2score(response.data.r2_score);
       


        if (response.data.error){
          setError(response.data.error)
        }
      }catch(error){
        console.error('Error fetching prediction:', error)
      }finally{
        setLoading(false);
      }
    }
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form onSubmit={handelSubmit} >
            <input type="text" className='form- control ' placeholder='Enter stock ticker' 
            onChange={(e)=>setTicker(e.target.value)} required
            />
            <br />
            <small>{error && <div className='text-danger'>{error}</div>}</small>
            <br />
            <button type='submit' className='btn btn-info mt-3'>
              {loading ? <span><FontAwesomeIcon icon={faSpinner} spin />Loading...</span> : 'Predict'}
            </button>

          </form>
        </div>

        {/* Print predictin plots*/ }
        
        <div className='Prediction mt-5'>
          <div className='p-5'>
            {plot && (
              <div>
                <h3>Prediction Plot for {ticker.toUpperCase()}</h3>
                <img src={plot} alt={`Prediction plot for ${ticker}`} className='img-fluid'/>
              </div>
            )}
          </div>
        </div>
        {/* Plot of ma100  */}
        <div className='Prediction mt-5'>
          <div className='p-5'>
            {ma100 && (
              <div>
                <h3>Prediction Plot for ma100 {ticker.toUpperCase()}</h3>
                <img src={ma100} alt={`Prediction plot for ${ticker}`} className='img-fluid'/>
              </div>
            )}
          </div>
        </div>
        {/* Plot of ma200  */}
        <div className='Prediction mt-5'>
          <div className='p-5'>
            {ma200 && (
              <div>
                <h3>Prediction Plot for ma100 and ma200 {ticker.toUpperCase()}</h3>
                <img src={ma200} alt={`Prediction plot for ${ticker}`} className='img-fluid'/>
              </div>
            )}
          </div>
        </div>
        {/* Plot of predicted price  */}
        <div className='Prediction mt-5'>
          <div className='p-5'>
            {predicted && (
              <div>
                <h3>Predicted price for {ticker.toUpperCase()}</h3>
                <img src={predicted} alt={`Prediction plot for ${ticker}`} className='img-fluid'/>
              </div>
            )}
          </div>
        </div>

        <div className='tesct-light p-3'>

          <h4>Model Evalulation</h4>
          <p>Mean Squared error (MSE):{mse}</p>
          <p>Root Mean Squared Error (RMSE):{rmse}</p>
          <p>R2 Score:{r2score}</p>


        </div>


      </div>
    </div>
    </>
  )
}

export default Dashbord