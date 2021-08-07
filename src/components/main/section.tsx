import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectComponent from './select';
import ModalComponent from '../modal/modal';

type SectionType = {
    data:any;
    isError: boolean;
    error: string;
}


const SectionComponent:FC<SectionType> = ({data, isError, error})=>{

    const [isOpen, toggleModal] = useState(false);

    useEffect(()=>{
        if(isError)toggleModal(true);
        toggleModal(false);
    },[isError]);

    return(
        <Section>
            <ModalComponent modalTitle={" Error "} modalMsg={error} isOpen={isOpen} toggleModal={toggleModal}/>
            <SelectComponent data={data}/>
            
        </Section>
    );
};
const Section = styled.div`
    width : 100%;
    margin: 0 auto;
    @media (min-width: 768px){
        width: 50%;
    }
`;
export default SectionComponent;