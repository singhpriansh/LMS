import { Component, OnInit } from '@angular/core';

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
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {
  weeks = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  focusmonth = 'other-month';
  date = new Date();
  day: string='';
  month: string='';
  datenum: string='';
  year: string='';
  salutation: string='';
  vardate:Date = new Date();
  // yesterday = new Date(this.date);
  // tommorow = new Date(this.date);
  
  constructor() {
    this.setToday();
    this.vardate = this.startOfMonth(this.date);
    console.log();
  }

  startOfMonth(date: Date) {
    let vardate = new Date(date.getFullYear(), date.getMonth(), 1);
    let day = this.datetoStringArr(vardate)[0];
    while(day != "Sun"){
      vardate = this.previosDate(vardate);
      day = this.datetoStringArr(vardate)[0];
    }
    vardate = this.previosDate(vardate);
    day = this.datetoStringArr(vardate)[0];
    return vardate;
  }

  nextCalendarDate() {
    this.vardate.setDate(this.vardate.getDate() + 1);
    if(this.datetoStringArr(this.vardate)[2] === '01') {
      if(this.focusmonth === 'other-month'){
        this.focusmonth = 'current-month';
      }else{
        this.focusmonth = 'other-month';
      }
    }
    return this.focusmonth;
  }

  nextDate(date: Date) {
    let newdate = new Date();
    newdate.setDate(date.getDate() + 1);
    return newdate;
  }
  
  previosDate(date: Date) {
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

  datectclass(date: Date) {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if(date.getDate() === today.getDate()){
      let reval = 'active';
      return reval;
    }
    today = new Date(today.getFullYear(), today.getMonth(), 16);
    if(date.getDate() === today.getDate()){
      let reval = 'event';
      return reval;
    }
    return null;
  }

  ngOnInit(): void {
  }

}
