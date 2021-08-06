import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionComponent from './section'; 

type FetchDataType ={
    data:{
        countries?:any;
        operators?:any;
        products?:any;
    };
    isLoading:boolean;
    error:string;
    isError:boolean;
  };

const MainComponent:FC = ()=>{

    const [fetchData, setData]= useState<FetchDataType>({
        data: {
            countries: [],
            operators: [],
            products: []
        },
        isLoading:true,
        error:"",
        isError: false,
      });

    useEffect (() => {
        const url = 'https://app.fakejson.com/q/xdOdc9ZF?token=M37SFqOXjnZXOBpUuOCRXA';
        const fetchCountries = async ()=>{
          try{ 
            const response = await fetch(url)
            const body = await response.json();
            setData({
                ...fetchData,
                data:body,
                isLoading:false
                })
            }catch(error){
                const errorMsg='Something went wrong : ' + error
                setData({
                    ...fetchData,
                    error: errorMsg
                })
            } 

        }
          
        fetchCountries();
        console.log(fetchData.data.countries)
      },[]);
    return(
        
        <Main>
            {fetchData.isLoading?
                <div>...Loading</div>
                :
                <SectionComponent data={fetchData.data} isError={fetchData.isError} error={fetchData.error}/>
                
                
            } 
        </Main>
    );
};
const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default MainComponent;
