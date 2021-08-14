export type CountryType ={
    iso: string,
    name: string,
    prefix: string
}
export type OperatorType = {
    id: string,
    iso: string,
    name: string
}
export type ProductType = {
    id: string,
    products:string[]
}
export type ErrorType = {
    multi: boolean;
}
export type validationIsErrorReturnType = {
    value:string;
    isError:boolean;
}