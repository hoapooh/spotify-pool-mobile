import axiosInstance from "@/configs/axiosInstance";
import { ITrack } from "@/types";

export const getTracksApi = async (limit?: number, searchTerm?: string) => {
	try {
		const response = await axiosInstance.get("/tracks", {
			params: {
				limit: limit || 10,
				searchTerm: searchTerm || "",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching tracks:", error);
		throw error;
	}
};

export const getTrackApi = async (id: string) => {
	try {
		const response = await axiosInstance.get<ITrack>(`/tracks/${id}`);

		return response.data;
	} catch (error) {
		console.error("Error fetching track:", error);
		throw error;
	}
};
