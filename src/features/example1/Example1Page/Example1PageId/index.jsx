import { useSelector } from "react-redux";
import { selectCounter } from "../../exampleSlice";
import { Header } from "../../../../components/Header";

export const Example1PageId = () => {
    const counter = useSelector(selectCounter);
    return <Header>{counter}</Header>;
};
