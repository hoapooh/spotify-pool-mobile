import axiosInstance from "./axiosInstance";

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
