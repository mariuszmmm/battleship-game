import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const Players = () => {

	return (
		<Fieldset>
			<Legend>Gracze</Legend>
			<Item>
				<Input type="radio" id="compVsComp" name="players" value="compVsComp" checked={true}/>
				<Label htmlFor="compVsComp">comp vs comp</Label>
			</Item>
			<Item>
				<Input type="radio" id="compVsplayer" name="players" value="compVsplayer" checked={true}/>
				<Label htmlFor="compVsplayer">comp vs player</Label>
			</Item>
			<Item>
				<Input type="radio" id="playerVsplayer" name="players" value="playerVsplayer" checked={true}/>
				<Label htmlFor="playerVsplayer">player vs player</Label>
			</Item>
		</Fieldset>
	)
}