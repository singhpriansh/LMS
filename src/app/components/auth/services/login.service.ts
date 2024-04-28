import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthData } from "../../models/AuthData.model";
import { User } from "../../models/User.model";

const BACK_URL =environment.apiUrls;

@Injectable({providedIn: 'root'})
export class LoginService {
  private desk!: string;
  private userId: string='';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router) {}

  setdesk(str:string){
    this.desk = str;
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
        this.login(response);
      }, error => {
        this.authStatusListener.next(false);
      })
  }

  login(response:{token: string, user: any}): boolean{
    const token = response.token;
    if(token != ''){
      this.userId = response.user._id;
      this.saveAuthData(token, this.userId);
      if(response.user.user === "Student"){
        this.desk = '/student';
      } else {
        this.desk = '/faculty';
      }
      this.setdesk(this.desk);
      this.router.navigate([this.desk]);
      this.getAuthStatusListerner().next(true);
      return true;
    }
    return false;
  }

  logOutUser() {
    this.userId = '';
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  public saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getAuthData() {
    if(localStorage.getItem('token')=='') {
      return;
    }
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    }
  }
}