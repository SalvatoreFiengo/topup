import React from 'react';
import { shallow, mount } from 'enzyme';
import { IData } from '../components/interfaces/interfaces'; 
import { CountryType } from '../components/interfaces/types';

import CountrySelectComponent from '../components/main/countrySelectComponent';
import { countryMock, countriesDataMock } from '../mockData/mocks';

describe('CountrySelectComponent', ()=>{
    let data: IData;
    let country: CountryType|null;
    let handleSetState: (name: string, value: any) => void;

    test('it renders countrySelectComponent', ()=>{
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={country}/>);
        expect(component).toMatchSnapshot(); 
    });

    test('it contains "Who would you like to top-up?" and not "Summary" on country=null', ()=>{
        country = null;
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={country}/>);
        expect(component.text().includes("Who would you like to top-up?")).toBe(true); 
        expect(component.text().includes("Summary")).toBe(false);
    });

    test('it contains "Summary" and not "Who would you like to top-up?" if country=value', ()=>{
        country = countryMock;
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={country}/>);
        expect(component.text().includes("Summary")).toBe(true);
        expect(component.text().includes("Who would you like to top-up?")).toBe(false);  
    });

    test('it does not renders passed children component (prop.children) if country=null', ()=>{
        country = null;
        const child = <h1>child</h1>
        const component = mount(<CountrySelectComponent data={data} setState={handleSetState} country={country} >{child}</CountrySelectComponent>);
        expect(component.containsMatchingElement(child)).toEqual(false); 
    });

    test('it renders passed children component (prop.children) if country=value', ()=>{
        country = countryMock;
        const child = <h1>child</h1>
        const component = mount(<CountrySelectComponent data={data} setState={handleSetState} country={country} >{child}</CountrySelectComponent>);
        expect(component.containsMatchingElement(child)).toEqual(true); 
    });
 
    test('it renders state "Italy" from data when search is set to "Italy"', ()=>{
        country = null;
        data = countriesDataMock;
        const myState = 'Italy'

        React.useState = jest.fn().mockReturnValue([myState, {}])
        const component = mount(<CountrySelectComponent data={data} setState={handleSetState} country={country} ></CountrySelectComponent>);
        expect(component.text().includes("Italy")).toEqual(true); 
    });
    
    test('it renders state "Ireland" from data when search is set to "Ir"', ()=>{
        country = null;
        data = countriesDataMock;
        const myState = 'Ir'

        React.useState = jest.fn().mockReturnValue([myState, {}])
        const component = mount(<CountrySelectComponent data={data} setState={handleSetState} country={country} ></CountrySelectComponent>);
        expect(component.text().includes("Ireland")).toEqual(true); 
    });
})
