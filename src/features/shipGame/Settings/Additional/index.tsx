import {AdditionalItemsContainer, Fieldset, Legend} from "../styled";
import {MayTouch} from "./MayTouch";
import {Sound} from "./Sound";
import {Bonus} from "./Bonus";
import {NotStandardShips} from "./NotStandardShips";

export const Additional = () => (
	<Fieldset>
		<Legend>Opcje dodatkowe</Legend>
		<AdditionalItemsContainer>
			<NotStandardShips/>
			<MayTouch/>
			<Bonus/>
			<Sound/>
		</AdditionalItemsContainer>
	</Fieldset>
);