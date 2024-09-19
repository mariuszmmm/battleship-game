import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    //gap: 20px;
    align-items: start;
    justify-items: center;
    align-self: start;
    padding: 0 10px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 20px;
        align-self: center;
    }
`;

export const Settings = styled.div`
    display: grid;
    width: 100%;
    grid-template-areas: 
        "random random random"
        ". arrow-top ."
        "arrow-left rotate arrow-right"
        ". arrow-down check-on";
    justify-items: center;
    justify-content: center;
    gap: 20px;

    //@media (max-width: 700px) {
    //    //width: 85vw;
	//	    gap: 15px
    //}
`;