import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirectoryComponent } from "./directory.component";
import { FoldersComponent } from "./folders/folders.component";
import { RootDriveComponent } from "./root-drive/root-drive.component";
import { SharedComponent } from "./shared/shared.component";

const routes: Routes = [
  {
    path: '',
    component: DirectoryComponent,
    children: [
      { path: '', redirectTo: 'drive', pathMatch:"full" },
      { path: 'drive', component: RootDriveComponent },
      { path: 'shared', component: SharedComponent },
      { path: 'trash', component: FoldersComponent },
      { path: 'folder', component: FoldersComponent }    
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class DirectoryRoutingModule {}