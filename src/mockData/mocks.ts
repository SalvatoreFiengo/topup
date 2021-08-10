import { IData } from "../components/interfaces/interfaces";
import { CountryType } from "../components/interfaces/types";

export const countryMock:CountryType = {iso:"IT", name:"Italy", prefix:"+39"};
export const countriesDataMock:IData = {
    countries:[
        {
            iso:"IT", 
            name:"Italy", 
            prefix:"+39"
        }, 
        {
            iso: "IE",
            name: "Ireland",
            prefix: "18"
        }
    ], 
    operators:[], 
    products:[]
};