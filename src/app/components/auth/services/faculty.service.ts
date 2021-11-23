import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FacultyAuthData } from "../../models/FacultyAuthData.model";
import { LoginService } from "./login.service";

const BACK_URL =environment.apiUrls + "faculty/";

@Injectable({providedIn: 'root'})
export class FacultyService {
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) {}

  createFacultyUser(
    name: String,
    picture: String,
    id: number,
    dob: Date,
    gender: String,
    qualification: String,
    qual_cert: String,
    doj: Date,
    password: String,
    imageBuffer: ArrayBuffer | String,
    docBuffer: ArrayBuffer | String ){
      const authdata: FacultyAuthData = {
        name: name,
        pic: picture,
        id: id,
        dobirth: dob,
        gender: gender,
        qualdegree: qualification,
        qualcert: qual_cert,
        dojoin: doj,
        password: password,
        imageBuffer: imageBuffer,
        docBuffer: docBuffer,
      };
      console.log(authdata);
      this.http.post<any>(BACK_URL + "reg", authdata)
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