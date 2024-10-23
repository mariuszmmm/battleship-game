import {Fieldset, Legend} from "../styled";
import {selectNumberOfShips, setParameters} from "../../shipGameSlice";
import {Button, ButtonsContainer} from "../../../../components/Buttons";
import {useAppDispatch, useAppSelector} from "../../../../config/hooks";
import {Parameters} from "../../../../types/types";

export const Ships = () => {
	const numberOfShips = useAppSelector(selectNumberOfShips);
	const dispatch = useAppDispatch();

	const onClickHandler = (number: Parameters["numberOfShips"]) => {
		dispatch(setParameters({numberOfShips: number}));
	};

	return (
		<Fieldset>
			<Legend>Ilość statków</Legend>
			<ButtonsContainer>
				<Button $active={numberOfShips === 5}
				        onClick={() => onClickHandler(5)}
				        $setting
				>
					5
				</Button>
				<Button $active={numberOfShips === 7}
				        onClick={() => onClickHandler(7)}
				        $setting
				>
					7
				</Button>
				<Button $active={numberOfShips === 10}
				        onClick={() => onClickHandler(10)}
				        $setting
				>
					10
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};