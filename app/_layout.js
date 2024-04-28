import { router } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { AppState } from "react-native";

export default function Layout() {
	// Function to close game if app is minimized
	useEffect(() => {
		const handleAppStateChange = (nextAppState) => {
			if (nextAppState === "active") {
				// App resumed (came to the foreground).
				console.log("App Resumed");
			} else if (nextAppState === "background") {
				// App paused (went to the background).
				console.log("App Paused");
				router.replace("/");
			}
		};

		AppState.addEventListener("change", handleAppStateChange);

		return () => {
			// Remove the event listener when the component unmounts.
			AppState.removeEventListener("change", handleAppStateChange);
		};
	}, []);

	// useEffect(() => {
	// 	const checkTimeAndNavigate = () => {
	// 		const now = new Date();
	// 		if (now.getHours() === 1 && now.getMinutes() === 2) {
	// 			// It's 1:00 AM, so navigate to the "/quiz" screen
	// 			router.replace("/quiz");
	// 		}
	// 	};

	// 	// Set up a timer to periodically check the time
	// 	const timer = setInterval(checkTimeAndNavigate, 100); // Check every minute

	// 	// Clear the timer when the component unmounts
	// 	return () => clearInterval(timer);
	// }, []);

	useEffect(() => {
		const checkTimeAndNavigate = () => {
			const now = new Date();
			if (now.getHours() === 1 && now.getMinutes() === 33) {
				// Check if the current route is not "/quiz"
				if (router.current !== "/quiz") {
					// Navigate to the "/quiz" screen
					router.replace("/quiz");
					// Clear the timer as navigation has occurred
					clearInterval(timer);
				}
			}
		};

		// Set up a timer to periodically check the time
		const timer = setInterval(checkTimeAndNavigate, 100); // Check every 100 milliseconds

		// Clear the timer when the component unmounts
		return () => clearInterval(timer);
	}, [router]);

	return <Stack />;
}
