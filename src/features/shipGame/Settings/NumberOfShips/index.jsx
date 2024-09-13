import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, setParameters} from "../../shipGameSlice.jsx";

export const NumberOfShips = () => {
	const numberOfShips = useSelector(selectNumberOfShips);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const numberOfShipsValue = target.value;

		switch (numberOfShipsValue) {
			case "5":
				dispatch(setParameters({numberOfShips: "5"}))
				break;
			case "10":
				dispatch(setParameters({numberOfShips: "10"}))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Ilość statków</Legend>
			<Item>
				<Input type="radio"
				       id="5"
				       name="numberOfShips"
				       value="5"
				       checked={numberOfShips === "5"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="5">{`5 ➔ (1x5m, 1x4m, 1x3m, 1x2m, 1x1m)`}</Label>
			</Item>
			<Item>
				<Input type="radio"
				       id="10"
				       name="numberOfShips"
				       value="10"
				       checked={numberOfShips === "10"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="10">{`10 ➔ (1x4m, 2x3m, 3x2m, 4x1m)`}</Label>
			</Item>
		</Fieldset>
	)
}