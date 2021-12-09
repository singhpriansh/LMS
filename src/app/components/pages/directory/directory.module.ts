import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { DirectoryRoutingModule } from "./directory-routing.module";
import { DirectoryComponent } from "./directory.component";
import { FoldersComponent } from "./folders/folders.component";
import { RootDriveComponent } from "./root-drive/root-drive.component";
import { SharedComponent } from "./shared/shared.component";

@NgModule ({
  declarations: [
    FoldersComponent,
    RootDriveComponent,
    SharedComponent,
    DirectoryComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    DirectoryRoutingModule,
    RouterModule
  ]
})

export class DirectoryModule {}