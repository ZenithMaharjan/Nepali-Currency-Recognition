from roboflow import Roboflow
from PIL import ImageFile, Image, ImageOps
import numpy as np 
from keras.preprocessing import image
import cv2
from skimage.util import img_as_ubyte
from skimage import exposure
import supervision as sv
from PIL import Image 
import base64
from io import BytesIO
import os
import uuid
from keras.models import model_from_json
from dotenv import load_dotenv

load_dotenv()

rf = Roboflow(api_key=os.getenv("API_KEY"))
project = rf.workspace().project(os.getenv("PROJECT"))
model = project.version(1).model

# def to_image(numpy_img):
#     img = Image.fromarray(numpy_img, 'RGB')
#     data = BytesIO()
#     img.save(data, "JPEG")  # Assuming pil_img is the PIL image object
#     data64 = base64.b64encode(data.getvalue())
#     return 'data:image/jpeg;base64,' + data64.decode('utf-8')

# def to_image(request):
#     # Assuming you have a NumPy array named 'image_data'
#     # Convert the NumPy array to an image
#     img = Image.fromarray(request)

#     # Convert image to bytes
#     img_bytes = io.BytesIO()
#     img.save(img_bytes, format='PNG')
#     img_bytes = img_bytes.getvalue()

#     # Return the image data as HttpResponse
#     return img_bytes

# infer on a local image
def imagepredict(img_path):
  img1 = Image.open(img_path)
  img1 = img1.convert('RGB')
  # img1.save("original.jpeg")
  img2 = img1.resize((640,640))


# # Apply global histogram equalization
#   img1 = ImageOps.grayscale(img1)
#   img1 = ImageOps.equalize(img1)

  img1.save("original.jpeg")

  # img_array = np.array(img1)

  # img = img1.resize((640,640) , Image.NEAREST)
  # img1 = cv2.imread(img_path)

  # background = Image.new("RGB", img.size, (255, 255, 255))
  # background.paste(img, mask=img.split()[3]) # 3 is the alpha channel

  # Preprocessing the image
  # x1 = image.img_to_array(img)
  # x1 = image.img_to_array(background)
  # x2 = np.expand_dims(x1,axis=0)

 
  # x1 = cv2.resize(img_array, (640,640))

  # result = model.predict(x1, confidence=40, overlap=30).json()
  result = model.predict("original.jpeg", confidence=40, overlap=30).json()
  labels = [item["class"] for item in result["predictions"]]

  detections = sv.Detections.from_roboflow(result)

  label_annotator = sv.LabelAnnotator(text_position=sv.Position.CENTER, text_scale = 5 , text_thickness = 3)
  bounding_box_annotator = sv.BoxAnnotator()

  image = cv2.imread("original.jpeg")

  annotated_image = bounding_box_annotator.annotate(
    scene=image, detections=detections)
  # annotated_image = label_annotator.annotate(
  #   scene=annotated_image, detections=detections, labels=labels)
  
  actualname = "annotated_image" + '.' + str(uuid.uuid1()) + '.jpg'
  annotated_image = cv2.resize(annotated_image , (640,480))
  cv2.imwrite(os.path.join("../Frontend/public" , actualname), annotated_image)

  # _, buffer = cv2.imencode('.png', annotated_image)
  # annotated_image = base64.b64encode(buffer).decode('utf-8')

  # url = to_image(img_array)
  # print(url)
  if not labels:
    labels.append("No Currency Detected")
  
  if "fake" in labels:
    labels = []
    labels.append("fake")
    
  print(result)
  print(labels)
  return labels , actualname 
  # return labels , annotated_image1 , url
