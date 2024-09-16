import styled from "styled-components";
import {Link} from "react-router-dom";
import background from "../../../assets/background.jpg"

export const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url(${background});
    background-size: cover;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
		
		@media (orientation: landscape) {
        width: 50%;
    }

`
export const Image = styled.img`
		width: 100%;
		max-width: 600px;
    padding: 30px;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    width: max-content;
    background-color: #9c6448;
    color: white;
    padding: 10px 15px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    font-size: clamp(15px, 5vw, 30px);
    margin: 20px;

`