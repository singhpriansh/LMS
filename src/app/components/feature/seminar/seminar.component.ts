import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.scss']
})
export class SeminarComponent implements OnInit {
  _num_:number[]=[];

  constructor() {
    for(let i=0;i<100;i++){
      this._num_.push(i);
    }
  }

  ngOnInit(): void {
  }

}
