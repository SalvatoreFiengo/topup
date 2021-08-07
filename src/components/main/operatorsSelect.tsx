import { FC } from 'react';
import styled from 'styled-components';

type OperatorsSelectTypes={
    data: any;
    iso: string;
}
const OperatorsSelectComponent:FC<OperatorsSelectTypes> = ({data, iso})=>{
    const operators = iso===""?data.operators:data.operators.filter((operator:any)=>operator.iso===iso)
    return(
        <OperatorsSelect>
            <div><h2>Select your operator</h2></div>
            {operators.map((op:any)=>{
                return(
                    <div className="operator-card" key={op.id}><p>{op.name}</p></div>
                );
            })}
        </OperatorsSelect>
    );
};
const OperatorsSelect = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-contents: space-around;
    div{
        flex: 0 0 100%;
        h2{
            text-align: center;
            margin-bottom: 2rem;
        }
    }
    div.operator-card{
        width: 100%;
        height: 56px;
        text-align: center;
        border: 1px solid rgb(112, 140, 140);
        border-radius: 8px;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        cursor: pointer;
        p{
            line-height: 1.5;
        }
        &:hover{
            box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
        }
    }
`;
export default OperatorsSelectComponent;