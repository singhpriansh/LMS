import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthData } from "../../models/AuthData.model";

const BACK_URL =environment.apiUrls + "faculty/";

@Injectable({providedIn: 'root'})
export class LoginService {
  private isAuthenticated = false;
  private token: string='';
  private userId: string='';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  IsAuth(){
    return this.isAuthenticated;
  }

  getUserID(){
    return this.userId;
  }

  getAuthStatusListerner() {
    return this.authStatusListener;
  }

  loginUser(id: Number, password: String) {
    const authdata: AuthData = {
      id: id,
      password: password
    };
    this.http.post<{token: string, userId: string}>(BACK_URL + "login",authdata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token !=''){
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.saveAuthData(token, this.userId);
          this.router.navigate(['/faculty']);
        }
      }, error => {
        this.authStatusListener.next(false);
      })
  }

  logOutUser() {
    this.token = '';
    this.userId = '';
    this.isAuthenticated = false;
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