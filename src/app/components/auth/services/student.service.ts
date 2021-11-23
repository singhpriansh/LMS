import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { StudentAuthData } from "../../models/StudentAuthData.model";
import { LoginService } from "./login.service";

const BACK_URL = environment.apiUrls + "faculty/";

@Injectable({providedIn: 'root'})
export class StudentService {
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) {}

  createStudentUser(
    name: String,
    picture: String,
    id: number,
    dob: Date,
    gender: String,
    qualification: String,
    branch: String,
    doa: Date,
    password: String,
    imageBuffer: ArrayBuffer | String){
      const authdata: StudentAuthData = {
        name: name,
        pic: picture,
        id: id,
        dobirth: dob,
        gender: gender,
        qualdegree: qualification,
        branch: branch,
        doadmitn: doa,
        password: password,
        imageBuffer: imageBuffer
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