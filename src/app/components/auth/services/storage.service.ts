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
    const object = {
      location: location,
      item: item
    };
    return this.http.post (BACK_URL + "storage/download",object,{
      responseType : 'blob'
    })
  }

  copy(initloc:location,finloc:location,items:string[]){
    initloc = Object.assign(initloc);
    finloc = Object.assign(finloc);
    const object = {
      from:initloc,
      to: finloc,
      items: items
    }
    return this.http.post(BACK_URL + "storage/copy",object);
  }

  move(initloc:location,finloc:location,items:string[]){
    initloc = Object.assign(initloc);
    finloc = Object.assign(finloc);
    const object = {
      from:initloc,
      to: finloc,
      items: items
    }
    return this.http.post(BACK_URL + "storage/move",object);
  }

  rename(location:location,initial_name:string,final_name:string){
    const object = {
      loc:location.loc,
      path:location.path,
      initial_name:initial_name,
      final_name:final_name
    }
    return this.http.post(BACK_URL + "storage/rename",object);
  }

  new(location:location,name:string){
    const object = {
      loc:location.loc,
      path:location.path,
      name:name,
    }
    return this.http.post(BACK_URL + "storage/new",object);
  }

  delete(location:location,items:string[]){
    let object;
    if(location.loc == '/trash'){
      object = {
        from: location,
        to: {
          loc: 'delete',
        },
        items: items
      }
    }else{
      object = {
        from: location,
        to: {
          loc: '/trash',
          path:'/',
        },
        items:items
      }
    }
    return this.http.post(BACK_URL + "storage/move",object);
  }

  emptybin() {
    console.log("yup")
    const object = {
      from: {
        loc: '/trash',
        path:'/',
      },
      to: {
        loc: 'delete',
      }
    }
    return this.http.post(BACK_URL + "storage/move", object);
  }
}
