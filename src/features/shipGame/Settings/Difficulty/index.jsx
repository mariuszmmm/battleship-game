import {ButtonsContainer, Fieldset, Legend} from "../styled.jsx";
import {Button} from "../../../../components/Buttons/index.jsx";

export const Difficulty = () => {

	return (
		<Fieldset>
			<Legend>Poziom trudności</Legend>
			<ButtonsContainer>
				<Button $active={true}>
					<span>Łatwy</span>
				</Button>
				<Button disabled>
					<span>Średni</span>
				</Button>
				<Button disabled>
					<span>Trudny</span>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	)
}