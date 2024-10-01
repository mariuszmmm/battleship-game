import {useEffect, useState} from "react";

export const useHandleRotateScreen = () => {
	const [turn, setTurn] = useState(
		window.screen.orientation.type === "landscape-primary" &&
		window.screen.height < 600
	);

	const onOrientationChange = () => {
		const newOrientation = window.screen.orientation.type;
		const screenHeight = window.screen.height;
		if (newOrientation === "landscape-primary" &&
			screenHeight < 600) {
			setTurn(true);
		} else {
			setTurn(false);
		}
	};

	useEffect(() => {
		window.addEventListener("orientationchange", onOrientationChange);

		return () => {
			window.removeEventListener("orientationchange", onOrientationChange);
		};
	}, []);

	return turn;
}