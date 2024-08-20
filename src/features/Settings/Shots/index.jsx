import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const Shots = () => (
	<Fieldset>
		<Legend>Strzały</Legend>
		<Item>
			<Input type="radio" id="single" name="shots" value="single" checked={undefined}/>
			<Label htmlFor="single">pojedyncze (+ bonus za trafienie )</Label>
		</Item>
		<Item>
			<Input type="radio" id="series" name="shots" value="series" checked={undefined}/>
			<Label htmlFor="series">seria (3 strzały)</Label>
		</Item>
	</Fieldset>
);