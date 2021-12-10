import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IconService } from './directory-icon.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryComponent implements OnInit {
  view:string = "grid";
  path:string = "/ ";

  constructor(private icons: IconService) { }

  onviewClick() {
    (this.view=='list')?this.view='grid':this.view='list';
    this.icons.setIcon(this.view);
  }

  ngOnInit(): void {
  }

}
