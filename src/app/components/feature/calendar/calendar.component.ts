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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  date = new Date();
  day: string;
  month: string;
  datenum: string;
  year: string;
  salutation: string='';
  // yesterday = new Date(this.date);
  // tommorow = new Date(this.date);
  datearray = this.date.toDateString().split(' ');

  constructor() {
    this.day = DAY_MAP.get(this.datearray[0]);
    this.month = MONTH_MAP.get(this.datearray[1]);
    this.datenum = this.datearray[2];
    this.year = this.datearray[3];
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
  
  ngOnInit(): void {
    // this.yesterday.setDate(this.yesterday.getDate()-1)
    // this.tommorow.setDate(this.tommorow.getDate()+1)
    console.log(
      this.day,
      this.month,
      this.datenum,
      this.year
    );
    // console.log(this.yesterday.toDateString());
    // console.log(this.tommorow.toTimeString());
  }

}
