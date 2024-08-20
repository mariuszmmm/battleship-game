import {SettingsHeader, SettingsItem, SettingsWrapper, StyledLink} from "./styled.jsx";
import {Players} from "./Parametr/index.jsx";
import {NumberOfShips} from "./NumberOfShips/index.jsx";
import {Shots} from "./Shots/index.jsx";
import {CheckBox} from "./CheckBox/index.jsx";

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
				<CheckBox/>
			</SettingsItem>
			<StyledLink to="/play">PLAY</StyledLink>
		</SettingsWrapper>
	)
}