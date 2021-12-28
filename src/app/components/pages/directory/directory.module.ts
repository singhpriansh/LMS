import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { DirectoryService } from "./directory.service";
import { DirectoryRoutingModule } from "./directory-routing.module";
import { DirectoryComponent } from "./directory.component";
import { FoldersComponent } from "./folders/folders.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule ({
  declarations: [
    FoldersComponent,
    DirectoryComponent,
    MenuComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    DirectoryRoutingModule,
    RouterModule
  ],
  providers:[DirectoryService]
})

export class DirectoryModule {}