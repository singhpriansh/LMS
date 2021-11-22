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
    gender: String,
    dob: Date,
    qualification: String,
    qual_cert: String,
    id: number,
    doj: Date,
    password: String,
    imageBuffer: ArrayBuffer | String,
    docBuffer: ArrayBuffer | String ){
      const authdata: FacultyAuthData = {
        name: name,
        picture: picture,
        gender: gender,
        dob: dob,
        qualification: qualification,
        qual_cert: qual_cert,
        id: id,
        doj: doj,
        password: password,
        imageBuffer:  imageBuffer,
        docBuffer: docBuffer,
      };
      this.http.post<any>(BACK_URL + "auth", authdata)
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