import styled, {css} from 'styled-components';
import {rgba} from "polished";

export const SettingsItem = styled.div`
    background-color: ${({theme}) => theme.colors.secondaryColor};
    color: ${({theme}) => theme.colors.textColor};
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    box-shadow: ${({theme}) => theme.boxShadow.container};
    width: ${({theme}) => theme.breakpoints.midSmall};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    min-width: 350px;
    padding: 10px;
    max-width: 95%;
`;

export const Fieldset = styled.fieldset`
    width: 100%;
    padding: 8px 8px 15px;
`;

export const Legend = styled.legend`
    margin: 0 10px 3px;
    padding: 0 5px;
    letter-spacing: 2px;
`;

export const AdditionalItemsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

export const AdditionalItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    ${({disabled}) => disabled && css`
        color: ${({theme}) => rgba(theme.colors.button.textColor, 0.4)};
    `}
`;

export const InputsRadioContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 5px;
    gap: 20px;
`;

export const InputRadioWrapper = styled.div`
    display: flex;
    height: 30px;
    cursor: pointer;
    ${({disabled}) => disabled && css`
        cursor: not-allowed;
    `};
`;

export const InputRadio = styled.input`
    width: 17px;
    cursor: pointer;
    margin-bottom: 2px;
    ${({disabled}) => disabled && css`
        cursor: not-allowed;
    `};
`;

export const LabelInput = styled.label`
    display: flex;
    align-items: center;
    margin-left: 5px;
    cursor: pointer;
    ${({disabled}) => disabled && css`
        cursor: not-allowed;
    `};
`;