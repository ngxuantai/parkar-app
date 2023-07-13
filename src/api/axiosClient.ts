import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

// baseURL: process.env.REACT_APP_API_URL || "http://192.168.1.87:8080/api/user",
const axiosClient = axios.create({
  // baseURL: "http://192.168.200.104:8088/api/v1",
  baseURL: "http://192.168.43.213:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers["x-access-token"] = JSON.parse(token);
  }
  return config;
});

// axiosClient.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== "/auths/signin" && err.response) {
//       // Access Token was expired

//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await axiosClient.post("/auths/refreshtoken", {
//             refreshToken: await AsyncStorage.getItem("refreshToken"),
//           });

//           const { accessToken } = rs.data;

//           if (accessToken) {
//             await AsyncStorage.setItem(
//               "accessToken",
//               JSON.stringify(accessToken),
//             );
//           }
//           // location.href = "/";

//           return axiosClient(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//       // Refresh Token was expired
//       if (err.response.status === 403) {
//         Alert.alert("Your session has been expired. Please log in again!");
//         await AsyncStorage.clear();
//       }
//     }

//     return Promise.reject(err);
//   },
// );

export default axiosClient;
