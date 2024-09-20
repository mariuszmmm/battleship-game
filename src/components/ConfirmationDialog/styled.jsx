import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Overlay = styled.div`
    background-color: ${({theme}) => theme.colors.secondaryColor};
    width: clamp(300px, 50vw, 500px);
    padding: 20px;
    z-index: 1000;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    letter-spacing: 1px;
    font-size: 1rem;

    @media (orientation: landscape) {
        font-size: 1.5rem;
    }
`

export const ButtonContainer = styled.div`
    //display: flex;
    //width: 100%;
    //justify-content: center;
    //margin: 10px;
    //gap: 20px;
`