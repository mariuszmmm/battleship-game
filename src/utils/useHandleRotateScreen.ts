import {useEffect, useState} from "react";

export const useHandleRotateScreen = () => {
	const [turn, setTurn] = useState(
		window.screen.width > window.screen.height &&
		window.screen.height < 600
	);

	const onOrientationChange = () => {
		const horizontalOrientation = window.screen.width > window.screen.height;
		const screenHeight = window.screen.height;
		if (horizontalOrientation && screenHeight < 600) {
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