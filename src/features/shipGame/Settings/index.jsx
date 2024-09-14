import {SettingsHeader, SettingsItem, SettingsWrapper} from "./styled.jsx";
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

export const Settings = () => {
	const dispatch = useDispatch();
	const players = useSelector(selectPlayers);

	return (
		<Section>
			<SettingsWrapper>
				<Back to="/home" onClick={() => dispatch(setState("home"))}><ArrowBackIcon/></Back>
				<SettingsHeader>
					Ustawienia
				</SettingsHeader>
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
			</SettingsWrapper>
		</Section>
	)
}