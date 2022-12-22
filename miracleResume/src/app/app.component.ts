import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Packer } from 'docx';
// import { saveAs } from 'file-saver';
// import { experiences, education, skills, achievements } from './cv-data';
// import { DocumentCreator } from './cv-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miracleResume';
  testForm = new FormGroup({
    mobile : new FormArray(
      [
        new FormControl(),
        new FormControl()
      ]
    )
})
  add() {
    let mobile = this.testForm.get('mobile') as FormArray
    
    mobile.push(new FormControl(null,Validators.required))
  }
  delete(i:number) {
    let mobile = this.testForm.get('mobile') as FormArray;
    mobile.removeAt(i);
  }
  // download()
  // {

  //   const documentCreator = new DocumentCreator();
  //   const doc = documentCreator.create([experiences, education, skills, achievements]);


  //   Packer.toBlob(doc).then(blob => {
  //     console.log(blob);
  //     saveAs(blob, "example.docx");
  //     console.log("Document created successfully");
  //   });
  // }
  }

