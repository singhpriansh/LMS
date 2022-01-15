import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { StudentAuthData } from "../../models/StudentAuthData.model";
import { StudentData } from "../../models/StudentData.model";
import { LoginService } from "./login.service";
import { StorageService } from "./storage.service";

const BACK_URL = environment.apiUrls;

@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private drive: StorageService) {}
  
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
      picname = picname.toLowerCase().split(' ').join('_');
      const authdata: StudentAuthData = {
        name:name,
        picname:picname,
        id:id,
        dobirth:dob,
        gender:gender,
        qualdegree:qualdegree,
        branch:branch,
        doadmitn:doa,
        password:password
      };
      this.http.post<{token:string, user:StudentData, message: String}>
      (BACK_URL + "student/reg", authdata)
        .subscribe(response => {
          if(this.loginService.login(response)){
            const files = new FormData();
            picname = JSON.stringify({
              name: picname,
              path: undefined
            })
            files.append("file",pic,picname);
            this.drive.upload(files).subscribe();
          }
        }, error => {
          this.loginService.getAuthStatusListerner().next(false);
          // this.authStatusListener.next(false);
        }
      );
    }

  getSyllabus(){
    return this.http.get<any>
    (BACK_URL + "syllabus/student")
  }

  getCompletedSyllabus(){
    return this.http.get<any>
    (BACK_URL + "syllabus/studentsyll")
  }
}