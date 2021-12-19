import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { location } from "../../models/Storage.model";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor(private http: HttpClient){}

  browse(location:location){
    // const
    this.http.post<{response:any}>(BACK_URL + "storage",location)
      .subscribe(response => {
        console.log(response)
      });
  }
}
