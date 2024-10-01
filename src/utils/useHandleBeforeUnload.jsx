import {useEffect} from "react";

export const useHandleBeforeUnload = () => {
	const handleBeforeUnload = (event) => {
		event.preventDefault();
		sessionStorage.removeItem("playGame");
	};

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);
};