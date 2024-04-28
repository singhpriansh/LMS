import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { DirectoryService } from "./directory.service";
import { DirectoryRoutingModule } from "./directory-routing.module";
import { DirectoryComponent } from "./directory.component";
import { FoldersComponent } from "./folders/folders.component";
import { MenuComponent } from "./menu/menu.component";

import { RenameComponent } from "./menu/rename/rename.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule ({
  declarations: [
    FoldersComponent,
    DirectoryComponent,
    MenuComponent,
    RenameComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    DirectoryRoutingModule,
    RouterModule,
  ],
  providers:[DirectoryService]
})

export class DirectoryModule {}