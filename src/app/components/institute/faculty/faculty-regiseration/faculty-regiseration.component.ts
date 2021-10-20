import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

export interface Qualification {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-faculty-regiseration',
  templateUrl: './faculty-regiseration.component.html',
  styleUrls: ['./faculty-regiseration.component.scss']
})


export class FacultyRegiserationComponent implements OnInit {
  isLoading = false;
  qual_Control= new FormControl('',Validators.required);
  study: Qualification[] = [
    {value: 'Bachelors in Science', viewValue: 'B.Sc'},
    {value: 'Bachelors in Technology', viewValue: 'B.Tech'},
    {value: 'Masters in Science', viewValue: 'M.Sc'},
    {value: 'Masters in Technology', viewValue: 'M.Tech'},
    {value: 'Masters of Bussiness Administration', viewValue: 'MBA'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  OnRegistration(registrationForm: NgForm):void {

  }
}
