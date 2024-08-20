import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";

export const Players = () => (
	<Fieldset>
		<Legend>Gracze</Legend>
		<Item>
			<Input type="radio" id="compVsComp" name="players" value="compVsComp" checked={undefined} />
			<Label htmlFor="compVsComp">comp vs comp</Label>
		</Item>
		<Item>
			<Input type="radio" id="compVsplayer" name="players" value="compVsplayer" checked={undefined}/>
			<Label htmlFor="compVsplayer">comp vs player</Label>
		</Item>
		<Item>
			<Input type="radio" id="playerVsplayer" name="players" value="playerVsplayer" checked={undefined} disabled />
			<Label htmlFor="playerVsplayer" $disabled>player vs player</Label>
		</Item>
	</Fieldset>
);