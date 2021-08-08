export interface Idata {

    countries:CountryType[],
    operators:OperatorType[],
    products:{
        id: string,
        products: string[]
    }[]
    
};

export type CountryType ={
    iso: string;
    name: string;
    prefix: string;
}
export type OperatorType = {
    id: string,
    iso: string,
    name: string
}
export type State = {
    phoneNumber: string|undefined,
    country: CountryType | null,
    operator: OperatorType | null,
    amount: string | undefined | null
}