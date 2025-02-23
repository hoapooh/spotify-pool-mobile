import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	setAuthentication: (isAuthenticated: boolean) => void;
	checkAuthentication: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	setAuthentication: (isAuthenticated: boolean) => set({ isAuthenticated }),
	checkAuthentication: async () => {
		const access_token = await AsyncStorage.getItem("access_token");

		if (access_token) {
			set({ isAuthenticated: true });
		}
	},
}));
