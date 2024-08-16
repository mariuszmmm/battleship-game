import styled from "styled-components";
import {Link} from "react-router-dom";

export const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: darkgray;
    width: 100vw;
    height: 100vh;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 600px;
`
export const Image = styled.img`
    width: 100%;
`
export const StyledLink = styled(Link)`
		text-decoration: none;
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
    background-color: #9c6448;
    color: white;
    padding: 10px 15px;
    border: 2px solid black;
    border-radius: 10px;
`
