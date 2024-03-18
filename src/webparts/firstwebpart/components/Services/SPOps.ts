import { IDropdownOption } from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {Web} from "@pnp/sp-commonjs";
import "@pnp/sp/lists";
import "@pnp/sp/items";




export class SPOperation{
    public constructor(public siteURL:string){

    }
    public getListTitles(context:WebPartContext):Promise<IDropdownOption[]>{
        let web=Web(this.siteURL);
        // let listTitles:IDropdownOption[]=[];
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle("Training List").items.select('Title').get().
            then((result:any)=>{
                console.log(result);
                resolve(result);
            } ,(error:any)=>{
                reject("error occured")
            })
               
            
        })
        

    }
    public getLeaveType(context:WebPartContext):Promise<IDropdownOption[]>{
        let web=Web(this.siteURL);
        // let listTitles:IDropdownOption[]=[];
        return new Promise<any>(
            async(resolve,reject)=>{
            web.lists.getByTitle("leaveConfiguration").items.select('Title').get().
            then((result:any)=>{
                console.log(result);
                resolve(result);
            } ,(error:any)=>{
                reject("error occured")
            })
               
            
        })
        

    }

    public CreateListItem(context:WebPartContext,PostData:any):Promise<string>{
        let web=Web(this.siteURL);
       
        return new Promise<string>(async (resolve, reject)=>{
         web.lists.getByTitle('LeaveApply').items.add(PostData)
            .then((results:any)=>{
               
                console.log(results);
                resolve(results);
            });
        });
    }
    
}







