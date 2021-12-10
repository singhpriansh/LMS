import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IconService } from '../directory-icon.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit, OnDestroy {
  iconview!:string;
  iconsSubs!: Subscription;

  constructor(private icon: IconService) { }

  ngOnInit(): void {
    this.iconsSubs = this.icon.getIcons()
      .subscribe(icon => {
        this.iconview = icon;
      });
  }

  ngOnDestroy(): void {
    this.iconsSubs.unsubscribe();
  }
}
