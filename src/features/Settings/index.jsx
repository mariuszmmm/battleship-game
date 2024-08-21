import {SettingsHeader, SettingsItem, SettingsWrapper, StyledLink} from "./styled.jsx";
import {Players} from "./Players/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {AdditionalOptions} from "./AdditionalOptions/index.jsx";

export const Settings = () => {
	return (
		<SettingsWrapper>
			<SettingsHeader>
				Ustawienia
			</SettingsHeader>
			<SettingsItem>
				<Players />
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
			<StyledLink to="/play">PLAY</StyledLink>
		</SettingsWrapper>
	)
}