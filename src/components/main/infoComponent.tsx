import { FC } from 'react';
import styled from 'styled-components';

type InfoComponentTypes = {
    label: string;
    name: string;
    toggleFunc: ()=>void
}
const InfoComponent:FC<InfoComponentTypes> =({label, name, toggleFunc})=>{
    return(
        <Info>
            <div>
                <strong>{label}: </strong>
            </div> 
            <div>
                <strong>{name}</strong>
            </div> 
            <div className="back" onClick={toggleFunc}>
                <strong>Edit</strong>
                <div className="arrow-right"></div>
            </div>
        </Info>
    );
};
const Info = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 2rem 0 2rem 0;
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