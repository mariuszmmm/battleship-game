import {Content, HomeWrapper, Image, StyledLink} from "./styled.jsx";
import shipsImage from "../../assets/ships.png";

export const Home = () => {

	return (
		<HomeWrapper>
			<Content>
				<Image src={shipsImage}/>
				<StyledLink to="/play"> Rozpocznij grę </StyledLink>
			</Content>
		</HomeWrapper>
	)
};