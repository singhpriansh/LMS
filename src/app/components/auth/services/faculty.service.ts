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
    password: String){
      const img = new FormData();
      img.append("file",pic,picname);
      this.http.post<any>(BACK_URL + "file",img)
        .subscribe(pic_name => {
          const file = new FormData();
          file.append("file",qual_cert,certname);
          this.http.post<any>(BACK_URL + "file",file)
            .subscribe(cert_name => {
              const authdata: FacultyAuthData = {
                name: name,
                pic: pic,
                picname: pic_name.result,
                id: id,
                dobirth: dob,
                gender: gender,
                qualdegree: qualdegree,
                qualcert: qual_cert,
                certname: cert_name.result,
                dojoin: doj,
                password: password,
              };
              this.http.post<any>(BACK_URL + "faculty/reg", authdata)
                .subscribe(response => {
                  console.log(response);
                  this.loginService.loginUser(id,password);
                }, error => {
                  this.loginService.getAuthStatusListerner().next(false);
                  // this.authStatusListener.next(false);
                }
              );
            },error => {
              this.loginService.getAuthStatusListerner().next(false);
              // this.authStatusListener.next(false);
            });
        },error => {
          this.loginService.getAuthStatusListerner().next(false);
          // this.authStatusListener.next(false);
        });
  }
}