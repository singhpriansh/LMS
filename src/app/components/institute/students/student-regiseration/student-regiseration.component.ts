import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StudentService } from 'src/app/components/auth/services/student.service';
import { mimeType } from '../../validators/mime-type.validator';

export interface Selection {
  value:string,
  viewValue: string
}

@Component({
  selector: 'app-student-regiseration',
  templateUrl: './student-regiseration.component.html',
  styleUrls: ['./student-regiseration.component.scss']
})
export class StudentRegiserationComponent implements OnInit {
  isLoading = false;
  hide1 = true;
  hide2 = true;
  form!: FormGroup;
  imageSelected!: string| ArrayBuffer;
  docSelected !: string| ArrayBuffer;
  study: Selection[] = [
    {value: 'Bachelors in Technology', viewValue: 'B.Tech'},
    {value: 'Masters in Technology', viewValue: 'M.Tech'},
    {value: 'Doctor of Philosophy', viewValue: 'Phd'}
  ];
  gender: Selection[] =  [
    {value: 'Male', viewValue: 'male'},
    {value: 'Female', viewValue: 'female'},
    {value: 'Other',viewValue: 'other'}
  ];
  branch: Selection[] = [
    {value: 'Computer Science and Engineering', viewValue: 'CSE'},
    {value: 'Electronics and Communication Engineering', viewValue: 'ECE'},
    {value: 'Electrical and Electronics Engineering', viewValue: 'EEE'},
    {value: 'Electrical Engineering', viewValue: 'EE'},
    {value: 'Mechanical Engineering', viewValue: 'Mech'},
  ];
  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null,{
        validators: [Validators.required,
        this.nameValidator]
      }),
      pic: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      id: new FormControl(null,{
        validators: [Validators.required]
      }),
      DOB: new FormControl(null,{
        validators: [Validators.required,
        this.dateValidator]
      }),
      gender: new FormControl(null, {
        validators: [Validators.required]
      }),
      qualification: new FormControl(null,{
        validators: [Validators.required]
      }),
      branch: new FormControl(null,{
        validators: [Validators.required]
      }),
      date_of_admission: new FormControl(null,{
        validators: [Validators.required]
      }),
      password: new FormControl(null,{
        validators: [Validators.required,
        Validators.minLength(6),
        this.passwordValidator]
      }),
      again_password: new FormControl(null,{
        validators: [Validators.required,
        this.sameString,
        this.passwordValidator]
      })
    });
  }


  nameValidator(control: AbstractControl): ValidationErrors | null {
    var format = /[`1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const forbid = format.test(control.value);
    return forbid ? { 'forbidden': {value: control.value}} : null;
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

  sameString(control: AbstractControl): ValidationErrors | null {
    var confirm = control.value;
    var pass = control.parent?.get('password')?.value;
    if(confirm !== pass) {
      return {'pasword not same': {value: pass}};
    } else {
      return null;
    }
  }

  dateValidator(control: AbstractControl): ValidationErrors | null{
    if(control.value){
      if(parseInt(Date().split(' ')[3])> (parseInt(control.value.toString().split(' ')[3]) + 15)){
        return null;
      }
    }
    return {'forbidden': {value: control.value}};
  }

  onImagePicked(event: any){
    const img = event.target.files[0];
    if(img && img.size < 180000){
      this.form.value.pic = img.name;
      this.form.reset(this.form.value);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSelected = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  OnRegistration():void {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    this.studentservice.createStudentUser(
      this.form.value.name,
      this.form.value.pic,
      this.form.value.id,
      this.form.value.DOB,
      this.form.value.gender,
      this.form.value.qualification,
      this.form.value.branch,
      this.form.value.date_of_admission,
      this.form.value.password,
      this.imageSelected,
    );
    this.form.reset();
  }


  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if(file && file.size < 360000){
  //     this.form.value.qual_cert = file.name;
  //     this.form.reset(this.form.value);
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.docSelected = reader.result as ArrayBuffer;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
}