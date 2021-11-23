import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/components/auth/services/faculty.service';
import { mimeType } from '../../validators/mime-type.validator';

export interface Selection {
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
  hide1 = true;
  hide2 = true;
  form!: FormGroup;
  imageSelected!: string| ArrayBuffer;
  docSelected !: string| ArrayBuffer;
  study: Selection[] = [
    {value: 'Bachelors in Science', viewValue: 'B.Sc'},
    {value: 'Bachelors in Technology', viewValue: 'B.Tech'},
    {value: 'Masters in Science', viewValue: 'M.Sc'},
    {value: 'Masters in Technology', viewValue: 'M.Tech'},
    {value: 'Masters of Bussiness Administration', viewValue: 'MBA'},
    {value: 'Doctor of Philosophy', viewValue: 'Phd'}
  ];
  gender: Selection[] =  [
    {value: 'Male', viewValue: 'male'},
    {value: 'Female', viewValue: 'female'},
    {value: 'Other',viewValue: 'other'}
  ];

  constructor(private facultyservice: FacultyService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null,{
        validators: [Validators.required,
          this.nameValidator]
      }),
      pic: new FormControl(null,{
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
      gender: new FormControl(null,{
        validators: [Validators.required]
      }),
      qualification: new FormControl(null,{
        validators: [Validators.required]
      }),
      qual_cert: new FormControl(null,{
        validators: [Validators.required]
        // asyncValidators: [this.pdfValidator]
      }),
      date_of_joining: new FormControl(null,{
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

  // pdfValidator(control: AbstractControl): Promise <ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const variable = "%PDF";
  //   if(control.value.indexOf(variable) > -1){
  //     return of(control.value);
  //   }
  //   return of({'invalid' : {value: control.setValue(0)}});
  // }

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if(file && file.size < 360000){
      this.form.value.qual_cert = file.name;
      this.form.reset(this.form.value);
      const reader = new FileReader();
      reader.onload = () => {
        this.docSelected = reader.result as ArrayBuffer;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  OnRegistration():void {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    this.facultyservice.createFacultyUser(
      this.form.value.name,
      this.form.value.pic,
      this.form.value.id,
      this.form.value.DOB,
      this.form.value.gender,
      this.form.value.qualification,
      this.form.value.qual_cert,
      this.form.value.date_of_joining,
      this.form.value.password,
      this.imageSelected,
      this.docSelected
    );
    this.form.reset();
  }
}
