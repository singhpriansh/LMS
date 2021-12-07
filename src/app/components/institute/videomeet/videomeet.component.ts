import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videomeet',
  templateUrl: './videomeet.component.html',
  styleUrls: ['./videomeet.component.scss']
})
export class VideomeetComponent implements OnInit {

  constructor() { }

  send() {
    console.log("text send");
  }

  ngOnInit(): void {
  }

}
