import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthData } from "../../models/AuthData.model";
import { User } from "../../models/Usermodel";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class LoginService {
  private userisAuthenticated = false;
  private token: string='';
  private userId: string='';
  private desk: string='';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  IsAuth(){
    return this.userisAuthenticated;
  }

  getUserID(){
    return this.userId;
  }

  getdesk(){
    return this.desk;
  }

  getAuthStatusListerner() {
    return this.authStatusListener;
  }

  loginUser(id: Number, password: String) {
    const authdata: AuthData = {
      id: id,
      password: password
    };
    this.http.post<{token: string, user: User}>(BACK_URL + "login",authdata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token != ''){
          this.userisAuthenticated = true;//
          this.userId = response.user.id.toString();
          this.saveAuthData(token, this.userId);
          if(response.user.user === "Faculty"){
            this.desk = '/faculty';
          }else{
            this.desk = '/student';
          }
          this.authStatusListener.next(true);
          this.router.navigate([this.desk]);
        }
      }, error => {
        this.authStatusListener.next(false);
      })
  }

  logOutUser() {
    this.token = '';
    this.userId = '';
    this.userisAuthenticated = false;//
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/home'])
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    if(!this.token) {
      return;
    }
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    }
  }
}