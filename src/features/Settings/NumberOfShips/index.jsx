import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const NumberOfShips = () => (
	<Fieldset>
		<Legend>Ilość statków</Legend>
		<Item>
			<Input type="radio" id="5" name="numberOfShips" value="5" checked={undefined}/>
			<Label htmlFor="5">5</Label>
		</Item>
		<Item>
			<Input type="radio" id="10" name="numberOfShips" value="10" checked={undefined}/>
			<Label htmlFor="10">10</Label>
		</Item>
	</Fieldset>
);