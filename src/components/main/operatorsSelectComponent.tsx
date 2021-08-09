import { FC } from 'react';
import styled from 'styled-components';
import { IoperatorsSelect } from '../interfaces/interfaces';

const OperatorsSelectComponent:FC<IoperatorsSelect> = ({data, iso, setState, operator, children})=>{
    
    const operators = iso===""?data.operators:data.operators.filter((operator:any)=>operator.iso===iso)
    return(
        <OperatorsSelect>
            {operator===null?
            <>
                <h2>Select your operator</h2>
                {operators.map((op:any)=>{
                    return(
                        <div className="operator-card" key={op.id} onClick={()=>setState("operator",op)}><p>{op.name}</p></div>
                    );
                })}
            </>
            :
            <>
                {children}
            </>
            }
        </OperatorsSelect>
    );
};
const OperatorsSelect = styled.div` 
    h2{
        text-align: center;
        margin-bottom: 2rem;
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