
const formatMonth = (month:number):string=>{
    let formattedMonth = ""
    if (month<10){
        formattedMonth = "0"+month.toString();
    }else{
        formattedMonth = month.toString();
    }
    return formattedMonth;
}

export const getMonthArray = ()=>{

    let month = [];
    for(let i=1; i<=12; i++){
        month.push(formatMonth(i))
    }
    return month
}
export const getYearArray = ()=>{
    const today = new Date()
    const year = today.getFullYear();
    const yearArray = [];
    for(let i=year-25; i<=year+25; i++){
        yearArray.push(i.toString().slice(2));
    }
    return yearArray;
}