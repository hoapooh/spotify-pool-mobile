import { getCurrentUserApi } from "@/services/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
	const { data: currentUser } = useQuery({
		queryKey: ["user"],
		queryFn: async () => getCurrentUserApi(),
	});

	return { currentUser };
};
