import styled from "styled-components";

export const Header = styled.header`
    background-color: ${({theme}) => theme.colors.secondaryColor};
    box-shadow: ${({theme}) => theme.boxShadow.container};
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    color: ${({theme}) => theme.colors.textColor};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    width: ${({theme}) => theme.breakpoints.midSmall};
    font-size: 1.3rem;
    letter-spacing: 2px;
    padding: 10px;
    max-width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${({theme}) => theme.breakpoints.big}) {
        font-size: 1.2rem;
    };
`;