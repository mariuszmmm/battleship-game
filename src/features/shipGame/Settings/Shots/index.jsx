import {ButtonsContainer, Fieldset, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, selectNumberOfShots, setParameters} from "../../shipGameSlice.jsx";
import {Button} from "../../../../components/Buttons/index.jsx";

export const Shots = () => {
	const numberOfShots = useSelector(selectNumberOfShots);
	const numberOfShips = useSelector(selectNumberOfShips);
	const dispatch = useDispatch();

	const onClickHandler = (number) => {
		switch (number) {
			case 1:
				dispatch(setParameters({numberOfShots: 1}))
				break;
			case 3:
				dispatch(setParameters({numberOfShots: 3}))
				break;
			case numberOfShips:
				dispatch(setParameters({numberOfShots: numberOfShips}))
				break;
			default:
				return
		}
	};

	return (
		<Fieldset>
			<Legend>Strzały</Legend>
			<ButtonsContainer>
				<Button
					$active={numberOfShots === 1}
					onClick={() => onClickHandler(1)}
				>
					<span>1</span>
				</Button>
				<Button
					$active={numberOfShots === 3}
					onClick={() => onClickHandler(3)}
				>
					<span>3</span>
				</Button>
				<Button
					$active={numberOfShots === numberOfShips}
					onClick={() => onClickHandler(numberOfShips)}
				>
					<span>= statki</span>
				</Button>
			</ButtonsContainer>
		</Fieldset>
	)
};