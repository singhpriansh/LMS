import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss']
})
export class RenameComponent implements OnInit {
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<RenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type:string, name:string } ){
    }

  ngOnInit(): void {
    let name;
    if(this.data.type == "Rename"){
      name = this.data.name;
    }
    this.form = new FormGroup({
      name: new FormControl(name,{
        validators: [Validators.required,
        this.nameValidator]
      })
    })
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    var format = /[ `!@$%^&\-=\[\]{};':"\\|,\/?]/;
    const forbid = format.test(control.value);
    return forbid ? { 'forbidden': {value: control.value}} : null;
  }

  rename(){
    if(this.form.invalid){
      return;
    }
    this.dialogRef.close({ event: 'close', name: this.form.value.name });
  }

}
