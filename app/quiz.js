import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	ScrollView,
	Image,
	ActivityIndicator,
	Button,
} from "react-native";
import QuizHeader from "../components/quiz/header";
import QuizCard from "../components/quiz/card";
import QuizOptions from "../components/quiz/options";
import { Audio } from "expo-av";

// Function to shuffle quiz options 
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const Quiz = () => {
	const [isLoading, setIsLoading] = useState(true);
	const amount = useLocalSearchParams();
	const [count, setCount] = useState(10);
	const [selectedAnswer, setSelectedAnswer] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [options, setOptions] = useState([]);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userScore, setUserScore] = useState(0);

	//Timer setup
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const [sound, setSound] = React.useState();

	// Function to format the timer value to HH:MM:SS
	const formatTime = (timeInSeconds) => {
		const hours = Math.floor(timeInSeconds / 3600);
		const minutes = Math.floor((timeInSeconds % 3600) / 60);
		const seconds = timeInSeconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	// Use useEffect to start and update the timer
	useEffect(() => {
		let interval;

		if (isRunning) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000); // Update the timer every 1 second
		} else {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isRunning]);

	// Music Playing
	async function playSound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			require("../assets/audio/song.mp3")
		);
		setSound(sound);

		console.log("Playing Sound");

		await sound.setVolumeAsync(0.2);
		await sound.playAsync();
	}

	useEffect(() => {
		if ("/quiz") {
			playSound();
		} else {
			console.log("End Sound");
			sound.unloadAsync();
			setSound(null);
		}
	}, [router]);

	
	const getQuiz = async () => {
		const url =
			"https://opentdb.com/api.php?amount=10&category=12&type=multiple&encode=url3986";

		const res = await fetch(url);
		const data = await res.json();
		setQuestions(data.results);
		console.log(data.results[0].correct_answer);
		setIsLoading(false);
		setOptions(generateOptionsAndShuffle(data.results[0]));
		setIsRunning(true);
	};

	useEffect(() => {
		getQuiz();
	}, []);

	const generateOptionsAndShuffle = (_question) => {
		const options = [..._question.incorrect_answers];
		options.push(_question.correct_answer);
		shuffleArray(options);

		return options;
	};

	const handleOnAnimationComplete = () => {
		if (questionNumber !== 9) {
			if (count === 0) {
				setCount(10);
				setSelectedAnswer(false);
				setQuestionNumber(questionNumber + 1);
				setOptions(generateOptionsAndShuffle(questions[questionNumber + 1]));
				console.log(
					decodeURIComponent(questions[questionNumber + 1].correct_answer)
				);
				setIsRunning(true);
			}
		}

		if (questionNumber === 9 && count === 0) {
			const totalTime = formatTime(timer);
			router.replace({
				pathname: "/result",
				params: { score: userScore, totalTime: totalTime },
			});
			setIsRunning(false);
			sound.unloadAsync();
			setQuestions([]);
		}
	};

	const handleSelectedOption = (_option) => {
		const isCorrect = _option === questions[questionNumber].correct_answer;
		if (isCorrect) {
			setUserScore(userScore + 1);
		}
		setIsRunning(false);
	};

	return (
		<View style={{ backgroundColor: "#473198" }}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<SafeAreaView>
				{isLoading ? (
					<View style={styles.root}>
						<View
							style={{
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<ActivityIndicator />
						</View>
					</View>
				) : (
					<View style={styles.root}>
						<View style={{ marginBottom: 50 }}>
							<QuizHeader
								amount={amount.amount}
								count={count}
								setCount={setCount}
								onAnimationComplete={handleOnAnimationComplete}
								timer={formatTime(timer)}
							/>
						</View>

						<View style={styles.card}>
							<QuizCard question={questions} number={questionNumber} />
						</View>

						<View style={styles.card}>
							<QuizOptions
								selectedAnswer={selectedAnswer}
								setSelectedAnswer={setSelectedAnswer}
								options={options}
								handleSelectedOption={handleSelectedOption}
								questions={questions}
								questionNumber={questionNumber}
							/>
						</View>
					</View>
				)}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		height: "100%",
		backgroundColor: "#473198",
		paddingHorizontal: 20,
	},
	card: {
		flex: 1,
	},
});

export default Quiz;
