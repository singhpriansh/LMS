import { HttpClient, HttpHeaders } from "@angular/common/http";
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
}
