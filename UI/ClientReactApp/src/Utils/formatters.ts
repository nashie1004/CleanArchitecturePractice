import moment from "moment";
import { TableAction } from "./enums";
import { dateIs1900 } from "./helpers";

export function toTwentyChars(val: string){
  if (!val) return "";
  return val.length > 20 ? `${val.substring(0, 20)}...` : val;
}

export function toDateTimeFormat(val: string | Date){
  if (!moment(val).isValid()) return "";

  return moment(val).format("MM/DD/YYYY hh:mm A")
}

/**
 * 1/1/1900 => ""
 * incorrect date value => ""
 * any valid word date => "MM/DD/YYYY hh:mm A"
 */
export function cleanDisplayDate(val: string | Date){
  return dateIs1900(val) ? "" : toDateTimeFormat(val);
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