import {SettingsHeader, SettingsItem, SettingsWrapper} from "./styled.jsx";
import {Players} from "./Players/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {AdditionalOptions} from "./AdditionalOptions/index.jsx";
import {ArrowBackIcon, PlayIcon} from "../../../components/Icons/index.jsx";
import {Back, StyledLink} from "../../../components/Buttons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
import {selectPlayers, setState} from "../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";

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
					<Players/>
				</SettingsItem>
				<SettingsItem>
					<NumberOfShips/>
				</SettingsItem>
				<SettingsItem>
					<Shots/>
				</SettingsItem>
				<SettingsItem>
					<AdditionalOptions/>
				</SettingsItem>
				<StyledLink
					to={players === "compVsComp" ? "/playGame" : "/setShips"}
					onClick={() => dispatch(setState("setShips"))}>
					Dalej<PlayIcon/></StyledLink>
			</SettingsWrapper>
		</Section>
	)
}