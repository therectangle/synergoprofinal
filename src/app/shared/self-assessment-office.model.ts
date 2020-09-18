export class SelfAssessmentOffice {
    $key: string = "";
    id: string = "";
    emailId: string = "";

    question1: string = "What is your main concern?";
    question1Options: string = "";
    question1OptionsArray: any = [{
        name: "question1Options",
        value: "Preventive",
        selected: false
    },
    {
        name: "question1Options",
        value: "Move to new workstation",
        selected: false
    },
    {
        name: "question1Options",
        value: " Experiencing pain / discomfort.",
        selected: false

    }];
    question1Options3: string = "";
    question1Options3Array: any = [
        {
            name: "option1_3",
            value: "Head",

            optionsValues: [{
                name: "option1_31",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_32",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_32",
            value: "Eyes",

            optionsValues: [{
                name: "option1_322",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_323",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_33",
            value: "Neck",
            selected: false,
            optionsValues: [{
                name: "option1_313",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_332",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_36",
            value: "Shoulders",
            selected: false,
            optionsValues: [{
                name: "option1_361",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_362",
                value: "Pain comes & goes",
                selected: false,
            }]
        }
        ,
        {
            name: "option1_34",
            value: "Upper Back",
            selected: false,
            optionsValues: [{
                name: "option1_341",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_342",
                value: "Pain comes & goes",
                selected: false,
            }]
        }
        ,
        {
            name: "option1_35",
            value: "Lower Back",
            selected: false,
            optionsValues: [{
                name: "option1_351",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_352",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option11_36",
            value: "Elbow",
            selected: false,
            optionsValues: [{
                name: "option11_361",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option11_362",
                value: "Pain comes & goes",
                selected: false,
            }]
        }
        
        ,
        {
            name: "option1_37",
            value: "Forearms",
            selected: false,
            optionsValues: [{
                name: "option1_371",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_372",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_38",
            value: "Wrists",
            selected: false,
            optionsValues: [{
                name: "option1_381",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_382",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_39",
            value: "Hand / finger",
            selected: false,
            optionsValues: [{
                name: "option1_391",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_392",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_310",
            value: "Knee",
            selected: false,
            optionsValues: [{
                name: "option1_3101",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_3102",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_311",
            value: "Foot",
            selected: false,
            optionsValues: [{
                name: "option1_3111",
                value: "Persistent pain",
                selected: false,
            }, {
                name: "option1_3112",
                value: "Pain comes & goes",
                selected: false,
            }]
        },
        {
            name: "option1_312",
            value: "Others",
            selected: false,
            optionsValues: [{
                name: "option1_3121",
                value: "Mention Other Pain/discomfort area",
                selected: false,
            }, {
                name: "option1_3132",
                value: "Pain comes & goes",
                selected: false,
            }]
        }


    ];
    //Question2 Options

    question2: string = "What do you use for work?";
    question2Options: string = "";
    question2OptionsArray: any = [
        {
            name: "option21",
            value: "Laptop",
            abbrClass: "icon-laptop",
            selected:false,
            optionsValues: [{
                name: "option211",
                value: "Rarely",
                selected: false,
            }, {
                name: "option212",
                value: "Often",
                selected: false,
            }, {
                name: "option213",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option22",
            value: "Desktop",
            abbrClass: "icon-desktop",
            selected:false,
            optionsValues: [{
                name: "option221",
                value: "Rarely",
                selected: false,
            }, {
                name: "option222",
                value: "Often",
                selected: false,
            }, {
                name: "option223",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option23",
            value: "Desktop with Additional screens",
            abbrClass: "icon-desktop-additional",
            selected:false,
            optionsValues: [{
                name: "option231",
                value: "Rarely",
                selected: false,
            }, {
                name: "option232",
                value: "Often",
                selected: false,
            }, {
                name: "option233",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option24",
            value: "Laptop with Additional screens",
            abbrClass: "icon-laptop-additional",
            selected:false,
            optionsValues: [{
                name: "option241",
                value: "Rarely",
                selected: false,
            }, {
                name: "option242",
                value: "Often",
                selected: false,
            }, {
                name: "option243",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option25",
            value: "Mobile devices",
            abbrClass: "icon-mobile",
            selected:false,
            optionsValues: [{
                name: "option251",
                value: "Rarely",
                selected: false,
            }, {
                name: "option252",
                value: "Often",
                selected: false,
            }, {
                name: "option253",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option26",
            value: "Paper documents and pen",
            abbrClass: "icon-paper-work",
            selected:false,
            optionsValues: [{
                name: "option261",
                value: "Rarely",
                selected: false,
            }, {
                name: "option262",
                value: "Often",
                selected: false,
            }, {
                name: "option263",
                value: "Usually",
                selected: false,
            }]
        }


    ];

    //Question3 Options

    question3: string = "Select your work environment:";
    question3Options: string = "";
    question3OptionsArray: any = [
        {
            name: "option31",
            value: "Usually",
            abbrClass: "icon-usually",
            abbrText: "you primarily work in a:",

            optionsValues: [{
                name: "option311",
                value: "Cubicle",
                selected: false,
            }, {
                name: "option312",
                value: "Private room",
                selected: false,
            }, {
                name: "option313",
                value: "Flexible seat-hot-desk",
                selected: false,
            }, {
                name: "option314",
                value: "Break-out area",
                selected: false,
            }, {
                name: "option315",
                value: "Meeting room",
                selected: false,
            }, {
                name: "option316",
                value: "Cafe",
                selected: false,
            }]
        },
        {
            name: "option32",
            value: "Frequently",
            abbrClass: "icon-frequently",
            abbrText: "you at times also work in a:",

            optionsValues: [{
                name: "option321",
                value: "Cubicle",
                selected: false,
            }, {
                name: "option322",
                value: "Private room",
                selected: false,
            }, {
                name: "option323",
                value: "Flexible seat-hot-desk",
                selected: false,
            }, {
                name: "option324",
                value: "Break-out area",
                selected: false,
            }, {
                name: "option325",
                value: "Meeting room",
                selected: false,
            }, {
                name: "option326",
                value: "Cafe",
                selected: false,
            }]
        },
        {
            name: "option33",
            value: "Rarely",
            abbrClass: "icon-rarely",
            abbrText: "you could work in a:",

            optionsValues: [{
                name: "option331",
                value: "Cubicle",
                selected: false,
            }, {
                name: "option332",
                value: "Private room",
                selected: false,
            }, {
                name: "option333",
                value: "Flexible seat-hot-desk",
                selected: false,
            }, {
                name: "option334",
                value: "Break-out area",
                selected: false,
            }, {
                name: "option335",
                value: "Meeting room",
                selected: false,
            }, {
                name: "option336",
                value: "Cafe",
                selected: false,
            }]
        },




    ];

        
 
        //Question4 Options
        question4: string = "What type of office chair do you have?";
        question4Options: string = "";
        question4OptionsArray: any = [
        {
            name: "question4Options",
            value: "Typist chair (only upper back support)",
            imageName: "assets/images/form-assestment/chair-1.png",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",


        },
        {
            name: "question4Options",
            value: "Task chair (upper & lower back support)",
            imageName: "assets/images/form-assestment/chair-2.png",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question4Options",
            value: "Executive chair",
            imageName: "assets/images/form-assestment/chair-3.png",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }];



          //Question5 Options

    question5: string = "What type of desk do you have? ";
    question5Options: string = "";
    question5OptionsArray: any = [
        {
            name: "question5Options",
            value: "Straight / benching",
            abbrClass: "icon-sitting",
            imageName: "assets/images/form-assestment/straight_desk.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

            optionsValues: [{
                name: "option511",
                value: "Desk height is fixed.",
                selected: false,
            }, {
                name: "option512",
                value: "Desk height can be adjusted for sitting.",
                selected: false,
            }, {
                name: "option513",
                value: "Desk can be adjusted for sitting and standing.",
                selected: false,
            }]
        },
        {
            name: "question5Options",
            value: "L-shaped / Curved",
            abbrClass: "icon-standing",
            imageName: "assets/images/form-assestment/corner_desk.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",
            optionsValues: [{
                name: "option521",
                value: "Desk height is fixed.",
                selected: false,
            }, {
                name: "option522",
                value: "Desk height can be adjusted for sitting.",
                selected: false,
            }, {
                name: "option523",
                value: "Desk can be adjusted for sitting and standing.",
                selected: false,
            }]
        },
       
       


    ];

        //Question5 Options
        question6: string = "Your sitting posture is (select all that applies): ";
        question6Options: string = "";
        question6OptionsArray: any = [
        {
            name: "option61",
            value: "Perched forward",
            imageName: "assets/images/form-assestment/perchedforward.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "option62",
            value: "Leaning forward",
            imageName: "assets/images/form-assestment/leaningforward.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "option63",
            value: "Slouching",
            imageName: "assets/images/form-assestment/slouching.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "option64",
            value: " Feet unsupported / resting on castors",
            imageName: "assets/images/form-assestment/off-the-floor-resting-on-casters.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }
        ,
        {
            name: "option65",
            value: "Sitting back",
            imageName: "assets/images/form-assestment/sitting-back.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }
    ];


        //Question6 Options
        question7: string = "Your seat depth is such that there is:";
        question7Options: string = "";
        question7OptionsArray: any = [
        {
            name: "question7Options",
            value: "No spacing between edge of chair and back of knees",
            imageName: "assets/images/form-assestment/seatpan_toodeep.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question7Options",
            value: "More than 3 fingers spacing between edge of the chair and back of knees.",
            imageName: "assets/images/form-assestment/seatpan_tooshallow.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question7Options",
            value: "3 fingers spacing between edge of chair and back of knees.",
            imageName: "assets/images/form-assestment/idealsittingposture.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }];

        //Question7 Options
        question8: string = "When sitting to work on a computer, your elbow angle is:";
        question8Options: string = "";
        question8OptionsArray: any = [
        {
            name: "question8Options",
            value: "Elbow angle = 90 degrees",
            imageName: "assets/images/form-assestment/idealsittingposture.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question8Options",
            value: "Elbow angle < 90 degrees",
            imageName: "assets/images/form-assestment/desktoohigh.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question8Options",
            value: "Elbow angle > 90 degrees",
            imageName: "assets/images/form-assestment/desktoolow.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }];


        //Question7 Options
        question9: string = "When standing to work on a computer, your elbow angle is:";
        question9Options: string = "";
        question9OptionsArray: any = [
        {
            name: "question9Options",
            value: "Elbow angle = 90 degrees",
            imageName: "assets/images/form-assestment/standdesk_ideal.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question9Options",
            value: "Elbow angle < 90 degrees",
            imageName: "assets/images/form-assestment/standdesk_toohigh.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question9Options",
            value: "Elbow angle > 90 degrees",
            imageName: "assets/images/form-assestment/standdesk_toolow.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }];

        //Question7 Options
        question10: string = "When you work on a Laptop:";
        question10Options: string = "";
        question10OptionsArray: any = [
        {
            name: "question10Options",
            value: "Laptop is placed on the table",
            imageName: "assets/images/form-assestment/laptop.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question10Options",
            value: "Laptop is raised but I don't use an external keyboard and mouse",
            imageName: "assets/images/form-assestment/laptopwedge.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        },
        {
            name: "question10Options",
            value: "Laptop is raised and I use an external keyboard and mouse",
            imageName: "assets/images/form-assestment/laptop_stand_ideal.jpg",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }];

         //Question9 Options
         question11: string = "Your screen height is:";
         question11Options: string = "";
         question11OptionsArray: any = [
         {
             name: "question11Options",
             value: "Above eye level",
             imageName: "assets/images/form-assestment/monitor_toohigh.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "question11Options",
             value: "Below eye level",
             imageName: "assets/images/form-assestment/desktoolow.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "question11Options",
             value: "At eye level",
             imageName: "assets/images/form-assestment/1armlength.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         }];
         //Question9 Options
         question12: string = "How are your screens arranged?";
         question12Options: string = "";
         question12OptionsArray: any = [
         {
             name: "question12Options",
             value: "Sitting in front of the screen that’s used more frequently while other screen is angled on the side.",
             imageName: "assets/images/form-assestment/screens_pri_sec.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "question12Options",
             value: "Sitting in the middle of two screens since both are used equally frequenetly",
             imageName: "assets/images/form-assestment/screenscentered_infront.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
            name: "question12Options",
            value: "No specific screen arrangement. Moving in front of each screen as required",
            imageName: "assets/images/form-assestment/screensapart.png",
            selected: false,
            tooltipText:"A brief description about the posture on hover comes here",

        }
         ];
         
         //Question9 Options
         question13: string = "How do you use the keyboard? (select all that applies)";
         question13Options: string = "";
         question13OptionsArray: any = [
         {
             name: "option131",
             value: "Arms close to body with wrists resting lightly  on desk",
             imageName: "assets/images/form-assestment/typing_ideal.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option132",
             value: "Wrists kept straight while typing",
             imageName: "assets/images/form-assestment/typing_wrists_straight.png",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option133",
             value: "Arms close to body with wrists compressed agaist the edge of desk",
             imageName: "assets/images/form-assestment/typing_ideal.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option134",
             value: "Arms extended away from body with arms leaning onto desk.",
             imageName: "assets/images/form-assestment/typing_keyboardtoofar.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option135",
             value: "Wrists bent sideways while typing",
             imageName: "assets/images/form-assestment/typing_wrists_bent.png",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         }];

         //Question9 Options
         question14: string = "How do you use the mouse?(select all that applies)";
         question14Options: string = "";
         question14OptionsArray: any = [
         {
             name: "option141",
             value: "Hand fully resting on mouse ",
             imageName: "assets/images/form-assestment/mouse_resting.png",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option142",
             value: "Wrist, hand and arm kept straight.",
             imageName: "assets/images/form-assestment/mouse_wriststraight_top.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option143",
             value: "Wrist bent sideways",
             imageName: "assets/images/form-assestment/mouse_wristbentsideways.jpg",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         },
         {
             name: "option144",
             value: "Holding mouse in claw grip.",
             imageName: "assets/images/form-assestment/mouse_clawgrip.png",
             selected: false,
             tooltipText:"A brief description about the posture on hover comes here",
 
         }];
          //Question9 Options
          question15: string = "Do you have glare issues?";
          question15Options: string = "";
          question15OptionsArray: any = [
          {
              name: "question15Options",
              value: "Glare from overhead lighting or sunlight",
              imageName: "assets/images/form-assestment/glare_combo.jpg",
              selected: false,
              tooltipText:"A brief description about the posture on hover comes here",
  
          },
          {
              name: "question15Options",
              value: "No Glare issues",
              imageName: "assets/images/form-assestment/glaresolved_blindsup.jpg",
              selected: false,
              tooltipText:"A brief description about the posture on hover comes here",
  
          }];

          //Question2 Options

    question16: string = "Throughout the working day, how frequently would you do the following?";
    question16Options: string = "";
    question16OptionsArray: any = [
        {
            name: "option161",
            value: "Sitting",
            abbrClass: "icon-sitting",

            optionsValues: [{
                name: "option1611",
                value: "Rarely",
                selected: false,
            }, {
                name: "option1612",
                value: "Often",
                selected: false,
            }, {
                name: "option1613",
                value: "Usually",
                selected: false,
            }]
        },
        {
            name: "option162",
            value: "Standing",
            abbrClass: "icon-standing",

            optionsValues: [{
                name: "option1621",
                value: "Rarely",
                selected: false,
            }, {
                name: "option1622",
                value: "Often",
                selected: false,
            }, {
                name: "option1623",
                value: "Usually",
                selected: false,
            }]
        },
       
        {
            name: "option165",
            value: "Stretching",
            abbrClass: "icon-stretching",
            optionsValues: [{
                name: "option1651",
                value: "Rarely",
                selected: false,
            }, {
                name: "option1652",
                value: "Often",
                selected: false,
            }, {
                name: "option1653",
                value: "Usually",
                selected: false,
            }]
        },
        
        {
            name: "option166",
            value: "Taking Breaks",
            abbrClass: "icon-taking-breaks",
            optionsValues: [{
                name: "option1661",
                value: "Rarely",
                selected: false,
            }, {
                name: "option1662",
                value: "Often",
                selected: false,
            }, {
                name: "option1663",
                value: "Usually",
                selected: false,
            }]
        }


    ];

        
}
