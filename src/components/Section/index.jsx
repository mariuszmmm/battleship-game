import styled from "styled-components";

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    background-color: bisque;
    padding: 40px 10px;
    min-height: calc(100vh - clamp(10px, 4vw, 40px));
    gap: 40px;
		
		@media(max-width: 900px) {
        padding: 20px 0;
        gap: 20px;
		}
`;