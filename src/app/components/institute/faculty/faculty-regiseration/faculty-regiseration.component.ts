import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  form!: FormGroup;
  imageSelected!: string| ArrayBuffer;
  imageName:string = "";
  docSelected!: File;
  qual_Control= new FormControl('',Validators.required);
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
  selectedFile!: File ;

  constructor() { }

  ngOnInit(): void {
    this.isLoading=false;
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
      }),
      year_of_joining: new FormControl(null,{
        validators: [Validators.required]
      }),
      password: new FormControl(null,{
        validators: [Validators.required]
      })
    });
  }

  nameValidator(control: AbstractControl): {[key: string]:any} | null {
    var format = /[ `1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const forbid = format.test(control.value);
    return forbid ? { 'forbidden': {value: control.value}} : null;
  }
  dateValidator(control: AbstractControl): {[key: string]:any} | null{
    if(control.value){
      if(parseInt(Date().split(' ')[3])> (parseInt(control.value.toString().split(' ')[3]) + 15)){
        return null;
      }
    }
    return {'forbidden': {value: control.value}};
  }

  onImagePicked(event: any){
    const file = event.target.files[0];
    if(file){
      this.form.value.pic = file;
      if(file.size < 180000){
        this.imageName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSelected = reader.result as string;
        };
        if(event.target.files[0]){
          reader.readAsDataURL(event.target.files[0]);
        }
      }
    }
  }


  OnRegistration():void {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    console.log(
      this.form.value
      );
  }
  OnFileSelection(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    // this.form.patchValue({selectedFile: file});
    // this.form.get("")
    // this.selectedFile = event.target.files[0];
  }
}
