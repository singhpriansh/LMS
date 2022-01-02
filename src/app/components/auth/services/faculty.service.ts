import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FacultyAuthData } from "../../models/FacultyAuthData.model";
import { FacultyData } from "../../models/FacultyData.model";
import { LoginService } from "./login.service";
import { StorageService } from "./storage.service";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class FacultyService {

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private drive: StorageService) {}

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
      picname = picname.toLowerCase().split(' ').join('_');
      certname = certname.toLowerCase().split(' ').join('_');
      const authdata :FacultyAuthData ={
        name:name,
        picname:picname,
        id:id,
        dobirth:dob,
        gender:gender,
        qualdegree:qualdegree,
        certname: certname,
        dojoin:doj,
        password:password
      };
      this.http.post<{token:string, user:FacultyData, message: String}>
      (BACK_URL + "faculty/reg", authdata)
        .subscribe(response => {
          if(this.loginService.login(response)){
            const files = new FormData();
            picname = JSON.stringify({
              name: picname,
              path: undefined
            })
            files.append("file",pic,picname);
            certname = JSON.stringify({
              name: certname,
              path: undefined
            })
            files.append("file",qual_cert,certname);
            this.drive.upload(files).subscribe();
          }
        }, error => {
          this.loginService.getAuthStatusListerner().next(false);
          // this.authStatusListener.next(false);
        }
      );
    }
}