import axiosInstance from "@/configs/axiosInstance";
import { IUserCurrent } from "@/types";

export const loginApi = async (username: string, password: string) => {
	try {
		const response = await axiosInstance.post("/authentication/login", {
			username,
			password,
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const googleLoginApi = async (googleToken: string) => {
	try {
		const response = await axiosInstance.post("/authentication/google-login", {
			googleToken,
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentUserApi = async () => {
	try {
		const response = await axiosInstance.get<IUserCurrent>(
			"/authentication/authenticated-user-info"
		);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
