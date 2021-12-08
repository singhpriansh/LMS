import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FacultyAuthData } from "../../models/FacultyAuthData.model";
import { LoginService } from "./login.service";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class FacultyService {
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) {}

    createFacultyUser(
    name: string,
    pic: File,
    picname: string,
    id: number,
    dob: Date,
    gender: string,
    qualdegree: string,
    qual_cert: File,
    certname: string,
    doj: Date,
    password: string){
      const authdata = new FormData();
      authdata.append("name",name);
      authdata.append("file",pic,picname);
      authdata.append("id",id.toString());
      authdata.append("dobirth",dob.toString());
      authdata.append("gender",gender);
      authdata.append("qualdegree",qualdegree);
      authdata.append("file",qual_cert,certname);
      authdata.append("dojoin",doj.toString());
      authdata.append("password",password);
      this.http.post<FacultyAuthData>(BACK_URL + "faculty/reg", authdata)
        .subscribe(response => {
          console.log(response);
          this.loginService.loginUser(id,password);
        }, error => {
          this.loginService.getAuthStatusListerner().next(false);
          // this.authStatusListener.next(false);
        }
      );
  }
}