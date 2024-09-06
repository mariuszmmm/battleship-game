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
				dispatch(setShots({name: "single", number: 1}))
				break;
			case "series":
				dispatch(setShots({name: "series", number: 3}))
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
				       checked={shots.name === "single"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="single">pojedyncze (+ bonus za trafienie )</Label>
			</Item>
			<Item>
				<Input type="radio"
				       id="series"
				       name="shots"
				       value="series"
				       checked={shots.name === "series"}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="series">seria (3 strzały)</Label>
			</Item>
		</Fieldset>
	)
};