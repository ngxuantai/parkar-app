import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import * as ImageManipulator from "expo-image-manipulator";

const UploadHelper = {
  hasMediaLibraryPermissionGranted: async () => {
    let granted = false;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.canAskAgain || permission.status === "denied") {
      granted = false;
    }

    if (permission.granted) {
      granted = true;
    }

    return granted;
  },
  compressSizer: (size: any) => {
    const MB = size / Math.pow(1024, 2);
    if (Math.round(MB) === 0) return 1;
    if (Math.round(MB) === 1) return 0.9;
    if (Math.round(MB) === 2) return 0.8;
    if (Math.round(MB) === 3) return 0.7;
    if (Math.round(MB) === 4) return 0.6;
    if (Math.round(MB) >= 5) return 0.5;
    if (Math.round(MB) >= 10) return 0.4;
    if (Math.round(MB) >= 15) return 0.3;
    if (Math.round(MB) >= 20) return 0.2;
    if (Math.round(MB) >= 25) return 0.1;
  },
  uploadImageFromDevice: async () => {
    let imgURI = null,
      imageResult = null;
    const storagePermissionGranted =
      await UploadHelper.hasMediaLibraryPermissionGranted();

    // Discard execution when  media library permission denied
    if (!storagePermissionGranted) return imgURI;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const result = pickerResult as ImagePicker.ImageInfo;
      imgURI = result.uri;

      const response = await fetch(imgURI);
      const blob = await response.blob();
      const compress = UploadHelper.compressSizer(blob.size);

      imageResult = await ImageManipulator.manipulateAsync(
        imgURI,
        [{ resize: { width: 480 } }],
        { compress: compress, format: ImageManipulator.SaveFormat.JPEG },
      );
    }

    return imageResult.uri;
  },
  getBlobFromUri: async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  },
  manageFileUpload: async (
    fileBlob: any,
    { onStart, onComplete, onFail }: any,
  ) => {
    const imgName = "img-" + new Date().getTime();

    const storageRef = ref(storage, `images/${imgName}.jpg`);

    // Trigger file upload start event
    onStart && onStart();

    try {
      uploadBytes(storageRef, fileBlob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL: string) => {
          // dispatch on complete event
          onComplete && onComplete(downloadURL);
        });
      });
    } catch (error: any) {
      // Something went wrong - dispatch onFail event with error  response
      onFail && onFail(error);
    }
  },
};

export default UploadHelper;
