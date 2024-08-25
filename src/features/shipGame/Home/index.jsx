import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../../assets/ships.png";
import {StyledLink} from "../../../components/Buttons";
import {useDispatch} from "react-redux";
import {setSettingsState} from "../shipGameSlice.jsx"

export const Home = () => {
	const dispatch = useDispatch();
console.log("test")
	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage}/>
				<StyledLink to="/settings" onClick={() => dispatch(setSettingsState())}> Rozpocznij </StyledLink>
			</Content>
		</HomeWrapper>
	)
};