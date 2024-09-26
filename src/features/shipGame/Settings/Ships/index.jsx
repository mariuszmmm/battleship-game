import {Fieldset, Legend} from "../styled.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectNumberOfShips, setParameters} from "../../shipGameSlice.jsx";
import {Button, ButtonsContainer} from "../../../../components/Buttons/index.jsx";

export const Ships = () => {
	const numberOfShips = useSelector(selectNumberOfShips);
	const dispatch = useDispatch();

	const onClickHandler = (number) => {
		dispatch(setParameters({numberOfShips: number}));
	};

	return (
		<Fieldset>
			<Legend>Ilość statków</Legend>
			<ButtonsContainer>
				<Button $active={numberOfShips === "5"}
				        onClick={() => onClickHandler("5")}
				        $setting
				>
					5
				</Button>
				<Button $active={numberOfShips === "7"}
				        onClick={() => onClickHandler("7")}
				        $setting
				>
					7
				</Button>
				<Button $active={numberOfShips === "10"}
				        onClick={() => onClickHandler("10")}
				        $setting
				>
					10
				</Button>
			</ButtonsContainer>
		</Fieldset>
	);
};