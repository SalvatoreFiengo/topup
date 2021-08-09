import { shallow, mount } from 'enzyme';
import { Idata, IappMainState } from '../interfaces/interfaces'; 
import CountrySelectComponent from '../main/countrySelectComponent';

describe('CountrySelectComponent', ()=>{
    let data: Idata|null;
    let state: IappMainState;
    let handleSetState: (name: string, value: any) => void;

    beforeEach(()=>{
        data = {countries:[], operators:[], products:[]}
        state = {        
            phoneNumber: "",
            country: null,
            operator: null,
            amount: null,
            cardNumber: null
        };
        handleSetState = (name:string, value:any)=>{
            state = {
                ...state,
                [name]:value
            }
        }
    });

    test('it renders countrySelectComponent', ()=>{
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={state.country}/>);
        expect(component).toMatchSnapshot(); 
    });
    test('it contains "Who would you like to top-up?" and not "Summary" on country=null', ()=>{
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={state.country}/>);
        expect(component.text().includes("Who would you like to top-up?")).toBe(true); 
        expect(component.text().includes("Summary")).toBe(false);
    });
    test('it contains "Summary" and not "Who would you like to top-up?" on country=value', ()=>{
        state.country = {iso:"co", name:"country", prefix:"00"};
        const component = shallow(<CountrySelectComponent data={data} setState={handleSetState} country={state.country}/>);
        expect(component.text().includes("Summary")).toBe(true);
        expect(component.text().includes("Who would you like to top-up?")).toBe(false);  
    });
    test('it renders a children component country=value', ()=>{
        state.country = {iso:"co", name:"country", prefix:"00"};
        const child = <h1>child</h1>
        const component = mount(<CountrySelectComponent data={data} setState={handleSetState} country={state.country} >{child}</CountrySelectComponent>);
        expect(component.containsMatchingElement(child)).toEqual(true); 
    });
    afterEach(()=>{
        data = null;
        state = {        
            phoneNumber: "",
            country: null,
            operator: null,
            amount: null,
            cardNumber: null
        };
    });
})
