import styled from "styled-components";
import { ErrorType } from "../components/interfaces/types";

export const Input = styled.input`
    margin: 0.5em 0 0 0;
    border: 1px solid rgb(112, 140, 140);
    border-radius: 8px;
    height: 48px;
    display: block;
    width: 100%;
    color: rgb(0, 74, 89);
    padding: 0px 16px;
    box-sizing: border-box;

    &.left{
        display: inline-block;
        width: 50px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    &.right{
        display: inline-block;
        width: 50px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    } 
    &:focus { 
        box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
        outline: none;
    }
`

export const Error = styled.p`
    margin: ${(props: ErrorType)=>props.multi?"0 2em 0 0.1em":"0.2em 0 0 0"};
    color: rgb(217,0,199);
`;

export const Button = styled.button`
    height: 56px;
    width: 100%;
    margin-top: 2rem;
    color: rgb(0, 74, 89);
    font-size: 18px;
    background-color: rgb(203 242 0);
    border: 0 solid rgb(112, 140, 140);
    border-radius: 64px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover{
        background-color: rgb(0, 74, 89);
        color: rgb(203 242 0);
    }

`;