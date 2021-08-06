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
    const [counter, setCounter] = useState(0);

    const handleNextSelectPage = ()=>{
        let count = counter+1;
        setCounter(count)
    };
    const handlePrevSelectPage = ()=>{
        let count = counter-1;
        setCounter(count)
    };

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
    width : 50%;
    margin: 0 auto;
`;
export default SectionComponent;