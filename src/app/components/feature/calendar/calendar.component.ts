import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as $ from "jquery";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  app = {
    settings: {
      container: $('.calendar'),
      calendar: $('.front'),
      days: $('.weeks span'),
      form: $('.back'),
      input: $('.back input'),
      buttons: $('.back button')
    },
    swap: function(currentSide: JQuery, desiredSide:JQuery) {
      this.settings.container.toggleClass('flip');
      currentSide.fadeOut(900);
      currentSide.hide();
      desiredSide.show();
    },
  }
  
  daysonclick(){
    this.app.swap(this.app.settings.calendar, this.app.settings.form);
    this.app.settings.input.focus();
  }

  constructor() {}

  ngOnInit(): void {
    // this.yesterday.setDate(this.yesterday.getDate()-1)
    // this.tommorow.setDate(this.tommorow.getDate()+1)
    // console.log(this.yesterday.toDateString());
    // console.log(this.tommorow.toTimeString());
  }

}
