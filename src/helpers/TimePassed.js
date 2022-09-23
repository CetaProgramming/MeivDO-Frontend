class TimePassed{
    static calculate(dateTime){
        const timeInSec = {
            min: 60,
            hour: 3600,
            day: 86400,
            month: 2592000,
            year: 31104000
        }

        const timeInMin = {
            hour: 60,
            day: 1440,
            month: 43200,
            year: 518400
        }

        const timePassed = this.#calculateTime(new Date(dateTime));
        const calculateDayMonthYear = Math.floor(timePassed/60);
        const codeTimeString = calculateDayMonthYear == 0 ? [timePassed, 'SEC'] : 
                         calculateDayMonthYear < timeInMin.hour ? [Math.floor(timePassed / timeInSec.min), 'MIN'] : 
                         calculateDayMonthYear < timeInMin.day ? [Math.floor(timePassed / timeInSec.hour), 'HOUR'] : 
                         calculateDayMonthYear < timeInMin.month ? [Math.floor(timePassed / timeInSec.day), 'DAY'] :
                         calculateDayMonthYear < timeInMin.year ? [Math.floor(timePassed / timeInSec.month),'MONTH'] :
                         [Math.floor(timePassed / timeInSec.year), 'YEAR'];
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