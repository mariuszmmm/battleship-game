import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";
import {selectPlayers, setPlayers} from "../../shipGameSlice.jsx";
import {useDispatch, useSelector} from "react-redux";

export const Players = () => {
	const players = useSelector(selectPlayers);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const playersValue = target.value;

		switch (playersValue) {
			case "compVsPlayer":
				dispatch(setPlayers("compVsPlayer"))
				break;
			case "playerVsPlayer":
				dispatch(setPlayers("playerVsPlayer"))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Gracze</Legend>
			<Item>
				<Input type="radio"
				       id="compVsPlayer"
				       name="players"
				       value="compVsPlayer"
				       checked={players === "compVsPlayer"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="compVsPlayer">komputer / gracz</Label>
			</Item>
			<Item>
				<Input type="radio"
				       id="playerVsPlayer"
				       name="players"
				       value="playerVsPlayer"
				       checked={players === "playerVsPlayer"}
				       onChange={onChangeHandler}
				       disabled/>
				<Label htmlFor="playerVsPlayer" $disabled>gracz / gracz</Label>
			</Item>
		</Fieldset>
	)
};