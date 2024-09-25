import {AdditionalItemsContainer, Fieldset, Legend} from "../styled.jsx";
import {MayTouch} from "./MayTouch/index.jsx";
import {Sound} from "./Sound/index.jsx";
import {Bonus} from "./Bonus/index.jsx";

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