import axiosInstance from "@/configs/axiosInstance";

export const getMyPLaylistApi = async () => {
	try {
		const response = await axiosInstance.get("/customers/me/playlists");
		return response.data;
	} catch (error) {
		console.error("Error fetching playlists:", error);
		throw error;
	}
};
