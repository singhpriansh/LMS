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
      const img = new FormData();
      img.append("file",pic,picname);
      this.http.post<any>(BACK_URL + "file",img)
        .subscribe(response => {
          const authdata: StudentAuthData = {
            name: name,
            picname: response.result,
            id: id,
            dobirth: dob,
            gender: gender,
            qualdegree: qualdegree,
            branch: branch,
            doadmitn: doa,
            password: password
          };
          this.http.post<any>(BACK_URL + "student/reg", authdata)
            .subscribe(response => {
              console.log(response);
              // this.loginService.loginUser(id,password);
            }, error => {
              this.loginService.getAuthStatusListerner().next(false);
              // this.authStatusListener.next(false);
            });
        }, error => {
          this.loginService.getAuthStatusListerner().next(false);
              // this.authStatusListener.next(false);
        }
      );
    }
}