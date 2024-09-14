import styled, {css} from 'styled-components';

export const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    min-width: 340px;
    background-color: bisque;
    padding: 10px 10px 50px;
`;

export const SettingsHeader = styled.div`
    min-width: 350px;
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
    width: 60%;
`;

export const SettingsItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    min-width: 350px;
    background-color: #9c6448;
    color: white;
    border: 2px solid black;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    padding: 10px;
    width: 60%;
`;

export const Fieldset = styled.fieldset`
    width: 100%;
    padding: 8px;
`

export const Legend = styled.legend`
    margin: 0 10px 3px;
    padding: 0 5px;
    letter-spacing: 1px;
`

export const Label = styled.label`
    padding: 10px 0 10px 10px;
    ${({$disabled}) => $disabled && css`
        color: lightgrey
    `}
`
export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 0 5px 0 5px;
`;

export const AdditionalItemsContainer = styled.div`
   
`;

export const AdditionalItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
`;

export const InputsRadioContainer = styled.div`
    display: flex;

    height: 100%;

    label {
        margin-left: 5px;
    }

    input {
        margin-left: 20px;
    }
`;