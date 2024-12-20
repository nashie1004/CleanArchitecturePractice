import moment from "moment";
import { TableAction } from "./enums";

export function toDateTimeFormat(val: string){
    let retVal = "";

    if (!moment(val).isValid()) return retVal;

    retVal = moment(val).format("MM/DD/YYYY hh:mm A")

    return retVal;
}

export function tableActionFormat(val: any){
    switch(val){
        case TableAction.Added:
          return "Added"
        case TableAction.Modified:
          return "Modified"
        case TableAction.Deleted:
          return "Deleted"
        default:
          return "";
      }
}