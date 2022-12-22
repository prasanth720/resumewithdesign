import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CreateResumeComponent } from './create-resume/create-resume.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from "@angular/common/http";
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TemplateComponent } from './template/template.component';
import { HeadertemplateComponent } from './headertemplate/headertemplate.component';
import { FootertemplateComponent } from './footertemplate/footertemplate.component';
import { MainComponent } from './main/main.component';
import { OutputpdfComponent } from './outputpdf/outputpdf.component';
import { ResumeHeaderComponent } from './resume-header/resume-header.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CreateResumeComponent,
    TemplateComponent,
    HeadertemplateComponent,
    FootertemplateComponent,
    MainComponent,
    OutputpdfComponent,
    ResumeHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    SelectButtonModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
