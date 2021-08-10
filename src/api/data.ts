import { IData } from "../components/interfaces/interfaces";

const url = 'https://app.fakejson.com/q/xdOdc9ZF?token=M37SFqOXjnZXOBpUuOCRXA';

export const getData = async ():Promise<IData>=>{
    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    const body = await response.json();
    return body;
};