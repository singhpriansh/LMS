import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  hide = true;
  form!:FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null,{
        validators: [Validators.required]
      }),
      password: new FormControl(null,{
        validators: [Validators.required,
          this.passwordValidator]
      })
    })
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    var str = control.value;
    if (str){
      if (str.match(/[a-z]/g)
      && str.match( /[A-Z]/g)
      && str.match(/[0-9]/g)
      && str.match(/[^a-zA-Z\d]/g)
      && str.length >= 6){
        return null;
      }else{
        return {'invalid': {value: str}};
      }
    }else{
      return {'invalid': {value: str}};
    }
  }

  OnLogin(): void {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    this.loginService.loginUser(
      this.form.value.id,
      this.form.value.password
    )
    this.form.reset();
  }
}
