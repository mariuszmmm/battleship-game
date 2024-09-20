import {Fieldset, Legend} from "../styled.jsx";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";

export const Difficulty = () => {

	return (
		<Fieldset>
			<Legend>Poziom trudności</Legend>
			<ButtonsContainer>
				<Button $active={true} $setting>
					Łatwy
				</Button>
				<Button disabled $setting>
					Średni
				</Button>
				<Button disabled $setting>
					Trudny
				</Button>
			</ButtonsContainer>
		</Fieldset>
	)
}