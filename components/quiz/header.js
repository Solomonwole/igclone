import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialIcons } from "@expo/vector-icons";

const QuizHeader = ({
	amount,
	onAnimationComplete,
	count,
	setCount,
	timer,
}) => {
	useEffect(() => {
		const interval = setInterval(() => {
			if (count > 0) {
				setCount(count - 1);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [count]);

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.wallet}>
					<MaterialIcons name="timer" size={20} color="#fff" />
					<Text style={{ color: "#fff" }}>{timer}</Text>
				</View>

				<View style={styles.progress}>
					<CircularProgress
						radius={40}
						value={count}
						maxValue={10}
						initialValue={count}
						clockwise={false}
						progressValueColor={"#ecf0f1"}
						activeStrokeColor={count > 5 ? "#2ecc71" : "#f00"}
						inActiveStrokeColor={count > 5 ? "#2ecc71" : "#f00"}
						inActiveStrokeOpacity={0.2}
						inActiveStrokeWidth={6}
						onAnimationComplete={onAnimationComplete}
						titleStyle={{ fontWeight: "bold" }}
					/>
				</View>

				<View style={styles.wallet}>
					<FontAwesome5 name="wallet" size={20} color="#C4C4C4B2" />
					<Text style={styles.amount}>${amount}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		// justifyContent: "space-between",
		justifyContent: "space-between",
		// alignItems: "flex-start",
	},
	progress: {
		// flex: 1,
		// flexDirection: "row",
		// justifyContent: "center",
		// paddingLeft: 55,
	},
	wallet: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	amount: {
		fontSize: 20,
		color: "#C4C4C4B2",
	},
});

export default QuizHeader;
