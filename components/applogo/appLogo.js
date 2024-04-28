import { StyleSheet, View, Text, Image } from "react-native";

export function AppLogo() {
	return (
		<View>
			<Image
				source={require("../../assets/images/logo.png")}
				style={styles.logo}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: 60,
		height: 60,
		marginBottom: 20,
	},
});
