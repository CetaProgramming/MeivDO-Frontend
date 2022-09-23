class TimePassed{
    static calculate(dateTime){

        const timeInMin = {
            min: 60,
            hour: 3600,
            day: 86400,
            month: 2592000,
            year: 31104000
        }

        const timePassed = this.#calculateTime(new Date(dateTime));
        const calculateDayMonthYear = Math.floor(timePassed/60);
        const codeTimeString = calculateDayMonthYear == 0 ? [timePassed, 'SEC'] : 
                         calculateDayMonthYear < 60 ? [Math.floor(timePassed / timeInMin.min), 'MIN'] : 
                         calculateDayMonthYear < 1440 ? [Math.floor(timePassed / timeInMin.hour), 'HOUR'] : 
                         calculateDayMonthYear < 43200 ? [Math.floor(timePassed / timeInMin.day), 'DAY'] :
                         calculateDayMonthYear < 518400 ? [Math.floor(timePassed / timeInMin.month),'MONTH'] :
                         [Math.floor(timePassed / timeInMin.year), 'YEAR'];
        return codeTimeString;
    }

    static #calculateTime(dateData){
        const [dateObj, currentDate] = [dateData, new Date()];
        if(dateObj > currentDate)
            throw new Error('Error dateObj cant greather than currentDate');  
        return Math.ceil(Math.floor(currentDate.getTime() - dateObj.getTime()) / 1000);
    } 
}

export default TimePassed;