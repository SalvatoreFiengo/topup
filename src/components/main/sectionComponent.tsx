import { FC } from 'react';
import styled from 'styled-components';
import SelectWrapperComponent from './selectWrapperComponent';
import ModalComponent from '../modal/modal';
import { Idata } from '../interfaces/interfaces';

type SectionType = {
    data:Idata|null;
    isOpen: boolean;
    error: string;
    toggleModal: ()=>void;
}


const SectionComponent:FC<SectionType> = ({data, isOpen, error, toggleModal})=>{

    const errorMessage = (error:string)=>(
        <p>{error}</p>
    )
          
    return(
        <Section>
            <ModalComponent modalTitle={" Error "} modalMsg={errorMessage(error)} isOpen={isOpen} toggleModal={toggleModal} color={"rgb(217,0,199)"} isError={true}/>
            <SelectWrapperComponent data={data}/> 
        </Section>
    );
};
const Section = styled.div`
    width : 100%;
    margin: 0 auto;
    @media (min-width: 768px){
        width: 70%;
    }
    @media (min-width: 992px){
        width: 50%;
    }
`;
export default SectionComponent;