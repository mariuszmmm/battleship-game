import {
    resetCounter,
    selectCounter,
    selectDescription,
    setCounter,
} from "../exampleSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Wrapper } from "./styled";
import { Link } from "react-router-dom";

export const Example1Page = () => {
    const counter = useSelector(selectCounter);
    const description = useSelector(selectDescription);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <Header $isEven={counter % 2 === 0}>
                Page <span>{counter}</span>
            </Header>
            <p>{description}</p>
            <Link to={`/page1/${counter}`}>LINK TO COUNTER NUMBER:</Link>
            <br />
            <br />
            <Button onClick={() => dispatch(setCounter(counter + 1))}>+</Button>
            <Button onClick={() => dispatch(setCounter(counter - 1))}>-</Button>
            <Button onClick={() => dispatch(resetCounter())}>Reset</Button>
        </Wrapper>
    );
};
