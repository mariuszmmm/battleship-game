import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Overlay, Wrapper} from "./styled.jsx";
import {ButtonsContainer, StyledLink} from "../Buttons/index.jsx";
import {
	selectGameMode, selectWinner, setClearBoard
} from "../../features/shipGame/shipGameSlice.jsx";
import {getLocalStorage} from "../../utils/localStorage.jsx";

export const GameResult = () => {
	const winner = useSelector(selectWinner);
	const gameMode = useSelector(selectGameMode);
	const dispatch = useDispatch();
	const results = getLocalStorage("results");
	const [text, setText] = useState(null);

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
						<td>{results.wygrana || 0}</td>
					</tr>
					<tr>
						<td>przegrane:</td>
						<td>{results.przegrana || 0}</td>
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
}