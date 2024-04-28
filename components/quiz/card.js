import React from "react";
import { View, StyleSheet, Text } from "react-native";

const QuizCard = ({ question, number }) => {
	const ques = number + 1;
	return (
		<View>
			<View style={styles.card}>
				<Text style={{ color: "#fff" }}>Question {ques}</Text>
				<Text style={styles.question}>
					{decodeURIComponent(question[number].question)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		minHeight: 254,
		width: "100%",
		backgroundColor: "#0E0E0E69",
		borderRadius: 20,
		elevation: 10,
		shadowColor: "#000000",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.3,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
		padding: 10,
	},
	question: {
		color: "#fff",
		textAlign: "center",
		fontSize: 32,
	},
});

export default QuizCard;
