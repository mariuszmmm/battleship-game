import styled, {css} from 'styled-components';

export const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    min-width: 380px;
    background-color: bisque;
    margin: 10px;
`;

export const SettingsHeader = styled.div`
    min-width: 340px;
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 2px;
    padding: 10px;
`;

export const SettingsItem = styled.div`
    min-width: 340px;
    //width: 500px;
    //min-height: 50px;
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
    ${({$disabled}) => $disabled && css`
        color: lightgrey
    `}
`