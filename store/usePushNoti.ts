import { create } from "zustand";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";

interface PushNotiState {
	expoPushToken: string;
	notification: Notifications.Notification | null;
	error: Error | null;
	setExpoPushToken: (token: string | null) => void;
	setNotification: (notification: Notifications.Notification | null) => void;
	setError: (error: Error | null) => void;
}

export const usePushNoti = create<PushNotiState>((set) => ({
	expoPushToken: "",
	notification: null,
	error: null,
	setExpoPushToken: (token) => set({ expoPushToken: token ?? "" }),
	setNotification: (notification) => set({ notification }),
	setError: (error) => set({ error }),
}));

// Hook to initialize notification logic
export const usePushNotiSetup = () => {
	const { setExpoPushToken, setNotification, setError } = usePushNoti();

	const notificationListener = useRef<Notifications.EventSubscription>();
	const responseListener = useRef<Notifications.EventSubscription>();

	useEffect(() => {
		// Register for push notifications
		registerForPushNotificationsAsync().then(
			(token) => setExpoPushToken(token ?? ""),
			(error) => setError(error)
		);

		// Handle initial notification if the app was launched from a notification
		const handleInitialNotification = async () => {
			const initialNotification = await Notifications.getLastNotificationResponseAsync();
			if (initialNotification) {
				console.log("🔔 App opened from a notification:", initialNotification);
				setNotification(initialNotification.notification);
			}
		};

		handleInitialNotification();

		// Listen for incoming notifications
		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			console.log("🔔 Notification Received: ", notification);
			setNotification(notification);
		});

		// Listen for when user interacts with a notification
		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(
				"🔔 Notification Response: ",
				JSON.stringify(response, null, 2),
				JSON.stringify(response.notification.request.content.data, null, 2)
			);
			setNotification(response.notification);
		});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);
};
