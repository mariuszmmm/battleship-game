import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../../assets/ships.png";
import {StyledLink} from "../../../components/Buttons";
import {useDispatch} from "react-redux";
import {setState} from "../shipGameSlice.jsx"

export const Home = () => {
	const dispatch = useDispatch();
	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage}/>
				<StyledLink to="/settings" onClick={() => dispatch(setState("settings"))}> Rozpocznij </StyledLink>
			</Content>
		</HomeWrapper>
	)
};