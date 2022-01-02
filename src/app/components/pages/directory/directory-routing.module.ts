import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirectoryComponent } from "./directory.component";
import { FoldersComponent } from "./folders/folders.component";

const routes: Routes = [
  {
    path: '',
    component: DirectoryComponent,
    children: [
      { path: '', redirectTo: 'drive', pathMatch:"full" },
      { path: 'drive', component: FoldersComponent },
      { path: 'shared', component: FoldersComponent },
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