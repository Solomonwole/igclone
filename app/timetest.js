import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

const TimeTest = () => {
	const sortedUsers = users.sort((a, b) => {
		const timeA = new Date(`1970-01-01T${a.totaltime}Z`);
		const timeB = new Date(`1970-01-01T${b.totaltime}Z`);
		return timeA - timeB;
	});

	// Select the first 4 users as winners
	const winners = sortedUsers.slice(0, 5);

	useEffect(() => {
		if (winners.includes(sortedUsers[0])) {
			console.log("Winner");
		} else {
			console.log("Try again");
		}
	}, []);

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
		<View>
			<Text></Text>
			{/* <FlatList
				keyExtractor={(user) => Math.random().toString()}
				data={winners}
				renderItem={(user) => <Text>{user.name}</Text>}
			/> */}

			{winners.map((user, index) => (
				<View key={index} style={{ flexDirection: "row", gap: 10 }}>
					<Text>{user.name}</Text>
					<Text>{formatTimeToText(user.totaltime)}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({});

export default TimeTest;

const users = [
	{ name: "User 4", totaltime: "00:01:03" },
	{ name: "User 1", totaltime: "02:00:03" },
	{ name: "User 5", totaltime: "00:02:05" },
	{ name: "User 6", totaltime: "00:03:03" },
	{ name: "User 7", totaltime: "00:05:03" },
	{ name: "User 3", totaltime: "04:00:09" },
	{ name: "User 8", totaltime: "00:07:03" },
	{ name: "User 9", totaltime: "00:08:03" },
	{ name: "User 2", totaltime: "00:00:05" },
	{ name: "User 10", totaltime: "00:00:01" },
];
