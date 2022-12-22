import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateResumeComponent } from './create-resume/create-resume.component';
import { MainComponent } from './main/main.component';
import { OutputpdfComponent } from './outputpdf/outputpdf.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: "main", component: MainComponent, children: [
      { path: 'createresume', component: CreateResumeComponent },
    ]
  },
  { path: '', redirectTo: 'main/createresume', pathMatch: 'full' },
  { path: "template", component: TemplateComponent },
  { path: 'output', component: OutputpdfComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
