import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor(private http: HttpClient){}

  browse(path:string){
    // const
    this.http.post<{response:any}>(BACK_URL + "storage",path)
      .subscribe(response => {
        console.log(response)
      });
  }
}
