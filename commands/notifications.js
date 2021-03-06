import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";
import GithubNotifications from "../components/notification/GithubNotifications";
import TwitterNotifications from "../components/notification/TwitterNotifications";
import InstagramNotifications from "../components/notification/InstagramNotifications";
import RedditNotifications from "../components/notification/RedditNotifications";

/// Get Latest Notification command
const Notifications = ({ platform = "" }) => {
	if (platform.includes("github")) {
		return <GithubNotifications />;
	} else if (platform.includes("twitter")) {
		return <TwitterNotifications />;
	} else if (platform.includes("instagram")) {
		return <InstagramNotifications />;
	} else if (platform.includes("reddit")) {
		return <RedditNotifications />;
	} else {
		const [updateField, setField] = useState("");
		const items = [
			{ label: "Github", value: "github" },
			{ label: "Twitter", value: "twitter" },
			{ label: "Facebook", value: "facebook" },
			{ label: "Instagram", value: "instagram" },
			{ label: "Reddit", value: "reddit" },
		];

		const handleSelect = (item) => {
			setField(item.value);
		};

		if (updateField === "") {
			return (
				<>
					<Box
						borderStyle="round"
						paddingLeft={1}
						width={51}
						borderColor="#00FFFF"
					>
						<Text color="yellow">
							Select the Social Media to see Notifications :{" "}
						</Text>
					</Box>
					<SelectInput items={items} onSelect={handleSelect} />
				</>
			);
		} else {
			if (updateField == "github") {
				return <GithubNotifications />;
			} else if (updateField == "instagram") {
				return <InstagramNotifications />;
			} else if (updateField == "twitter") {
				return <TwitterNotifications />;
			} else if (updateField == "reddit") {
				return <RedditNotifications />;
			}
		}
	}
	return <Text>Hello, {platform} </Text>;
};

Notifications.propTypes = {
	/// Name of the Platform to fetch Notifications
	platform: PropTypes.string,
};

Notifications.shortFlags = {
	platform: "p",
};

export default Notifications;
