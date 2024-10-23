import React, {useState, useEffect} from "react";
import {Overlay, Wrapper} from "./styled";
import {ButtonsContainer, StyledLink} from "../Buttons";
import {
	selectGameMode, selectWinner, setClearBoard
} from "../../features/shipGame/shipGameSlice";
import {getLocalStorage} from "../../utils/localStorage";
import {useAppDispatch, useAppSelector} from "../../config/hooks";
import {Results} from "../../types/types";

export const GameResult = () => {
	const winner = useAppSelector(selectWinner);
	const gameMode = useAppSelector(selectGameMode);
	const dispatch = useAppDispatch();
	const results: Results | null = getLocalStorage("results");
	const [text, setText] = useState<string>("");

	const isWinner = () => {
		switch (winner) {
			case "firstPlayer" :
				setText(gameMode === "compVsComp" ? "Wygrał pierwszy komputer 💻" : "🏆 Brawo wygrałeś ! 😀");
				break;
			case  "secondPlayer":
				setText(gameMode === "compVsComp" ? "Wygrał drugi komputer 💻" : "Tym razem przegrałeś 🙁");
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		isWinner()
	}, []);

	return (
		<Wrapper>
			<Overlay>
				<table>
					<caption>{text}</caption>
					{gameMode !== "compVsComp" && <tbody>
					<tr>
						<td>wygrane:</td>
						<td>{results?.wygrana || 0}</td>
					</tr>
					<tr>
						<td>przegrane:</td>
						<td>{results?.przegrana || 0}</td>
					</tr>
					</tbody>}
				</table>
				<ButtonsContainer>
					<StyledLink to="/home" replace={true} onClick={() => dispatch(setClearBoard())}>
						Zamknij
					</StyledLink>
				</ButtonsContainer>
			</Overlay>
		</Wrapper>
	)
};