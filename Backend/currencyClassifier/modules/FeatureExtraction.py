import numpy as np
import os
import cv2
from . import *
from keras.preprocessing import image

orb = cv2.ORB_create()
sift = cv2.SIFT_create()

# matching = {
#     "ten" : "10",
#     "hundred" : "100",
#     "thousand" : "1000",
#     "twenty" : "20",
#     "five" : "5",
#     "fifty" : "50",
#     "fivehundred" : "500",
# }

matching = {
    10 : "ten",
    100 : "hundred",
    1000 : "thousand",
    20 : "twenty",
    5 : "five",
    50 : "fifty",
    500 : "fivehundred",
    -1 : "FAKE",
}

def check_elements_greater_than_10(lst):
    count_greater_than_10 = sum(1 for element in lst if element > 230)
    return count_greater_than_10 > 3


def checkCurrency(images):
    classNames = ['10', '100', '1000', '20', '5', '50', '500']
    Descriptor = []

    images = image.img_to_array(images)
    images = images.astype(np.uint8)

    for id in classNames:
        file = open(f'currencyClassifier/modules/Description/{id}', "rb")

    # Read the file to numpy array
        arr = np.load(file)
        
        Descriptor.append(arr)
    # Close the file
        file.close


    print(images.dtype)
    kp2 , des2 = sift.detectAndCompute(images , None)
    
#     bf = cv2.BFMatcher()
#     flann = cv2.FlannBasedMatcher(index_params,search_params)

    matchList = []
    TrueMatch = -1 
    
    try:
        for des in Descriptor:
#             matches = flann.knnMatch(des , des2 , k = 2)
            matches = cv2.FlannBasedMatcher({'algorithm':1 , 'trees':10}, {}).knnMatch(des,des2,k=2)
            good = []
            for m , n in matches:
                if m.distance < 0.75 * n.distance:
                    good.append([m])
            matchList.append(len(good))
    except:
        pass
    
    if len(matchList) != 0:
        if max(matchList) > 200:
            TrueMatch1 = matchList.index(max(matchList))
            TrueMatch = int(classNames[TrueMatch1])

            # if sum(1 for e in matchList if e > 2600) >= 2:
            #     print("CHECK")
            #     TrueMatch = int(classNames[-1])
            
            # if  TrueMatch1 == 1 and matchList[1] > 3000:
            #     print("Enter")
            #     TrueMatch = -1
    print(matchList)
    print(TrueMatch)
    print(matching[TrueMatch])
    return matching[TrueMatch]   