import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL as string,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(async function (config) {
	if (AsyncStorage) {
		const token = await AsyncStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
	}
	if (!config.headers.Accept && config.headers["Content-Type"]) {
		config.headers.Accept = "application/json";
		config.headers["Content-Type"] = "application/json; charset=utf-8";
	}
	return config;
});

export default axiosInstance;
