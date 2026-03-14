# import numpy as np
# import cv2
# from tensorflow.keras.models import load_model

# DATADIR = '/Users/yashpal/Downloads/MRI_Dev/Data/Training/train'
# CATEGORIES = ["glioma","meningioma","notumor","pituitary"]
# IMG_SIZE = 150

# def prepare(filepath):
#     img_array = cv2.imread(filepath)
#     img_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
#     img_array = img_array / 255.0
#     return img_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)

# model = load_model('NN_1.h5') # Make sure the path is correct

# image_path = "Te-gl_0023.jpg" #  Change this to a valid path
# new_image = prepare(image_path)

# prediction = model.predict(new_image)
# print(prediction)

# class_index = np.argmax(prediction)
# class_label = CATEGORIES[class_index]
# print(f"Predicted class: {class_label}")

from tensorflow.keras.models import load_model
import tensorflow as tf
print(tf.__version__)
print(tf.keras.__version__)

try:
    model = load_model('NN_1.h5')
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)