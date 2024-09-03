import styled from "styled-components";

export const Section = styled.section`
    min-width: 380px;
    min-height: 100vh;
    background-color: darkgray;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1200px) {
        padding: 5px;
    };
`;