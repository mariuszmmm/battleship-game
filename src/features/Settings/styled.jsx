import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const SettingsWrapper = styled.div`
    width: 600px;
    height: 100vh;
    background-color: darkgray;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
    align-items: center;
		gap: 20px
`;

export const SettingsHeader = styled.div`
    min-width: 300px;
    min-height: 50px;
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
		font-size: 1.3rem;
		font-weight: bold;
    letter-spacing: 2px;
`;

export const SettingsItem = styled.div`
    min-width: 300px;
    min-height: 50px;
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
		padding: 10px;
`;

export const Fieldset = styled.fieldset`
	width: 100%;
`

export const Legend = styled.legend`
		padding-left: 10px;
		padding-right: 10px;
    letter-spacing: 1px;
`

export const Item = styled.div`
    padding: 5px;
`

export const Input = styled.input`

`

export const Label = styled.label`
    padding: 10px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    background-color: #9c6448;
    color: white;
    padding: 5px 15px;
    border: 2px solid black;
    border-radius: 10px;
    min-width: max-content;
    font-size: clamp(15px, 5vw, 30px);
		margin-top: 10px;
`