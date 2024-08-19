import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const Shots = () => {
	return (
		<Fieldset>
			<Legend>Strzały</Legend>
			<Item>
				<Input type="radio" id="single" name="shots" value="single" checked={true}/>
				<Label htmlFor="single">pojedyncze</Label>
			</Item>
			<Item>
				<Input type="radio" id="series" name="shots" value="series" checked={true}/>
				<Label htmlFor="series">seria</Label>
			</Item>
		</Fieldset>
	)
}