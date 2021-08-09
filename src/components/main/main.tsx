import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionComponent from './sectionComponent'; 
import mockData from './mockData/mockData.json';
import { Idata } from '../interfaces/interfaces';

type FetchDataType ={
    data:Idata|null;
    isLoading:boolean;
    error:string;
    isError:boolean;
  };

const MainComponent:FC = ()=>{

    const [fetchData, setData]= useState<FetchDataType>({
        data: null,
        isLoading:true,
        error:"",
        isError: false,
      });
    const [isOpen, toggleModal] = useState(false);
      const handleToggleModal = ()=>{
          toggleModal(!isOpen);
      };
    useEffect (() => {
        const url = 'https://app.fakejson.com/q/xdOdc9ZF?token=M37SFqOXjnZXOBpUuOCRXA';
        const fetchCountries = async ()=>{
        try{ 
            const response = await fetch(url);
            if (!response.ok) throw Error(response.statusText);
            const body = await response.json();
            setData({
                ...fetchData,
                data:body,
                isLoading:false
                })
            }
            catch(error){
                const errorMsg='Oops ..Something went wrong';
                setData({
                    ...fetchData,
                    error: errorMsg,
                    isError: true,
                    isLoading: false,
                    data: mockData
                })
                toggleModal(true);
            }
        }
          
        fetchCountries();
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
