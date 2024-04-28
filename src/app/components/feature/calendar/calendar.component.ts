import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RenameComponent } from '../../pages/directory/menu/rename/rename.component';

const DAY_MAP = new Map();
DAY_MAP.set("Sun","Sunday");
DAY_MAP.set("Mon","Monday");
DAY_MAP.set("Tue","Tuesday");
DAY_MAP.set("Wed","Wednusday");
DAY_MAP.set("Thu","Thursday");
DAY_MAP.set("Fri","Friday");
DAY_MAP.set("Sat","Saturday");


const MONTH_MAP = new Map();
MONTH_MAP.set("Jan","January");
MONTH_MAP.set("Feb","Febuary");
MONTH_MAP.set("Mar","March");
MONTH_MAP.set("Apr","April");
MONTH_MAP.set("May","May");
MONTH_MAP.set("Jun","June");
MONTH_MAP.set("Jul","July");
MONTH_MAP.set("Aug","August");
MONTH_MAP.set("Sep","September");
MONTH_MAP.set("Oct","October");
MONTH_MAP.set("Nov","November");
MONTH_MAP.set("Dec","December");


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  focusmonth = 'other-month';
  dt = new Date();
  date = new Date(this.dt.getFullYear(), this.dt.getMonth(), this.dt.getDate());
  day: string='';
  month: string='';
  datenum: string='';
  year: string='';
  salutation: string='';
  vardate:Date = new Date();
  calendar: string[][] = [];
  flip: Boolean = false;
  eventdate: string='';
  eventform!: FormGroup;
  MONTH_MAP = MONTH_MAP;
  // yesterday = new Date(this.date);
  // tommorow = new Date(this.date);
  
  constructor(public dialogRef: MatDialogRef<RenameComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { type:string, name:string } ){
      ){
    this.setToday();
  }

  resetcalendar() {
    this.calendar = [];
    this.vardate = this.startOfMonth(this.date);
    for(let i=0;i<6;i++){
      let datearray: string[]= [];
      for(let j=0;j<7;j++){
        this.vardate.setDate(this.vardate.getDate() + 1);
        datearray.push(this.vardate.toDateString());
      }
      this.calendar.push(datearray);
    }
  }

  previousMonth(){
    this.date = new Date(this.date.getFullYear(),this.date.getMonth()-1,this.date.getDate());
    this.resetcalendar();
  }

  nextMonth(){
    this.date = new Date(this.date.getFullYear(),this.date.getMonth()+1,this.date.getDate());
    this.resetcalendar();
  }

  startOfMonth(date: Date) {
    let vardate = new Date(date.getFullYear(), date.getMonth(), 1);
    let day = this.datetoStringArr(vardate)[0];
    while(day != "Sun"){
      vardate = this.previousDate(vardate);
      day = this.datetoStringArr(vardate)[0];
    }
    vardate = this.previousDate(vardate);
    day = this.datetoStringArr(vardate)[0];
    return vardate;
  }

  close(){
    this.dialogRef.close({ event: 'close' });
  }

  detectclass(date: string) {
    if(date.split(" ")[2] === '01') {
      if(this.focusmonth === 'other-month'){
        this.focusmonth = 'current-month';
      }else{
        this.focusmonth = 'other-month';
      }
    }
    let finalstring = this.focusmonth;
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if(date === today.toDateString()){
      let reval = 'active';
      finalstring += " " + reval;
    }
    today = new Date(today.getFullYear(), today.getMonth(), 16);
    if(date === today.toDateString()){
      let reval = 'event';
      finalstring += " " + reval;
    }
    return finalstring;
  }

  nextDate(date: Date) {
    let newdate = new Date();
    newdate.setDate(date.getDate() + 1);
    return newdate;
  }
  
  previousDate(date: Date) {
    date.setDate(date.getDate() - 1);
    return date;
  }

  datetoStringArr(date: Date) {
    return date.toDateString().split(' ');
  }

  setToday() {
    // this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 1);
    let datearray = this.datetoStringArr(this.date);
    this.day = DAY_MAP.get(datearray[0]);
    this.month = MONTH_MAP.get(datearray[1]);
    this.datenum = datearray[2];
    this.year = datearray[3];
    if(this.datenum == '1' || this.datenum == '21' || this.datenum == '31'){
      this.salutation = 'st';
    }else if(this.datenum == '2' || this.datenum == '22'){
      this.salutation = 'nd';
    }else if(this.datenum == '3' || this.datenum == '23'){
      this.salutation = 'rd';
    }else{
      this.salutation = 'th';
    }
  }


  setevent(date: string) {
    this.eventform.reset();
    this.eventdate = date;
    this.eventform.value.date = date;
    this.flip = !this.flip;
  }

  submit(): void {
    if(this.eventform.invalid){
      return;
    }
    console.log(this.eventform.value);
    this.flip = !this.flip;
  }

  reject(){
    this.flip = !this.flip;
  }

  print(d:any){
    console.log(d);
  }

  ngOnInit(): void {
    // this.yesterday.setDate(this.yesterday.getDate()-1)
    // this.tommorow.setDate(this.tommorow.getDate()+1)
    // console.log(this.yesterday.toDateString());
    // console.log(this.tommorow.toTimeString());
    this.eventform = new FormGroup({
      eventname: new FormControl(null,{
        validators: [Validators.required]
      }),
      date: new FormControl(null,{
        validators: [Validators.required]
      }),
      time: new FormControl(null,{
        validators: [Validators.required]
      }),
      detail: new FormControl(null,{
        validators: [Validators.required]
      }),
      observations: new FormControl(null,{
        validators: [Validators.required]
      })
    });
  }
}
