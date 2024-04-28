import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const QuizOptions = ({
	selectedAnswer,
	setSelectedAnswer,
	options,
	handleSelectedOption,
	questions,
	questionNumber,
}) => {
	const [selected, setSelected] = useState(null);

	const handleOption = (option) => {
		setSelectedAnswer(true);
		handleSelectedOption(option);
		setSelected(option);

		// const isCorrect =
		// 	option === questions[questionNumber].correct_answer;
	};
	return (
		<View style={styles.optionContainer}>
			{options.map((option, index) => (
				<TouchableOpacity
					key={index}
					style={
						selected === option
							? option === questions[questionNumber].correct_answer
								? styles.optionCorrect
								: styles.optionWrong
							: styles.option
					}
					disabled={selectedAnswer}
					onPress={() => handleOption(option)}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{String.fromCharCode(65 + index)}.</Text>
						<Text style={styles.text}>{decodeURIComponent(option)}</Text>
					</View>

					{selected === option ? (
						option === questions[questionNumber].correct_answer ? (
							<AntDesign name="checkcircle" size={24} color="white" />
						) : (
							<AntDesign name="closecircle" size={24} color="white" />
						)
					) : null}
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	optionContainer: {
		gap: 20,
	},
	option: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 20,
		paddingHorizontal: 10,
		// paddingVertical: 20,
		height: 70,
		alignItems: "center",
	},
	optionCorrect: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
		borderWidth: 1,
		borderColor: "#57E677",
		backgroundColor: "#57E677",
		borderRadius: 20,
		paddingHorizontal: 10,
		// paddingVertical: 20,
		height: 70,
		alignItems: "center",
	},
	optionWrong: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
		borderWidth: 1,
		borderColor: "#FF0000",
		backgroundColor: "#FF0000",
		borderRadius: 20,
		paddingHorizontal: 10,
		// paddingVertical: 20,
		height: 70,
		alignItems: "center",
	},
	textContainer: {
		flexDirection: "row",
		gap: 20,
	},
	text: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "600",
		maxWidth: "80%",
	},
});

export default QuizOptions;
