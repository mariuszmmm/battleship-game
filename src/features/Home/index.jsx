import {Content, HomeWrapper, Image} from "./styled.jsx";
import shipsImage from "../../assets/ships.png";
import {StyledLink} from "../../components/StyledLink/index.jsx";

export const Home = () => {

	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage}/>
				<StyledLink to="/settings"> Rozpocznij </StyledLink>
			</Content>
		</HomeWrapper>
	)
};