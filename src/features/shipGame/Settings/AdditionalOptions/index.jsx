import {Fieldset, Input, Item, Label, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectMayTouch, setMayTouch} from "../../shipGameSlice.jsx";

export const AdditionalOptions = () => {
	const mayTouch = useSelector(selectMayTouch);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const mayTouchValue = target.value;

		if (mayTouchValue) {
			dispatch(setMayTouch(!mayTouch));
		}
	};

	return (
		<Fieldset>
			<Legend>Opcje dodatkowe</Legend>
			<Item>
				<Input type="checkbox"
				       id="additionalOptions"
				       checked={mayTouch}
				       onChange={onChangeHandler}
				/>
				<Label htmlFor="additionalOptions">Statki mogą się stykać</Label>
			</Item>
		</Fieldset>
	)
};