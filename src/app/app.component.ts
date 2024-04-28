import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './components/auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'LMS';
  isthere = '';
  links_given = ["/event","/notice","/seminar"];
  titles_given = [
    "Events & Activities",
    "Notice & Recomendation",
    "Seminal & Presentations"
  ]
  links = this.links_given;
  titles = this.titles_given;
  loginStatSub!: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginStatSub = this.loginService
      .getAuthStatusListerner()
      .subscribe(isAuthenticated => {
        if(isAuthenticated){
          this.links = [this.loginService.getdesk()].concat(this.links_given);
          this.titles = ["Desk"].concat(this.titles);
        }else{
          this.links = this.links_given;
          this.titles = this.titles_given;
        }
      })
  }

  ngOnDestroy(): void {
    this.loginStatSub.unsubscribe();
  }
}
