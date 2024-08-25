import {SettingsHeader, SettingsItem, SettingsWrapper} from "./styled.jsx";
import {Players} from "./Players/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {AdditionalOptions} from "./AdditionalOptions/index.jsx";
import {ArrowBackIcon, PlayIcon} from "../../../components/Icons/index.jsx";
import {Back, StyledLink} from "../../../components/Buttons/index.jsx";
import {Section} from "../../../components/Section/index.jsx";
import {setHomeState, setChangeShipsState} from "../shipGameSlice.jsx";
import {useDispatch} from "react-redux";

export const Settings = () => {
	const dispatch = useDispatch();

	return (
		<Section>
			<SettingsWrapper>
				<Back to="/home" onClick={() => dispatch(setHomeState())}><ArrowBackIcon/></Back>
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
				<StyledLink to="/changeShips" onClick={() => dispatch(setChangeShipsState())}>Dalej<PlayIcon/></StyledLink>
			</SettingsWrapper>
		</Section>
	)
}