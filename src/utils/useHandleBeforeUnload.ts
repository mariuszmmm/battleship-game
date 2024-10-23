import {useEffect} from "react";

export const useHandleBeforeUnload = () => {
	const handleBeforeUnload = (event: BeforeUnloadEvent) => {
		event.preventDefault();
		sessionStorage.removeItem("game");
	};

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);
};