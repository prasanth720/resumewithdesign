import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { DataService } from 'src/data.service';
import { DocumentCreator } from '../cv-generator';
import { OutputpdfComponent } from '../outputpdf/outputpdf.component';
interface lang {
  name: string,
  code: string
}
@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {
  languages: lang[];
  resumedetails: any = []
  resumelanguage: any = []
  resumeprofile: any = []
  resumetools:any=[]
  selectedlang: lang[];
  resumedata1:any=[]
  reactiveForm: FormGroup
  totaldata: {
    firstName: any; lastName: any;
    // eduation: this.reactiveForm.value.eduation,
    eduation: any; professional_summary: any[]; //this.reactiveForm.value.professional_summary,
    languages: any; webserves_appserves: any; development_tools: any; operating_system: any; database: any; service_oriented_archit: any; details: any;
  };
  constructor(public fb: FormBuilder, public dataService: DataService,public route:Router) {
    this.languages = [
      { name: 'Java', code: 'Java' },
      { name: 'C++', code: 'C++' },
      { name: '.Net', code: '.Net' },
      { name: 'Python', code: 'Python' },
      { name: 'Ruby', code: 'Riby' },
      { name: 'Spring Boot', code: 'Spring Boot' },
      { name: 'JDBC', code: 'JDBC' },
      { name: 'Javascript', code: 'Javascript' },
      { name: 'Jquery', code: 'Jquery' },
      { name: 'PHP', code: 'PHP' },
      { name: 'AWS', code: 'AWS' },
      { name: 'Struts2', code: 'Struts2' },
      { name: 'Nodejs', code: 'Nodejs' },
      { name: 'Spring Jdbc', code: 'Spring Jdbc' },
      { name: 'SAP FIORI AND SAPUI5 Team Lead Consultant', code: 'SAP FIORI AND SAPUI5 Team Lead Consultant' },
      { name: 'IIB', code: 'IIB' },
      { name: 'MQBroker', code: 'MQBroker' },
      { name: 'MuleESB', code: 'MuleESB' },
      { name: 'SQL Server', code: 'SQL Server' },
      { name: 'SONAR', code: 'SONAR' },
      { name: 'Html', code: 'Html' },
      { name: 'Css', code: 'Css' },
      { name: 'Bootstrap', code: 'Bootstrap' },
      { name: 'AngularJS', code: 'AngularJS' },
      { name: 'WordPress', code: 'WordPress' },
      { name: 'Micro services', code: 'Micro services' },
      { name: 'Pivotal cloud foundry', code: 'Pivotal cloud foundry' },
      { name: 'SQL', code: 'SQL' },
      { name: 'MVC', code: 'MVC' },
      { name: 'mulesoft', code: 'mulesoft' },
      { name: 'api connect', code: 'api connect' },
      { name: 'apigee', code: 'apigee' },
      { name: 'datapower', code: 'datapower' },
      { name: 'Angular', code: 'Angular' },
      { name: 'openWhisk serverless', code: 'openWhisk serverless' },
      { name: 'IBM WebSphere Application Server', code: 'IBM WebSphere Application Server' },
      { name: 'IBM Tivole Directory Server', code: 'IBM Tivole Directory Server' },
      { name: 'Tomcat Application Server', code: 'Tomcat Application Server' },
      { name: 'Apache WebServer', code: 'Apache WebServe' },
      { name: 'Akana', code: 'Akana' },
      { name: 'Mule', code: 'Mule' },
      { name: 'Jenkins', code: 'Jenkins' },
      { name: 'Ansible', code: 'Ansible' },
      { name: 'BitBucket', code: 'BitBucket' },
      { name: 'SAP BOBJ', code: 'SAP BOBJ' },
      { name: 'Akamai', code: 'Akamai' },
      { name: 'Nagios', code: 'Nagios' },
      { name: 'AppDynamics', code: 'AppDynamics' },
      { name: 'Jira', code: 'Jira' },
      { name: 'Confluence', code: 'Confluence' },
      { name: 'Nginx', code: 'Nginx' },
      { name: 'ActiveMQ', code: 'ActiveMQ' },
      { name: 'SAP Functional Consultant', code: 'SAP Functional Consultant' },
      { name: 'core java', code: 'core java' },
      { name: 'HTML5', code: 'HTML5' },
      { name: 'CSS3', code: 'CSS3' },
      { name: 'SCSS', code: 'SCSS' },
      { name: 'Typescript', code: 'Typescript' },
      { name: 'Pages Ui', code: 'Pages Ui' },
      { name: 'Angular material', code: 'Angular material' },
      { name: 'Iconic 4 & 5', code: 'Iconic 4 & 5' },
      { name: 'WTX', code: 'WTX' },
      { name: 'ITX', code: 'ITX' },
      { name: 'EDI', code: 'EDI' },
      { name: 'MongoDB', code: 'MongoDB' },
      { name: 'SAP BI/BW, SAP HANA', code: 'SAP BI/BW, SAP HANA' },
      { name: 'Data Bricks', code: 'Data Bricks' },
      { name: 'ASP.NET', code: 'ASP.NET' },
      { name: 'ADF', code: 'ADF' },
      { name: 'ADLS', code: 'ADLS' },
      { name: 'SSIS', code: 'SSIS' },
      { name: 'Power BI', code: 'Power BI' },
      { name: 'SSIS', code: 'SSIS' },
      { name: 'SSAS', code: 'SSAS' },
      { name: 'AAS', code: 'AAS' },
      { name: 'Data Warehouse', code: 'Data Warehouse' },
      { name: 'oracle', code: 'oracle' },
      { name: 'Datastage', code: 'Datastage' },
      { name: 'Talend', code: 'Talend' },
      { name: 'Snowflake', code: 'Snowflake' },
      { name: 'ElectronJs', code: 'ElectronJs' },
      { name: 'sockets.io', code: 'sockets.io' },
      { name: 'BIG DATA', code: 'BIG DATA' },
      { name: 'HADOOP', code: 'HADOOP' },
      { name: 'CLOUDERA', code: 'CLOUDERA' },
      { name: 'HORTONWORKS', code: 'HORTONWORKS' },
      { name: 'MAPR', code: 'MAPR' },
      { name: 'UBUNTU', code: 'UBUNTU' },
      { name: 'LINUX', code: 'LINUX' },
      { name: 'PYTHON', code: 'PYTHON' },
      { name: 'SAP Security', code: 'SAP Security' },
      { name: 'SAP GRC', code: 'SAP GRC' },
      { name: 'S/4 Hana Security', code: 'S/4 Hana Security' },
      { name: 'SAP Fiori Security', code: 'SAP Fiori Security' },
      { name: 'SAP Hana', code: 'SAP Hana' },
      { name: 'Database', code: 'Database' },
      { name: 'bigdata', code: 'bigdata' },
      { name: 'PL/SQL', code: 'PL/SQL' },
      { name: 'Teradata', code: 'Teradata' },
      { name: 'Netezza', code: 'Netezza' },
      { name: 'IBM Mainframe (COBOL, JCL, CICS, DB2, VMS)', code: 'IBM Mainframe (COBOL, JCL, CICS, DB2, VMS)' },
      { name: 'Azure', code: 'Azure' },
      { name: 'Cloud Database', code: 'Cloud Database' },
      { name: 'Xquery', code: 'Xquery' },
      { name: 'datawarehouse', code: 'datawarehouse' },
      { name: 'unix', code: 'unix' },
      { name: 'shell scripting', code: 'shell scripting' },
      { name: 'OBIEE', code: 'OBIEE' },
      { name: 'Microstrategy', code: 'Microstrategy' },
      { name: 'Business Intelligence', code: 'Business Intelligence' },
      { name: 'Hive', code: 'Hive' },
      { name: 'HDFS', code: 'HDFS' },
      { name: 'Map Reduce', code: 'Map Reduce' },
      { name: 'Sqoop', code: 'Sqoop' },
      { name: 'Ooozie', code: 'Ooozie' },
      { name: 'Autosys', code: 'Autosys' },
      { name: 'Subversion', code: 'Subversion' },
      { name: 'Data Mining', code: 'Data Mining' },
      { name: 'Data Sourcing', code: 'Data Sourcing' },
      { name: 'Data modeling', code: 'Data modeling' },
      { name: 'Data Scrapping', code: 'Data Scrapping' },
      { name: 'Data Anaysis', code: 'Data Anaysis' },
      { name: 'Data Analytics', code: 'Data Analytics' },
      { name: 'Data Profiling', code: 'Data Profiling' },
      { name: 'SQL Development', code: 'SQL Development' },
      { name: 'Data Architecture', code: 'Data Architecture' },
      { name: 'Master Data Management', code: 'Master Data Management' },
      { name: 'Tableau', code: 'Tableau' },
      { name: 'JSpotfire', code: 'JSpotfire' },
      { name: 'Informatica', code: 'Informatica' },
      { name: 'CCAR', code: 'CCAR' },
      { name: 'Credit Risk Technology', code: 'Credit Risk Technology' },
      { name: 'Quantitative Risk Technology', code: 'Quantitative Risk Technology' },
      { name: 'Retail Banking', code: 'Retail Banking' },
      { name: 'GCP', code: 'GCP' },
      { name: 'Webmethods', code: 'Webmethods' },
      { name: 'sap', code: 'sap' },
      { name: 'UiPath', code: 'UiPath' },
      { name: 'Intellibot', code: 'Intellibot' },
      { name: 'Web API', code: 'Web API' },
      { name: 'WAS', code: 'WAS' },
      { name: 'WESB', code: 'WESB' },
      { name: 'appconnect', code: 'appconnect' },
      { name: 'Qliksense', code: 'Qliksense' },
      { name: 'SSRS', code: 'SSRS' },
      { name: 'MFT', code: 'MFT' },
      { name: 'CoreJava', code: 'CoreJava' },
      { name: 'Blockchain', code: 'Blockchain' },
      { name: 'Hyperledger Fabric', code: 'Hyperledger Fabric' },
      { name: 'angular 8', code: 'angular 8' },
      { name: 'Docker', code: 'Docker' },
      { name: 'Reachjs', code: 'Reachjs' },
      { name: 'Redux', code: 'Redux' },
      { name: 'Ionic', code: 'Ionic' },
      { name: 'Scala', code: 'Scala' },
      { name: 'Apache Spark', code: 'Apache Spark' },
      { name: 'R language', code: 'R language' },
      { name: 'Git', code: 'Git' },
      { name: 'Project Management', code: 'Project Management' },
      { name: 'HR', code: 'HR' },
      { name: 'kubernetes', code: 'kubernetes' },
      { name: 'AzureDevOps', code: 'AzureDevOps' },
      { name: 'Maven', code: 'Maven' },
      { name: 'MEAN Stack', code: 'MEAN Stack' },
      { name: 'Marketing', code: 'Marketing' },
      { name: 'junit', code: 'junit' },
      { name: 'React js', code: 'React js' },
      { name: 'selenium', code: 'selenium' },
      { name: 'Jmeter', code: 'Jmeter' },
      { name: 'django', code: 'django' },
      
      

    ];
    this.reactiveForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-z A-Z]*$/)]],
      lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-z A-Z]*$/)]],
      education: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-z A-Z]*$/)]],
      professionalsummary: new FormArray([]),
      languages: ['', [Validators.required]],
      webserves_appserves: ['', [Validators.required, Validators.maxLength(30)]],
      development_tools: ['', [Validators.required, Validators.maxLength(30)]],
      opearting_system: ['', [Validators.required, Validators.maxLength(30)]],
      database: ['', [Validators.required, Validators.maxLength(30)]],
      service_oriented_archit: ['', [Validators.required, Validators.maxLength(30)]],
      details: this.fb.array([])
    })

    this.professionalsummary_add()
  }

  ngOnInit(): void {
    
    let resumedata = JSON.parse(localStorage.getItem("resume") || '[]');
    console.log(resumedata)
    this.resumedata1.push(resumedata)
    console.log(this.resumedata1)

    console.log(this.resumedetails)
    let today2 = new Date().toISOString().slice(0, 10)
    // this.details().get('to_date')?.patchValue(today2)
    this.newproject().get('to_date')?.patchValue(today2)
    
  }
  newproject(): FormGroup {
    return this.fb.group({
      from_date: ['', [Validators.required]],
      to_date: ['', [Validators.required]],
      project_name: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      responsiblity: this.fb.array([])

    })
  }
  newprofesstional(): FormGroup{
    return this.fb.group({
    ps:new FormControl('')
  })
}
  // professionalsummary1():FormArray
  // {
  //   return this.reactiveForm.get('professionalsummary') as FormArray;
  // }
  addproject1() {
    this.details().push(this.newproject())
  }
  removeproje(index: number) {
    this.details().removeAt(index)
  }


  newresponsibility(): FormGroup {
    return this.fb.group({
      responsibility: []
    })
  }

  respo(ind: number): FormArray {
    return this.details().at(ind).get('responsiblity') as FormArray
  }
  addrespo(ind: number) {
    this.respo(ind).push(this.newresponsibility())
  }

  removeresp(ind: number, skillin: number) {
    this.respo(ind).removeAt(skillin);
  }
  professionalsummary_add() {
    // let professtionalsummary = this.reactiveForm.get('professionalsummary') as FormArray;
    // professtionalsummary.push(this.newprofesstional())
    this.getAllPS().push(this.newprofesstional())
  }
  professionalsummary_del(i: any) {
    let professionalsummary = this.reactiveForm.get('professionalsummary') as FormArray;
    professionalsummary.removeAt(i)
  }

  details() {
    return this.reactiveForm.get('details') as FormArray
  }

  addproject() {
    let details = this.fb.group({
      from_date: ['', [Validators.required]],
      to_date: ['', [Validators.required]],
      project_name: ['', [Validators.required]],
      project_description: ['', [Validators.required]],
      responsiblity: new FormArray([])
    })
    this.details().push(details)
  }

  submit() {
    console.log(this.reactiveForm)
    let ps = []
    let prosum = []
    this.reactiveForm.get('professionalsummary')['controls'].forEach(ps => {
      prosum.push(ps?.controls?.ps.value)
    });
    
    this.reactiveForm.get('details')['controls'].forEach(element => {
      
      let res =[]
      element?.controls?.responsiblity?.controls.forEach(ele => {
        console.log(ele)
        res.push(ele?.controls?.responsibility?.value)
      });


      let det = {
        from_date: element.controls.from_date.value,
        project_description: element.controls.project_description.value,
        project_name: element.controls.project_name.value,
        to_date: element.controls.to_date.value ,
        responsibility: res
      }
      ps.push(det)
    });


    let res=[]
    // this.reactiveForm.get('details')['controls'].forEach(element =>
    // {
    //   for (var i = 0; i<= element.responsiblity; i++){
    //     console.log(i[element.responsiblity])
    //   }
    //   let ress = {
    //     responsiblity: element.controls.responsiblity
    //   }
    //   res.push(ress)
    //   })
    console.log(this.reactiveForm.get('details'))
    console.log(ps)
    console.log(res)
   
    




    this.totaldata = {
    
      firstName: this.reactiveForm.value.firstName,
      lastName: this.reactiveForm.value.lastName,
      // eduation: this.reactiveForm.value.eduation,
      eduation: this.reactiveForm.controls.education.value,
      professional_summary: prosum, //this.reactiveForm.value.professional_summary,
      languages: this.reactiveForm.get('languages').value.length > 0 ? this.reactiveForm.get('languages').value.join() : this.reactiveForm.get('languages').value,
      webserves_appserves: this.reactiveForm.value.webserves_appserves,
      development_tools: this.reactiveForm.value.development_tools,
      operating_system: this.reactiveForm.value.opearting_system,
      database: this.reactiveForm.value.database,
      service_oriented_archit: this.reactiveForm.value.service_oriented_archit,
      details:this.reactiveForm.value.details
    }
    console.log(this.totaldata)
    this.reactiveForm.reset()

      this.download()
 
  }

  getAllPS() {
    return this.reactiveForm.get('professionalsummary') as FormArray;
  }

  public download(): void {

    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([this.totaldata]);
  localStorage.setItem("resume",JSON.stringify(this.totaldata)|| '[]')
    this.dataService.resumeInputData.next([this.totaldata])
    this.route.navigate(['output'])
    // const output = OutputpdfComponent.create()

    // Packer.toBlob(doc).then(blob => {
    //   console.log(blob);
    //   saveAs(blob, "example.docx");
    //   console.log("Document created successfully");
    // });
  } 
}


