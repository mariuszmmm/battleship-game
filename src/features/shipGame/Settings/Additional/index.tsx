import {AdditionalItemsContainer, Fieldset, Legend} from "../styled";
import {MayTouch} from "./MayTouch";
import {Sound} from "./Sound";
import {Bonus} from "./Bonus";

export const Additional = () => (
	<Fieldset>
		<Legend>Opcje dodatkowe</Legend>
		<AdditionalItemsContainer>
			<Sound/>
			<MayTouch/>
			<Bonus/>
		</AdditionalItemsContainer>
	</Fieldset>
);