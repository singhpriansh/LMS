import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { StudentAuthData } from "../../models/StudentAuthData.model";
import { LoginService } from "./login.service";

const BACK_URL = environment.apiUrls;

@Injectable({providedIn: 'root'})
export class StudentService {
  constructor(private http: HttpClient,
    private loginService: LoginService,
    private router: Router) {}

  createStudentUser(
    name: string,
    pic: File,
    picname: string,
    id: number,
    dob: Date,
    gender: string,
    qualdegree: string,
    branch: string,
    doa: Date,
    password: string){
      const authdata = new FormData();
      authdata.append("name",name);
      authdata.append("file",pic,picname);
      authdata.append("id",id.toString());
      authdata.append("dobirth",dob.toString());
      authdata.append("gender",gender);
      authdata.append("qualdegree",qualdegree);
      authdata.append("branch",branch);
      authdata.append("doadmitn",doa.toString());
      authdata.append("password",password);
      this.http.post<StudentAuthData>(BACK_URL + "student/reg", authdata)
        .subscribe(response => {
          console.log(response);
          this.loginService.loginUser(id,password);
        }, error => {
          this.loginService.getAuthStatusListerner().next(false);
          // this.authStatusListener.next(false);
        });
    }
}