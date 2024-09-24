import styled from "styled-components";

export const Header = styled.header`
    background-color: ${({theme}) => theme.colors.secondaryColor};
    box-shadow: 2px 2px 10px ${({theme}) => theme.colors.primaryColor};
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    color: ${({theme}) => theme.colors.textColor};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    min-width: 300px;
    font-size: 1.3rem;
    letter-spacing: 2px;
    padding: 10px;
    width: 600px;
    max-width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
        font-size: 1.2rem;
    };
`;