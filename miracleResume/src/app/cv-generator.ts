import {
  AlignmentType, Document, Footer, Header, HeadingLevel, Packer, PageBreak, Paragraph, TabStopPosition, TabStopType, TextRun, UnderlineType
} from "docx";

// const PHONE_NUMBER = "7207202624";
// const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
// const EMAIL = "prasanthsankurabothu@gmail.com";

export class DocumentCreator {
  responsib: any;
  exp: any;
  ress: any = [];

  public create(data: any) {
    console.log(data);

    const document = new Document({
      // styles: {
      //   paragraphStyles: [
      //     {
      //       id: "Heading1",
      //       name: "Heading 1",
      //       basedOn: "Normal",
      //       next: "Normal",
      //       quickFormat: true,
      //       run: {
      //         size: 28,
      //         bold: true,
      //         italics: true,
      //         color: "red",
      //       },
      //       paragraph: {
      //         spacing: {
      //           after: 120,
      //         },
      //       },
      //     },
      //     {
      //       id: "Heading2",
      //       name: "Heading 2",
      //       basedOn: "Normal",
      //       next: "Normal",
      //       quickFormat: true,
      //       run: {
      //         size: 26,
      //         bold: true,
      //         underline: {
      //           type: UnderlineType.DOUBLE,
      //           color: "FF0000",
      //         },
      //       },
      //       paragraph: {
      //         spacing: {
      //           before: 240,
      //           after: 120,
      //         },
      //       },
      //     },
      //     {
      //       id: "aside",
      //       name: "Aside",
      //       basedOn: "Normal",
      //       next: "Normal",
      //       run: {
      //         color: "999999",
      //         italics: true,
      //       },
      //       paragraph: {
      //         indent: {
      //           left: 720,
      //         },
      //         spacing: {
      //           line: 276,
      //         },
      //       },
      //     },
      //     {
      //       id: "wellSpaced",
      //       name: "Well Spaced",
      //       basedOn: "Normal",
      //       quickFormat: true,
      //       paragraph: {
      //         spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
      //       },
      //     },
      //     {
      //       id: "ListParagraph",
      //       name: "List Paragraph",
      //       basedOn: "Normal",
      //       quickFormat: true,
      //     },
      //   ],
      // },
      numbering: {
        config: [
          {
            reference: "my-crazy-numbering",
            levels: [
              {
                level: 0,
                // format: "lowerLetter",
                text: "%1)",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
      sections: [
        {
          headers: {
            default: new Header({
              children: [new Paragraph(
                {
                  text: data[0].firstName + " " + data[0].lastName,
                  heading: HeadingLevel.TITLE,
                  alignment: AlignmentType.RIGHT
                })],
            }),
          },
          footers: {
            default: new Footer({
              children: [new Paragraph(
                {
                  alignment: AlignmentType.LEFT,
                  text:"© 2022 Powered By Miracle Software Systems",
                })],
            }),
          },
         
          children: [
            
            // first name and last name
            // new Paragraph({
            //   text: data[0].firstName + " " + data[0].lastName,
             
            //   heading: HeadingLevel.TITLE,
              

            // }),
            //phonenumber ,profile url , email
            // this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),

            //professional summary
            this.createHeading("Professional Summary"),
            ...this.createProfessionalSummaryList(data),

            ///profile
            this.createHeading("Profile"),
            this.createInstitutionHeader1(data[0]?.eduation),

            //technical skills
            this.createHeading("Technical Skills"),
            this.createInterests(data[0].languages),
            new Paragraph({
              text: ` Web Servers and App servers:${data[0]?.webserves_appserves}`,
              // heading: HeadingLevel.HEADING_5
            }),
            new Paragraph(
              { text: ` development_tools: ${data[0]?.development_tools}` }),
            new Paragraph({ text: ` opearting_system: ${data[0]?.operating_system}` }),

            new Paragraph({ text: ` database: ${data[0].database}` }),
            new Paragraph({ text: ` service_oriented_archit: ${data[0].service_oriented_archit}` }),

            this.createHeading("Experience"),
            ...data
              .map(position => {
                const arr: Paragraph[] = [];
                const prdetails = position.details

                console.log('psoition', prdetails)
                for (let i = 0; i < prdetails.length; i++) {
                  arr.push(
                    this.createInstitutionHeader(
                      prdetails[i].project_name
                      ,
                      this.createPositionDateText(

                        new Date(prdetails[i].from_date).toDateString().split(' ').join(' ')
                        ,
                        new Date(prdetails[i].to_date).toDateString().split(' ').join(' ')

                      )
                    )

                  ); arr.push(
                    this.createSubHeadingProjectDes("Project Description"),
                    this.createdescription(prdetails[i].project_description)
                  );
                  
                  for (let j = i; j < prdetails.length; j++) {
                    
                    console.log(prdetails[j].responsiblity)
                    let res = prdetails[j].responsiblity
                   
                    res.map(d => {
                      
                      arr.push(
                        
                        this.createrespo(d.responsibility)
                      );
                    })

                  }
                  arr.push(this.createRoleText(position.title));
                }
                


                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),


            ...data.map((project: any) => {
              console.log(project.details)

              return this.createProjectList(project.details)

            },
            ),

            data.map((emp: any) => {

              console.log(emp)
              return data.map((emp: { project_name: any; }) =>

                new Paragraph({
                  children: [
                    new Paragraph({
                      bullet: {
                        level: 0
                      },
                      children: [
                        new TextRun({
                          text: emp?.project_name
                        })
                      ]
                    })
                  ]
                }))
            })
          ]
        }
      ]
    });

    return document;
  }

  // public createContactInfo(
  //   phoneNumber: string,
  //   profileUrl: string,
  //   email: string
  // ): Paragraph {
  //   return new Paragraph({
  //     alignment: AlignmentType.CENTER,
  //     children: [
  //       new TextRun(
  //         `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
  //       ),
  //       new TextRun({
  //         text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
  //         break: 1
  //       })
  //     ]
  //   });
  // }




  //creating-------------------------------------------
  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }



  public createInstitutionHeader(
    institutionName: string,
    dateText: any
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }
  public createrespo(
    institutionName: string,

  ): Paragraph {
    return new Paragraph({
      bullet: {
        level: 0
      },

      children: [
        new TextRun({
          text: institutionName,
          
          // bold: true
        }),

      ]
    });
  }
//---------------------------------
  
  public createdescription(
    institutionName: string,

  ): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: institutionName,
          
          break:1
        }),

      ]
    });
  }
  //------------------------------------------------------------
  public createInstitutionHeader1(
    institutionName: string,
  ): Paragraph {
    console.log(institutionName)
    return new Paragraph({

      text: institutionName,

      children: [
        new TextRun({
          
          // bold: true,
        }),
      ]
    });
  }


  public createRoleText(roleText: string): Paragraph {
    console.log(roleText)
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  public createBullet(text: any): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0

      }
    });
  }
  // public createexperiencene(exp: any): Paragraph[] {
  //   console.log(exp)
  //   //  exp[0].details?.responsiblity.map(r=>
  //   //   {
  //   //     console.log(r)
  //   //   })
  //   return exp.map(
  //     (pro: any) => {
  //       new Paragraph({
  //         text: "eeeeeeeeeeee",
  //         bullet: {
  //           level: 0,
  //         },
  //       })
  //     }
  //   )
  // }

  public createAchivementsList(achivements: any[]): Paragraph[] {
    console.log(achivements[0].responsiblity)
    let respo = achivements[0].responsiblity
    return respo.map(
      (achievement: { res: any; }) =>
        new Paragraph({
          text: achievement.res,
          bullet: {
            level: 0
          }
        })
    );
  }
  //---------------------------------------------------------
  public createProfessionalSummaryList(professtional: any[]): Paragraph[] {
    console.log(professtional)
    let respo = professtional[0].professional_summary
    console.log(respo)
    return respo.map(
      (prof: any) =>

        new Paragraph({
          text: prof,
          bullet: {
            level:0,
          },

        }),
    );

  }
  public createSubHeading(text1: string): Paragraph {
    return new Paragraph({
      text: text1,
      heading: HeadingLevel.HEADING_1,
      bullet: {
        level: 0,
      },
      children: [
        new TextRun({
          bold: true
        })
      ]
    });
  }
  public createSubHeadingProjectDes(text1: string): Paragraph {
    return new Paragraph({
      text: text1,
      heading: HeadingLevel.HEADING_2,
      
      children: [
        new TextRun({
          bold: true,
          // break:1
        })
      ]
    });
  }


  public createProjectList(project: any): Paragraph {
    console.log(project, ":::::::::::::")

    project.map((emp => {
      console.log(emp)
    }))

    return project.map(emp => new Paragraph({
      text: 'project test',
      // emp.project_name,
      heading: HeadingLevel.HEADING_1,
      bullet: {
        level: 0,
      },
      children: [
        new TextRun({
          text: "ggg",
          bold: true
        })
      ]
    }));
  }

  public createExperience(data: any): Paragraph {
    console.log(data[0])
    return data[0].map((emp: { project_name: string; from_date: any; to_date: any; responsiblity: any[]; }) => {
      console.log(emp)
      const arr: Paragraph[] = [];
      arr.push(
        this.createInstitutionHeader(
          emp.project_name,
          this.createPositionDateText(
            emp.from_date,
            emp.to_date
          )
        )
      );
      arr.push(this.createRoleText(emp.project_name));
      const joinedStr = emp.responsiblity.map((list: { res: any; }) => list.res).join(",");
      const bulletPoints = this.splitParagraphIntoBullets(
        joinedStr
      );

      bulletPoints.forEach(bulletPoint => {
        console.log(bulletPoint);
        arr.push(this.createBullet(bulletPoint));
      });

      return arr;
    });

  }

  ///------------------------------------------------------------------
  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(
        {
          text: `Langauges: ${interests}`
        }
      )]
    });
  }

  public splitParagraphIntoBullets(text: any): Paragraph[] {
    console.log('log', text,)
    return text.split(",")
    // new Paragraph ({ children: [new TextRun(text.map(skill => skill.name).join(", ") + ".")] }) 


  }
  public createPositionDateText(
    startDate: any,
    endDate: any,
  ): string {
    const startDateText1 = startDate
    const endDateText1 = endDate
    return `${startDateText1} - ${endDateText1}`;
  }


}
