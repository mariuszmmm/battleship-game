import {ButtonsContainer, Fieldset, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, setParameters} from "../../shipGameSlice.jsx";
import {Button} from "../../../../components/Buttons/index.jsx";

export const Ships = () => {
	const numberOfShips = useSelector(selectNumberOfShips);
	const dispatch = useDispatch();

	const onClickHandler = (number) => {
		switch (number) {
			case 5:
				dispatch(setParameters({numberOfShips: 5}))
				break;
			case 7:
				dispatch(setParameters({numberOfShips: 7}))
				break;
			case 10:
				dispatch(setParameters({numberOfShips: 10}))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Ilość statków</Legend>
			<ButtonsContainer>
				<Button $active={numberOfShips === 5}
				        onClick={() => onClickHandler(5)}
				>
					<span>5</span>
				</Button>
				<Button $active={numberOfShips === 7}
				        onClick={() => onClickHandler(7)}>
					<span>7</span>
				</Button>
				<Button $active={numberOfShips === 10}
				        onClick={() => onClickHandler(10)}>
					<span>10</span>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	)
}