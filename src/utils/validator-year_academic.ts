

 export default function validate_year_academic(value:string){
    return isYearAcademic(value);
}

function isYearAcademic(value:string){

    let dates=value.split('-');
    if (dates.length==2) {
        for (const element of dates) 
            if (!Number(element))
                return false; 
        if (Number(dates[1])-Number(dates[0])!=1) 
            return false;

        return true;    
    } 
    else{
        return false;
    }
}