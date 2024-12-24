import moment from "moment";

export function dateIs1900(val: string | Date){
    return moment(val).isSame(moment(new Date(0)));
}