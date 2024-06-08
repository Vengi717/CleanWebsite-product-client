import moment from 'moment'

export const dateToCounter = (date) => {
    const eventTime = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime * 1000, 'milliseconds');

    return duration.days() + "d " + duration.hours() + "h " + duration.minutes() + "m";
}

export const getDays = (date) => moment(date).fromNow();

export const dateToTimeStamp = (date) =>
    moment(date).format("YYYY-MM-DD HH:mm:ss");


export const timeStampToDate = (timestamp) =>
    moment(timestamp).format('YYYY-MM-DD');

export const createTimeStamp = () =>
    moment().format("YYYY-MM-DD HH:mm:ss");

export const GetMonthName = (date) => 
    moment(date, "YYYY-MM-DD HH:mm:ss").format('dddd');

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
