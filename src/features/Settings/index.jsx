import {SettingsHeader, SettingsItem, SettingsWrapper} from "./styled.jsx";
import {Players} from "./Players/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {AdditionalOptions} from "./AdditionalOptions/index.jsx";
import {ArrowBackIcon, PlayIcon} from "../../components/Icons/index.jsx";
import {Back, StyledLink} from "../../components/Buttons/index.jsx";
import {Section} from "../../components/Section/index.jsx";
import {setStateNewGame} from "../play/playSlice.jsx";
import {useDispatch} from "react-redux";

export const Settings = () => {
	const dispatch = useDispatch();

	const onClickHandler = () => {
		dispatch(setStateNewGame());
	}

	return (
		<Section>
			<SettingsWrapper>
				<Back to="/"><ArrowBackIcon/></Back>
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
				<StyledLink to="/play" onClick={() => onClickHandler()}>Dalej<PlayIcon/></StyledLink>
			</SettingsWrapper>
		</Section>
	)
}