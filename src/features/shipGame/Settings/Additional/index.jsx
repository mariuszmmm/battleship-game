import {
	AdditionalItem,
	AdditionalItemsContainer,
	Fieldset,
	InputsRadioContainer,
	InputRadio,
	Legend
} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectMayTouch, setParameters} from "../../shipGameSlice.jsx";

export const Additional = () => {
	const mayTouch = useSelector(selectMayTouch);
	const dispatch = useDispatch();

	const onChangeHandler = ({target}) => {
		const mayTouchValue = target.value;
		if (mayTouchValue) {
			dispatch(setParameters({mayTouch: !mayTouch}));
		}
	};

	return (
		<Fieldset>
			<Legend>Opcje dodatkowe</Legend>
			<AdditionalItemsContainer>
				<AdditionalItem>
					Statki mogą się stykać :
					<InputsRadioContainer>
						<InputRadio type="radio"
						            name="contact"
						            id="yes"
						            value="yes"
						            checked={mayTouch}
						            onChange={onChangeHandler}
						/>
						<label htmlFor="yes">tak</label>
						<InputRadio type="radio"
						            name="contact"
						            id="no"
						            value="no"
						            checked={!mayTouch}
						            onChange={onChangeHandler}
						/>
						<label htmlFor="no">nie</label>
					</InputsRadioContainer>
				</AdditionalItem>
			</AdditionalItemsContainer>
		</Fieldset>
	)
};