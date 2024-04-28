import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
	ImageBackground,
} from "react-native";
import { AppLogo } from "../components/applogo/appLogo";
import { Stack, router } from "expo-router";
import { useState } from "react";

export function Home() {
	const [amount, setAmount] = useState(0);
	const now = new Date();

	const playQuiz = () => {
		if (amount > 0) {
			const newAmount = amount - 100;
			setAmount(newAmount);
			router.replace({
				pathname: "/quiz",
				params: { amount: newAmount },
			});
		} else {
			Alert.alert("Oops!", "Insufficient Balance");
		}
	};
	return (
		<ImageBackground
			source={require("../assets/splash.png")}
			style={{ backgroundColor: "#473198" }}
		>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			<SafeAreaView>
				<View style={styles.root}>
					<View style={styles.logoContainer}>
						<AppLogo />
						<Text style={styles.quizMoney}>QM</Text>
					</View>

					<View style={styles.cardContainer}>
						<View style={styles.card}>
							<Text style={styles.wallet}>Wallet Balance</Text>
							<Text style={styles.amount}>${amount}</Text>
							<TouchableOpacity
								onPress={() => {
									const newAmount = amount + 100;
									setAmount(newAmount);
								}}
								style={styles.amountButton}>
								<Text style={styles.amountButtonText}>Fund Wallet</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View>
						<TouchableOpacity onPress={playQuiz} style={styles.button}>
							<Text style={styles.buttonText}>Practice Quiz</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => router.push("/timetest")}
							style={styles.button}>
							<Text style={styles.buttonText}>Time Test</Text>
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity
							onPress={() => {
								const time = now.getUTCDate();
								console.log(time);
							}}
							style={styles.button}>
							<Text style={styles.buttonText}>Get Hour</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	root: {
		height: "100%",
		// backgroundColor: "linear-gradient(180deg, #473198 0%, #4A0D67 100%)",
		backgroundColor: "#473198",
		paddingHorizontal: 20,
	},
	logoContainer: {
		alignItems: "center",
	},
	quizMoney: {
		color: "#fff",
		textAlign: "center",
		// fontFamily: "Nunito",
		fontSize: 28,
		fontStyle: "normal",
		fontWeight: "800",
		marginBottom: 50,
	},
	cardContainer: {
		flex: 1,
	},
	card: {
		height: 254,
		width: "100%",
		backgroundColor: "#491E7E",
		borderRadius: 20,
		elevation: 2,
		shadowColor: "#FAF8F8",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},
	wallet: {
		color: "white",
		marginBottom: -20,
	},
	amount: {
		color: "white",
		fontSize: 50,
		fontWeight: "800",
		marginBottom: 30,
	},
	amountButton: {
		backgroundColor: "#783EBF",
		paddingHorizontal: 40,
		paddingVertical: 10,
		borderRadius: 20,
	},
	amountButtonText: {
		color: "white",
	},
	button: {
		backgroundColor: "#5b3198",
		paddingHorizontal: 40,
		paddingVertical: 20,
		borderRadius: 20,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "500",
	},
});
