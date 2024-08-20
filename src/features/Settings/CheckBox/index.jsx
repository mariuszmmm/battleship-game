import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const CheckBox = () => (
	<Fieldset>
		<Legend>Opcje</Legend>
		<Item>
			<Input type="checkbox" id="checkbox"  checked={undefined}/>
			<Label htmlFor="checkbox">Statki mogą się stykać</Label>
		</Item>
	</Fieldset>
);