import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ReactComponent as ArrowLeft} from "../../assets/arrow-left.svg";

export const Back = styled(Link)`
    text-decoration: none;
    background-color: #9c6448;
    color: white;
    padding: 3px 3px 0px 3px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    align-self: flex-start;
    margin: 10px;
`

export const ArrowLeftIcon = styled(ArrowLeft)`
    width: 24px;
    height: 24px;
    fill: #fff; /* Przykład: zmiana koloru wypełnienia */
`