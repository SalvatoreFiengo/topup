import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionComponent from './sectionComponent'; 
import mockData from '../../mockData/mockData.json';
import { IData } from '../interfaces/interfaces';
import { getData } from '../../api/data';

type FetchDataType ={
    data: IData;
    isLoading: boolean;
    error: string;
    isError: boolean;
  };

const MainComponent:FC = ()=>{

    const [fetchData, setData]= useState<FetchDataType>({
        data: {countries:[], operators:[], products:[]},
        isLoading:true,
        error:"",
        isError: false
      });
    const [isOpen, toggleModal] = useState<boolean>(false);
      const handleToggleModal = ():void=>{
          toggleModal(!isOpen);
      };
    const handleGetData = ():void=>{
        try{ 
            getData()
            .then((body)=>{
                setData({
                    ...fetchData,
                    data:body,
                    isLoading:false
                })
            });
        }
        catch(error){
            setData({
                ...fetchData,
                error: error.message,
                isError: true,
                isLoading: false,
                data: mockData
            })
            toggleModal(true);
        }
    }
    useEffect (() => {
        handleGetData();    
      },[]);
    return(
        
        <Main>
            {fetchData.isLoading?
                <div>...Loading</div>
                :
                <SectionComponent data={fetchData.data} isOpen={isOpen} error={fetchData.error} toggleModal={handleToggleModal}/> 
            } 
        </Main>
    );
};
const Main = styled.main`
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    background: rgb(204, 255, 246);
    min-height: 100vh;
    @media(min-width: 768px){
        padding-top: 3rem;
    }
`;

export default MainComponent;
