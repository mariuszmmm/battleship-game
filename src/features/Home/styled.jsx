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
    width: 100%;
`
export const Image = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    position: absolute;
    left: 48%;
    top: 70%;
    transform: translateX(-50%);
    background-color: #9c6448;
    color: white;
    padding: 10px 15px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    font-size: clamp(15px, 5vw, 30px);
`