import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectShots, setShots} from "../../shipGameSlice.jsx";

export const Shots = () => {
	const shots = useSelector(selectShots);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const shotsValue = target.value;

		switch (shotsValue) {
			case "single":
				dispatch(setShots("single"))
				break;
			case "series":
				dispatch(setShots("series"))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Strzały</Legend>
			<Item>
				<Input type="radio"
				       id="single"
				       name="shots"
				       value="single"
				       checked={shots === "single"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="single">pojedyncze (+ bonus za trafienie )</Label>
			</Item>
			<Item>
				<Input type="radio"
				       id="series"
				       name="shots"
				       value="series"
				       checked={shots === "series"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="series">seria (3 strzały)</Label>
			</Item>
		</Fieldset>
	)
};