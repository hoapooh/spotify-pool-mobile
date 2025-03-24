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

export const createPLaylistApi = async (playlistName: string, description: string) => {
	try {
		const formData = new FormData();
		formData.append("PlaylistName", playlistName);
		formData.append("Description", description);

		// Send null for ImageFile instead of "test" string
		formData.append("ImageFile", null!);

		const response = await axiosInstance.post("/playlists", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "*/*",
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
