import { FC } from 'react';
import styled from 'styled-components';

type InfoComponentTypes = {
    label: string | undefined | null,
    setState:()=>void,
    msg: JSX.Element | string | undefined | null  
}
const InfoComponent:FC<InfoComponentTypes> =({label, msg ,setState})=>{
    const toggleInfo = ()=>{
        setState();
    }
    return(
        <Info>
            <div className="left">
                <strong>{label}: </strong>
            </div> 
            <div className="msg-spacer">
                <strong>{msg}</strong>
            </div> 
            <div className="back right" onClick={toggleInfo}>
                <strong>Edit</strong>
                <div className="arrow-right"></div>
            </div>
        </Info>
    );
};
const Info = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin: 2rem 0 2rem 0;
    div{
        width: 30%;
        &.left{
            text-align: left;
        }
        &.right{
            text-align: right;
        }
    }
    .msg-spacer{
        text-align: center;
        width: 40%;
        margin: 0 1em 0 1em;
    }
    .back{
        cursor: pointer;
        color: rgb(217, 0, 199);
        .arrow-right{
            display:inline-block;
            margin-left: 0.5rem;
            opacity: 0;
            width:0;
            height:0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid rgb(217,0,199);
        }
        &:hover{
            .arrow-right{
                opacity:1;
            }
        }
    }
`;
export default InfoComponent