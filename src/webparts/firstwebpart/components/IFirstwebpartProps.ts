import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFirstwebpartProps {
  Context: WebPartContext,
  siteURL: string,
  ListName: string,
  LeaveTypeListName: string
 
}
