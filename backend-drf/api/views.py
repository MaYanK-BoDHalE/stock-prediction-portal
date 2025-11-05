from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from .serializers import StockPredictionSerializer
import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
from django.conf import settings
import os
from .utils import savePlot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error,r2_score




class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            
            # Fetch historical stock data
            now = datetime.now()
            start= datetime(now.year-10,now.month,now.day)
            end= now
            df=yf.download(ticker,start,end)
            
            if df.empty:
                return Response({'error': 'Invalid ticker symbol or no data available.'}, status=status.HTTP_404_NOT_FOUND)
            
            # reset index to have 'Date' as a column
            df=df.reset_index()
            print(df.head())
            
            # to generat basic plot
            plt.switch_backend('AGG')  # Use a non-interactive backend for automated requests   
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Close Price')
            plt.title(f'{ticker} Close Price History')
            plt.xlabel('Days')
            plt.ylabel('close price') 
            plt.legend()
            
            # save the plot to a file
            plot_image_path =f'{ticker}_close_price.png'
            plot_img = savePlot(plot_image_path)
            
            # 100 days moving average
            ma100=df.Close.rolling(100).mean()
            plt.switch_backend('AGG')  # Use a non-interactive backend for automated requests   
            plt.figure(figsize=(12,5)) 
            plt.plot(df.Close, label='Close Price')
            plt.plot(ma100, 'r', label='MA100')
            plt.title(f'{ticker} Close Price with 100-Day Moving Average')
            plt.xlabel('Days')
            plt.ylabel('close price')
            plt.legend() 
            plot_image100_path =f'{ticker}_100_DMAPLOT.png'
            plot_100_dma = savePlot(plot_image100_path)
            print(plot_100_dma)
            
            
            ma200=df.Close.rolling(200).mean()
            plt.switch_backend('AGG')  # Use a non-interactive backend for automated requests   
            plt.figure(figsize=(12,5)) 
            plt.plot(df.Close, label='Close Price')
            plt.plot(ma100, 'r', label='MA100')
            plt.plot(ma200, 'r', label='MA200')
            plt.title(f'{ticker} Close Price with 200-Day Moving Average')
            plt.xlabel('Days')
            plt.ylabel('close price')
            plt.legend() 
            plot_image200_path =f'{ticker}_200_DMAPLOT.png'
            plot_200_dma = savePlot(plot_image200_path)
            print(plot_200_dma)
            
            # Spliting the data into training and testing sets
            data_traning=pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing=pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])
            
            # Scaling down the data between 0 and 1
            scaler=MinMaxScaler(feature_range=(0,1))
            
            # load ML model
            model=load_model('../Resources/Stock_prediction_model.keras')
            
            # preparing the testing data set
            past_100_data=data_traning.tail(100)
            final_df=pd.concat([past_100_data,data_testing],ignore_index=True)
            input_data=scaler.fit_transform(final_df)
            
            x_text=[]
            y_test=[]
            for i in range(100,input_data.shape[0]):
                x_text.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            x_text,y_test=np.array(x_text),np.array(y_test)
            
            # making predictions
            y_predicted=model.predict(x_text)
            
            # reverting the scaling
            y_predicted=scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test=scaler.inverse_transform(y_test.reshape(-1,1)).flatten()    
            
            # plot the final prediction

            plt.switch_backend('AGG')  # Use a non-interactive backend for automated requests   
            plt.figure(figsize=(12,5)) 
            plt.plot(y_test,'b',label='ORIGNAL Price')
            plt.plot(y_predicted, 'r', label='PREDICTED Price')
            plt.title(f'{ticker} final prediction Price')
            plt.xlabel('Days')
            plt.ylabel('close price')
            plt.legend() 
            plot_imagepre_path =f'{ticker}_Final_prediction.png'
            plot_predict = savePlot(plot_imagepre_path)
            print(plot_predict)
            
            # model evaulation and mean squared error,root mean squared error,r2 score
            mse=mean_squared_error(y_test,y_predicted)
            rmse=np.sqrt(mse)
            r2score=r2_score(y_test,y_predicted)
            
            
            return Response({'status': 'success', 'ticker': ticker, 'plot_image_url': plot_img, 'plot_100_dma_url': plot_100_dma, 'plot_200_dma_url':plot_200_dma,'plot_predict':plot_predict,
                             'mse':mse,'rmse':rmse,'r2_score':r2score
                             }, status=status.HTTP_200_OK)
        
