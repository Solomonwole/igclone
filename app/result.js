import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Result = () => {
	const animation = useRef(null);
	const score = useLocalSearchParams();
	const time = useLocalSearchParams();

	const timer = time.totalTime;
	// const timer = "00:22:57";
	console.log(timer);

	const formatTimeToText = (time) => {
		const timeArray = time.split(":");
		if (timeArray.length !== 3) {
			return "Invalid time format";
		}

		const hours = parseInt(timeArray[0], 10);
		const minutes = parseInt(timeArray[1], 10);
		const seconds = parseInt(timeArray[2], 10);

		let formattedTime = "";

		if (hours > 0) {
			formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
		}
		if (minutes > 0) {
			formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""} `;
		}
		if (seconds > 0) {
			formattedTime += `${seconds} second${seconds > 1 ? "s" : ""} `;
		}

		return formattedTime.trim();
	};

	return (
		<View style={{ backgroundColor: "#473198" }}>
			<Stack.Screen
				options={{
					headerTitle: "Result",
					headerTintColor: "#fff",
					headerStyle: {
						backgroundColor: "#473198",
					},
				}}
			/>
			<View style={styles.root}>
				<Text style={styles.text}>
					Total Time Used: {formatTimeToText(timer)}
				</Text>
				<Text style={styles.score}>Score: {score.score}/10</Text>
				{score.score < 10 ? (
					<Text style={styles.text}>You can do better next game</Text>
				) : (
					<View>
						<Text style={styles.score}>Congratulations!</Text>
						<Text style={styles.text}>You have won $1000</Text>
					</View>
				)}

				<View style={styles.image}>
					{score.score < 10 ? (
						<LottieView
							autoPlay
							ref={animation}
							style={{
								width: 300,
								height: 300,
							}}
							source={require("../assets/sad.json")}
						/>
					) : (
						<LottieView
							autoPlay
							ref={animation}
							style={{
								width: 400,
								height: 400,
							}}
							source={require("../assets/trophy.json")}
						/>
					)}
				</View>

				<TouchableOpacity
					onPress={() => router.replace("/")}
					style={styles.button}>
					<Text style={styles.buttonText}>Home</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		height: "100%",
		backgroundColor: "#473198",
		paddingHorizontal: 20,
	},
	score: {
		fontSize: 40,
		color: "#fff",
		fontWeight: "800",
		textAlign: "center",
		marginTop: 20,
	},
	text: {
		fontSize: 25,
		fontWeight: "800",
		textAlign: "center",
		color: "#fff",
		marginTop: 10,
	},
	image: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	button: {
		backgroundColor: "#783EBF",
		paddingHorizontal: 40,
		paddingVertical: 20,
		borderRadius: 20,
		alignItems: "center",
		marginBottom: 50,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
	},
});

export default Result;
