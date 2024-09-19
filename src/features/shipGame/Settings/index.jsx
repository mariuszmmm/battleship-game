import {SettingsItem} from "./styled.jsx";
import {GameMode} from "./GameMode/index.jsx";
import {Ships} from "./Ships/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {Additional} from "./Additional/index.jsx";
import {ArrowBackIcon, PlayIcon} from "../../../components/Icons/index.jsx";
import {Back, StyledLink} from "../../../components/Buttons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
import {selectPlayers, setState} from "../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Difficulty} from "./Difficulty"
import {Header} from "../../../components/Header/index.jsx";
import {Wrapper} from "../../../components/Wrapper/index.jsx";

export const Settings = () => {
	const dispatch = useDispatch();
	const players = useSelector(selectPlayers);

	return (
		<Wrapper>
			<Section>
				<Back to="/home" onClick={() => dispatch(setState("home"))}><ArrowBackIcon/></Back>
				<Header>
					Ustawienia gry
				</Header>
				<SettingsItem>
					<GameMode/>
					<Difficulty/>
					<Ships/>
					<Shots/>
					<Additional/>
				</SettingsItem>
				<StyledLink
					to={players === "compVsComp" ? "/playGame" : "/setShips"}
					onClick={() => dispatch(setState("setShips"))}>
					Dalej<PlayIcon/></StyledLink>
			</Section>
		</Wrapper>
	)
}