import moment from "moment";
import { TableAction } from "./enums";

export function toTwentyChars(val: string){
  if (!val) return "";
  return val.length > 20 ? `${val.substring(0, 20)}...` : val;
}

export function toDateTimeFormat(val: string){
  if (!moment(val).isValid()) return "";

  return moment(val).format("MM/DD/YYYY hh:mm A")
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