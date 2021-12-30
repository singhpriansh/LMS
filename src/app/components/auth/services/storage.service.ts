import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { content, location } from "../../models/Storage.model";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor(private http: HttpClient){}

  upload(data: FormData){
    return this.http.put<{ message:String }>
    (BACK_URL + "storage/upload",data)
  }

  browse(location: location){
    return this.http.post<{ message:String, content:content }>
    (BACK_URL + "storage/",location)
  }

  download(location:location,item:string){
    location = Object.assign(location,{item:item});
    
    return this.http.post (BACK_URL + "storage/download",location,{
      responseType : 'blob'
    })
  }

  move(initloc:location,finloc:location,item:string){
    initloc = Object.assign(initloc,{ item:item });
    finloc = Object.assign(finloc,{ item:item });
    const object = {
      from:initloc,
      to: finloc
    }
    return this.http.post(BACK_URL + "storage/move",object);
  }

  delete(location:location,item:string){
    let object;
    if(location.loc == '/trash'){
      location = Object.assign(location,{item:item});
      object = {
        from: location,
        to: {
          loc: 'delete',
        }
      }
    }else{
      location = Object.assign(location,{item:item});
      object = {
        from: location,
        to: {
          loc: '/trash',
          path:'/',
          item:item
        }
      }
    }
    return this.http.post(BACK_URL + "storage/move",object);
  }
}
