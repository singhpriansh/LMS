import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { StudentAuthData } from "../../models/StudentAuthData.model";
import { LoginService } from "./login.service";

const BACK_URL =environment.apiUrls + "faculty/";

@Injectable({providedIn: 'root'})
export class FacultyService {
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) {}

  createStudentUser(
    name: String,
    picture: String,
    gender: String,
    dob: Date,
    qualification: String,
    branch: String,
    id: number,
    doa: Date,
    password: String,
    imageBuffer: ArrayBuffer | String){
      const authdata: StudentAuthData = {
        name: name,
        picture: picture,
        gender: gender,
        dob: dob,
        qualification: qualification,
        branch: branch,
        id: id,
        doa: doa,
        password: password,
        imageBuffer: imageBuffer
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