import { getTrackApi } from "@/services/trackApi";
import { useQuery } from "@tanstack/react-query";

export const useGetTrack = (trackId: string) => {
	const {
		data: track,
		isPending: isLoadingTrack,
		isError,
	} = useQuery({
		queryKey: ["track", trackId],
		queryFn: async () => getTrackApi(trackId),
		enabled: !!trackId, // Only run the query if trackId is provided
	});

	return { track, isLoadingTrack, isError };
};
