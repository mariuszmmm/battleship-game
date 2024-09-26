import styled from "styled-components";

export const Section = styled.section`
    background-color: ${({theme}) => theme.colors.backgroundColor_2};
    max-width: ${({theme}) => theme.breakpoints.big};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 40px 10px;
    min-height: calc(100vh - clamp(10px, 4vw, 40px));
    gap: 40px;

    @media (max-width: ${({theme}) => theme.breakpoints.big}) {
        padding: 20px 0;
        gap: 20px;
    }
`;