import {Overlay, Wrapper} from "./styled.jsx";
import {ButtonsContainer, StyledLink} from "../Buttons/index.jsx";
import {selectPlayers, selectWinner, setState} from "../../features/shipGame/shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {getLocalStorage} from "../../utils/localStorage.jsx";

export const GameResult = () => {
	const winner = useSelector(selectWinner);
	const players = useSelector(selectPlayers);
	const dispatch = useDispatch();
	const [text, setText] = useState(null);
	const results = getLocalStorage("results");

	const isWinner = () => {
		switch (winner) {
			case "firstPlayer" :
				setText(players === "compVsComp" ?
					"Wygrał pierwszy komputer 💻"
					:
					"🏆 Brawo wygrałeś ! 😀");
				break;
			case  "secondPlayer":
				setText(players === "compVsComp" ?
					"Wygrał drugi komputer 💻"
					:
					"Tym razem przegrałeś 🙁");
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
					{players !== "compVsComp" && <tbody>
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
					<StyledLink to="/home" onClick={() => dispatch(setState("home"))}>OK</StyledLink>
				</ButtonsContainer>
			</Overlay>
		</Wrapper>
	)
}