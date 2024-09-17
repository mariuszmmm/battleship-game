import styled from 'styled-components';

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
    justify-items: center;
    padding: 50px 10px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 50px 10px 20px;
    }
`;

export const Settings = styled.div`
    display: grid;
    width: 300px;
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