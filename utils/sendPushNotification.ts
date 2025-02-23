export async function sendPushNotification(expoPushToken: string) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Hello",
		body: "This is expo push notification from Android",
		data: { someData: "expo push notifications" },
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}
