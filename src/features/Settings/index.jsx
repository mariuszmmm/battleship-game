import {SettingsHeader, SettingsItem, SettingsWrapper} from "./styled.jsx";
import {Players} from "./Players/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {AdditionalOptions} from "./AdditionalOptions/index.jsx";
import {ArrowLeftIcon, PlayIcon} from "../../components/Icons/index.jsx";
import {Back, StyledLink} from "../../components/Buttons/index.jsx";
import {Section} from "../../components/Section/index.jsx";

export const Settings = () => {
	return (
		<Section>
			<SettingsWrapper>
				<Back to="/"><ArrowLeftIcon/></Back>
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
				<StyledLink to="/play">DALEJ <PlayIcon/></StyledLink>
			</SettingsWrapper>
		</Section>
	)
}