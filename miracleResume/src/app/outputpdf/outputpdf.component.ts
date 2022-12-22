import { Component, OnInit } from "@angular/core";
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { HttpClient } from "@angular/common/http";
import { logo } from './../../assets/logo.js';
// importing the fonts and icons needed
import pdfFonts from "./../../assets/vfs_fonts.js";
import { fonts } from "./../config/pdfFonts";
import { styles, defaultStyle } from "./../config/customStyles";
import { DataService } from 'src/data.service'

// import the pdfmake library
import pdfMake from "pdfmake/build/pdfmake";
import { title } from "process";

// PDFMAKE fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;

@Component({
  selector: 'app-outputpdf',
  templateUrl: './outputpdf.component.html',
  styleUrls: ['./outputpdf.component.css']
})
export class OutputpdfComponent implements OnInit {



  pdfSrc; // this sample, dynamic one we will generate with the pdfmake
  pageVariable = 1;

  // Initialize variables required for the header and this component
  fileName = "test-document.pdf";
  // set zoom variables
  zoom = 0.98; // default initial zoom value
  zoomMax = 2; // max zoom value
  zoomMin = 0.5; // min zoom value
  zoomAmt = 0.2; // stepping zoom values on button click
  zoomScale = "page-width"; // zoom scale based on the page-width
  totalPages = 0; // indicates the total number of pages in the pdf document
  pdf: PDFDocumentProxy; // to access pdf information from the pdf viewer
  documentDefinition: object;
  generatedPDF: any;
  pdfData;
  data: any = [];
  SamplePDFObject: any;
  dataresume: any=[];
res:any=[]
  constructor(private httpClient: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    this.dataresume = JSON.parse(localStorage.getItem("resume") || '[]')
    console.log(this.dataresume)
    let resp = []
  
    this.dataresume?.details.forEach((project:any) => {
      project.responsiblity.forEach((ele: any) => {
        resp.push(ele.responsibility)
      })
    })
    this.res=resp

    console.log('list of res',resp)
    this.getData();
    console.log("dattttttttttttttttttttttttttttttttttttttttaaaaaaa")
    this.dataService.resumeInputData.subscribe((res: any) => {
      console.log('data',res)
      this.data=res
      console.log(this.data)
    })
    // this.SamplePDFObject = {
    //   // name: this.data[0].firstName,
    //   lastName1: "Sunkurabothu"
    // }
  }

  // zoom functionality for the pdf viewer
  setZoom(type: string): void {
    console.log(type);
    if (type === "increment") {
      this.zoom += this.zoomAmt;
    } else if (type === "decrement") {
      this.zoom -= this.zoomAmt;
    }
  }

  // pdfSrc value we are taking from the pdfmake generate function in buffer type so currently this willnot work
  // after the pdf is generated it will work
  // Download functionality of the pdf
  download(): void {
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(blob);
    //   return;
    // }

    const data = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // creating an anchor tag
    link.href = data; // setting href value to anchor
    link.download = this.fileName; // giving the download attr to the anchor with the filename that we are giving
    link.click(); // fake click using the js to download it.

    // For firefox it is necessary to delay revoking the ObjectURl
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }

  // pdfSrc value we are taking from the pdfmake generate function in buffer type so currently this willnot work
  // after the pdf is generated it will work
  // Print functionlaity of the pdf
  print(): void {
    // Remove previously added iframes
    const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]');
    if (prevFrames.length) {
      prevFrames.forEach((item) => item.remove());
    }
    // just like download , we are using the blob
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });
    const objectURl = URL.createObjectURL(blob);

    // create iframe element in dom
    const frame = document.createElement("iframe");
    frame.style.display = "none"; // hiding the iframe
    frame.src = objectURl; // setting the source for that iframe
    // appending this iframe to body
    document.body.appendChild(frame);
    frame.name = "pdf-frame";
    frame.focus();

    // in edge or IE we are using different methods to print
    // if (this.isIE() || this.isEdge()) {
    //   frame.contentWindow.document.execCommand("print", false, null);
    // } else {
    //   // all other browsers will use this method
    //   frame.contentWindow.print();
    // }
  }

  // to know the browser is IE or not
  isIE(): boolean {
    return navigator.userAgent.lastIndexOf("MSIE") !== -1;
  }

  // to know the browser is Edge or not
  // isEdge(): boolean {
  //   return !this.isIE() && !!window.StyleMedia;
  // }

  // after load complete of the pdf function
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
    this.totalPages = pdf.numPages;
  }

  generatePDF(): void {
    const thisRef = this;
    // All the contents required goes here
    this.documentDefinition = {
      info: {
        title: this.pdfData.title,
        author: this.pdfData.author,
        subject: this.pdfData.subject,
        keywords: this.pdfData.keywords,
        creator: this.pdfData.creator,
        creationDate: new Date(),
      },
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [40, 60, 40, 60], // left, top, right, bottom margin values
      header(currentpage: number, pageCount: number, pageSize: any): any {
        return [
          {
            columns: [
              {
                image: logo.headerLogo,
                fit: [700, 80],
                width: "10%",
                margin: [0, -20, 0, 0],

              },
              {
                text: "sdfsdfsdfsd",
                style: "headertitle",
                alignment: "right",
                margin: [40, 30]
              }
            ],
          }
        ]
      },

      //entire body conetnt code
      content: [//first page data
        //left side column educational details
        
        {
          
          margin: [0, 14],

          columns: [
            {
              width: "30%",
              text:" Education__________", bold: true,
              style: "educationstyle",
            

            },

            //right side column professional summary bullet points in array form
            [
              {
                columns: [
                  {
                    image: 'data:image/jpeg;base64,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',
                    fit: [700, 20],
                    width: "100%",
                    margin: [0, 0, 0, 0],

                  }
                ]
              },
              '\n',
              {

                // style:'professtionalsummary',
                ul: [...this.dataresume.professional_summary,
                  
                ],
                pageBreak: 'after'
              }
            ],

          ]
        },
        //second page details
        {
          columns: [
            [
              // techinical skills image with width 100%
              {

                columns: [
                  {
                    image: 'data:image/jpeg;base64,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f/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6PtniL/AKBmn/8Aga//AMbrdooAwvtniL/oGaf/AOBr/wDxuj7Z4i/6Bmn/APga/wD8brdooAwvtniL/oGaf/4Gv/8AG6t6bcarLOwvrO1t4duQ0Nw0hLZHGCg4xnvWlRQAUUUUAFFFFABRRRQB/9k=',
                    fit: [700, 80],
                    width: "100%",
                    margin: [-40, -19, 0, 0],

                  }
                ]
              },
              //Web Servers and App servers details
              {
                // margin: [0, 20],

                columns: [
                  {
                    width: "40%",
                    text: 'Web Servers and App servers', bold: true,
                    style: "educationstyle",
                    margin: [30, 10, 0, 0]

                  },
                  {
                    columns: [
                      {
                        text: `:${this.dataresume.webserves_appserves}`,
                        width: "auto",
                        margin: [0, 10, 0, 0],

                      }
                    ]
                  },

                ],
              },
              //Languages details
              {
                margin: [0, 0],

                columns: [
                  {
                    width: "40%",
                    text: 'Languages', bold: true,
                    style: "educationstyle",
                    margin: [30, 0, 0, 0]

                  },


                  [
                    {
                      columns: [
                        {
                          text: `:${this.dataresume.languages}`,
                          width: "auto",
                          margin: [0, 0, 0, 0],

                        }
                      ]
                    },

                  ],

                ]
              },
              // Web Tools/Frameworks details
              // {
              //   margin: [0, 0],

              //   // columns: [
              //   //   {
              //   //     width: "40%",
              //   //     text: 'Web Tools/Frameworks ', bold: true,
              //   //     style: "educationstyle",
              //   //     margin: [30, 0, 0, 0]

              //   //   },


              //   //   [
              //   //     {
              //   //       columns: [
              //   //         {
              //   //           // text: `${this.dataresume.}`,
              //   //           width: "auto",
              //   //           margin: [0, 0, 0, 0],

              //   //         }
              //   //       ]
              //   //     },

              //   //   ],

              //   // ]
              // },
              //Development Tools details
              {
                margin: [0, 0],

                columns: [
                  {
                    width: "40%",
                    text: 'Development Tools', bold: true,
                    style: "educationstyle",
                    margin: [30, 0, 0, 0]

                  },


                  [
                    {
                      columns: [
                        {
                          text: `:${this.dataresume.development_tools}`,
                          width: "auto",
                          margin: [0, 0, 0, 0],

                        }
                      ]
                    },

                  ],

                ]
              },
              // Operating Systems Tools details
              {
                margin: [0, 0],

                columns: [
                  {
                    width: "40%",
                    text: 'Operating Systems', bold: true,
                    style: "educationstyle",
                    margin: [30, 0, 0, 0]

                  },


                  [
                    {
                      columns: [
                        {
                          text: `:${this.dataresume.operating_system}`,
                          width: "auto",
                          margin: [0, 0, 0, 0],

                        }
                      ]
                    },

                  ],

                ]
              },
              //Databases details
              {
                margin: [0, 0],

                columns: [
                  {
                    width: "40%",
                    text: 'Databases', bold: true,
                    style: "educationstyle",
                    margin: [30, 0, 0, 0]

                  },


                  [
                    {
                      columns: [
                        {
                          text: `:${this.dataresume.database}`,
                          width: "auto",
                          margin: [0, 0, 0, 0],

                        }
                      ]
                    },

                  ],

                ]
              },
              //Service Oriented architecture details
              {
                // margin: [0, 0],

                columns: [
                  {
                    width: "40%",
                    text: 'Service Oriented architecture', bold: true,
                    style: "educationstyle",
                    margin: [30, 0, 0, 10]

                  },


                  [
                    {
                      columns: [
                        {
                          text: `:${this.dataresume.service_oriented_archit}`,
                          width: "auto",
                          margin: [0, 0, 0, 0],

                        }
                      ]
                    },

                  ],

                ]
              },
            ],
          ],

        },
        {
          columns: [
            [
              {
                columns: [
                  {
                    image: 'data:image/jpeg;base64,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MZHZ45rJIj++UL8qmSIDKljg5x2qTxJ8GfjN8fPgP4i+HnxCg8K+Gtthaw6Ze6XczTtcXcEkbiWUYwkTCPbgZYbycHAFAHo3w1/aaHjH4g2HgvxH4J1rwHrmq6YdY0lNUlgmjvbcEbgGidtkgB3GNhkAHOOAfbq+Vv2bf2f9V8CeN7HVdX+EPgXwZLYWckLa1oupTXN3PMVCExoUCojAvnJJ5Ar6ppDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK+aPj38H9f8P8AiaT4i+AZJ4dQwXv7a1+/nAzIi/xAgfMvrzzk4+l6K9HAY6pl9b2tNXT0aezXZni5tlNDOMP7Cs2mneMlo4yWzTPz2P7S3xHBwfEUoP8A1yT/AOJo/wCGlviN/wBDHL/36T/Cvszxp8C/BHj64kutV0OE3znLXdszQysfVipG4/7wNcdb/se/D2G4MjxalOmf9VJd4X6fKoP619/Sz7I5QvUw1n25Yv8AH/hj8fxHCXFUKnLRxzlHvzzX3rX8Gz5pt/jT8UPHcg0Kz1e+v57790Le1jUOwPXkDgep6AV9W/s+/BVPhH4bla8ZJ9f1AK93IvKxgZ2xKfQZOT3PsBXbeEfh/wCHPAdq0GgaRbaYj8O0S5kfHTc5yzfia6Gvms0zqGKg8Pg6Sp03vZJOXa9j7jIOF6mX1VjcyrutXSsrttRvva+t3309Aooor5Q/QgooooAKKKKACiiigAooooAKKKKACiiigAooooAqXmlWWozW0t3Z291Lav5sDzRK7RP/AHlJHyn3FW6KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIL5J5LK4S2kEVy0bCKRhkK2OCfocV4L/whv7Q//Q+e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',
                    fit: [700, 80],
                    width: "100%",
                    margin: [-40, 0, 0, 0],
                  }
                ]
              },
              {
                columns: [
                  {
                    width: "100%",
                    text: 'June 2021 – Present | Java Developer', bold: true,
                    style: "educationstyle",
                    margin: [0, 10, 0, 10]

                  },
                ]
              },
              {
                columns: [
                  {
                    width: "100%",
                    text: `${this.dataresume.details?.project_name}`, bold: true,
                    style: "educationstyle",
                    margin: [0, 10, 0, 10]

                  },
                ]
              },
              {
                columns: [
                  {
                    width: "100%",
                    text: 'Description:', bold: true,
                    style: "educationstyle",
                    margin: [0, 10, 0, 10]

                  },
                ]
              },
              {
                columns: [
                  {
                    width: "100%",
                    text: `${this.dataresume.details?.project_description}`,
                    margin: [0, 5, 0, 5]

                  },
                ]
              },
              {
                columns: [
                  {
                    
                    width: "100%",
                    text: 'Responsibilities:', bold: true,
                    style: "educationstyle",
                    margin: [0, 10, 0, 10]

                  },
                ]
              },
              //ul reposnbilites
              {
            
    //             for(i = 0) {
    //               for (var i = 0; i <= 10;i++){
                    
    //               }
    //  } ,          // style:'professtionalsummary',
                ul:[
                //  ...this.dataresume.details.responsiblity.responsibility
                ]
                // pageBreak: 'after'
              },
              
            ]]
        },

      ],

      footer(currentpage: number, pageCount: number, pageSize: any): any {
        return [
          {
            columns: [
              {
                image: logo.footerLogo,
                fit: [700, 71],
                width: "100%",
                margin: [0, 0, 0, 0],

              },
              {
                text: "Prasanth Sankurabothu",
                style: "footertitle",
                alignment: "left",
                margin: [40, 30]
              }
            ]
          }
        ]
      },

      styles,
      defaultStyle,
    };

    // Generating the pdf
    this.generatedPDF = pdfMake.createPdf(this.documentDefinition);
    // This generated pdf buffer is used for the download, print and for viewing
    this.generatedPDF.getBuffer((buffer) => {
      this.pdfSrc = buffer;
    });
  }

  getData(): void {
    this.httpClient.get("assets/data.json").subscribe((data) => {
      if (data) {
        this.pdfData = data;
        this.generatePDF();
      }
    });
  }


}

