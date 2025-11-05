import os
from django.conf import settings
import matplotlib.pyplot as plt




def savePlot(plot_image_path):
    
    
    # save the plot to a file
    image_path=os.path.join(settings.MEDIA_ROOT, plot_image_path)# this will give the image url
    plt.savefig(image_path)
    plt.close()
    image_url= settings.MEDIA_URL+plot_image_path 
    return image_url
    

