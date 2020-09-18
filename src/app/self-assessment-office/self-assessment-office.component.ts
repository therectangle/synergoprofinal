
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelfAssessment } from '../shared/self-assessment.model';
import { SelfAssessmentService } from '../shared/self-assessment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location, JsonPipe } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { SendMailServiceService } from '../shared/send-mail-service.service';
import { Iinfo } from '../shared/info.model';
import { CustomValidators } from '../shared/custom.validators';
import { SelfAssessmentOffice } from '../shared/self-assessment-office.model';
import { SelfAssessmentOfficeDTO } from '../shared/self-assessment-office-report-dto';
@Component({
  selector: 'app-self-assessment-office',
  templateUrl: './self-assessment-office.component.html',
  styleUrls: ['./self-assessment-office.component.css']
})
export class SelfAssessmentOfficeComponent implements OnInit {
  HIGHSCORECOUNT: number = 3;
  MIDSCORECOUNT: number = 2;
  LOWSCORECOUNT: number = 3;
  isDownloading: boolean = false;

  selfAssessmentOfficeDTO: SelfAssessmentOfficeDTO;
  selfAssessmentList: SelfAssessment[];
  @ViewChild('content') content: ElementRef;
  clients: Observable<any[]>;
  selfAssessmentForm: FormGroup;  //declaring our form variable
  question1OptionsFormArray: FormArray;
  question1Options3FormArray: FormArray;
  question2OptionsFormArray: FormArray;
  question3OptionsFormArray: FormArray;
  question4OptionsFormArray: FormArray;
  question5OptionsFormArray: FormArray;
  question6OptionsFormArray: FormArray;
  question7OptionsFormArray: FormArray;
  question8OptionsFormArray: FormArray;
  question9OptionsFormArray: FormArray;
  question10OptionsFormArray: FormArray;
  question11OptionsFormArray: FormArray;
  question12OptionsFormArray: FormArray;
  question13OptionsFormArray: FormArray;
  question14OptionsFormArray: FormArray;
  question15OptionsFormArray: FormArray;
  question16OptionsFormArray: FormArray;

  //Specific Div To Show
  question2OptionsDivSectionToDisplay: boolean = false;

  selfAssessment = new SelfAssessmentOffice();
  isSubmittedForReport: boolean = false;
  showElse9Question: false;
  user: FirebaseUserModel = new FirebaseUserModel();
  keyAreaOfImprovementHeading: boolean = false;
  generalRecommendationHeading: boolean = false;
  currentGoodPracticesHeading: boolean = false;
  tipsforplaceswhereyouworkHeading: boolean = false;
  perchedForwardCount: number = 0;

  KeyAreasofImprotClassDiv: boolean = true;
  goodHabbitClassDiv: boolean = true;
  questionNumberFor6: number = 6;
  questionNumberFor7: number = 7;
  questionNumberFor8: number = 6;
  questionNumberFor9: number = 7;
  questionNumberFor9SectionA: boolean = false;
  questionNumberFor9SectionB: boolean = false;
  validationPopupDisplay: boolean = false;
  meterLowCount: number = 0;
  meterMediumCount: number = 0;
  meterHighCount: number = 0;
  fullName: string = "";
  meterImage: string = "low_risk.svg";
  lowMeterImage: string = "low_risk.svg";
  medMeterImage: string = "med_risk.svg";
  highMeterImage: string = "high_risk.svg"; fileUrl;
  firebaseUserModel: FirebaseUserModel;


  //to Show error Highlight Box Over Each Questions
  question1Error: boolean = false;
  question2Error: boolean = false;
  question3Error: boolean = false;
  question4Error: boolean = false;
  question5Error: boolean = false;
  question6Error: boolean = false;
  question7Error: boolean = false;
  question8Error: boolean = false;
  question9Error: boolean = false;
  downloadURL: any;
  pdfshareurl: any;
  public subscription: Subscription;
  validationShareReportPopupDisplay: boolean;
  selectedHobbies: [string];
  question1Options3ArrayDivSelected: boolean = false;
  question2Options5ArrayDivSelected: boolean = false;


  //default this options will not display
  question9ToDisplay: boolean;
  question10ToDisplay: boolean;
  question11ToDisplay: boolean;
  question12ToDisplay: boolean;

  mobiledevicesOptionsDivSectionToDisplay: boolean = false;
  paperdocumentsandpenOptionsDivSectionToDisplay: boolean = false;
  cafeOptionsDivSectionToDisplay: boolean = false;
  meetingroomOptionsDivSectionToDisplay: boolean = false;
  breakoutareaOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForFOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForGOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForHOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForIOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForJOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForKOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForLOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForMOptionsDivSectionToDisplay: boolean = false;
  questionNo1ForNOptionsDivSectionToDisplay: boolean = false;


  questionNo2ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo2ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo2ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo2ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo2ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo2ForFOptionsDivSectionToDisplay: boolean = false;

  questionNo3ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForCOptionsDivSectionToDisplay: boolean = false;

  questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForA_And_CSeleceted_FOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForA_And_DSeleceted_FOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForA_And_ESeleceted_FOptionsDivSectionToDisplay: boolean = false;

  questionNo3ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForFOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForGOptionsDivSectionToDisplay: boolean = false;

  questionNo4ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo4ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo4ForCOptionsDivSectionToDisplay: boolean = false;

  questionNo5ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo5ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo5ForCOptionsDivSectionToDisplay: boolean = false;

  questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay: boolean = false;
  questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay: boolean = false;

  questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay: boolean = false;
  questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay: boolean = false;

  questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay: boolean = false;
  questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay: boolean = false;



  questionNo6ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo6ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo6ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo6ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo6ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo6ForFOptionsDivSectionToDisplay: boolean = false;


  questionNo6ForABCOptionsDivSectionToDisplay: boolean = false;

  questionNo7ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo7ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo7ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo8ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo8ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo8ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo9ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo9ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo9ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo10ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo10ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo10ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo11ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo11ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo11ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo12ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo12ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo12ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo13ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo13ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo13ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo13ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo13ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo14ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo14ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo14ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo14ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo15ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo15ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo15ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForAOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForBOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForAAOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForABOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForCOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo16ForFOptionsDivSectionToDisplay: boolean = false;
  isFinalError: boolean;


  constructor(private storage: AngularFireStorage,
    private service: SelfAssessmentService,
    private firestore: AngularFirestore, private formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location, private sanitizer: DomSanitizer, private sendmailservice: SendMailServiceService
  ) {

    this.firebaseUserModel = JSON.parse(sessionStorage.getItem("firebaseUserModel"));
    console.log(" this.firebaseUserModel New1==" + this.firebaseUserModel);
    this.selfAssessmentForm = this.formBuilder.group({
      question1OptionsArray: this.formBuilder.array([]),
      question1Options3Array: this.formBuilder.array([]),
      question2OptionsArray: this.formBuilder.array([]),
      question3OptionsArray: this.formBuilder.array([]),
      question4OptionsArray: this.formBuilder.array([]),
      question5OptionsArray: this.formBuilder.array([]),
      question6OptionsArray: this.formBuilder.array([]),
      question7OptionsArray: this.formBuilder.array([]),
      question8OptionsArray: this.formBuilder.array([]),
      question9OptionsArray: this.formBuilder.array([]),
      question10OptionsArray: this.formBuilder.array([]),
      question11OptionsArray: this.formBuilder.array([]),
      question12OptionsArray: this.formBuilder.array([]),
      question13OptionsArray: this.formBuilder.array([]),
      question14OptionsArray: this.formBuilder.array([]),
      question15OptionsArray: this.formBuilder.array([]),
      question16OptionsArray: this.formBuilder.array([])




    });

    this.question1Options3FormArray = this.question1Options3ArrayFormGroup;//get From Property
    this.question1OptionsFormArray = this.question1OptionsArrayFormGroup;
    this.question2OptionsFormArray = this.question2OptionsArrayFormGroup;
    this.question3OptionsFormArray = this.question3OptionsArrayFormGroup;
    this.question4OptionsFormArray = this.question4OptionsArrayFormGroup;
    this.question5OptionsFormArray = this.question5OptionsArrayFormGroup;
    this.question6OptionsFormArray = this.question6OptionsArrayFormGroup;
    this.question7OptionsFormArray = this.question7OptionsArrayFormGroup;
    this.question8OptionsFormArray = this.question8OptionsArrayFormGroup;
    this.question9OptionsFormArray = this.question9OptionsArrayFormGroup;
    this.question10OptionsFormArray = this.question10OptionsArrayFormGroup;
    this.question11OptionsFormArray = this.question11OptionsArrayFormGroup;
    this.question12OptionsFormArray = this.question12OptionsArrayFormGroup;
    this.question13OptionsFormArray = this.question13OptionsArrayFormGroup;
    this.question14OptionsFormArray = this.question14OptionsArrayFormGroup;
    this.question15OptionsFormArray = this.question15OptionsArrayFormGroup;
    this.question16OptionsFormArray = this.question16OptionsArrayFormGroup;



  }



  ngOnInit() {

    for (let ii = 0; ii < this.selfAssessment.question1Options3Array.length; ii++) {
      this.question1Options3FormArray.push(this.createQuestion1Options3Array(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question1OptionsArray.length; ii++) {
      this.question1OptionsFormArray.push(this.createQuestion1OptionsArrayOptionsValues(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question2OptionsArray.length; ii++) {
      this.question2OptionsFormArray.push(this.createQuestion2OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question3OptionsArray.length; ii++) {
      this.question3OptionsFormArray.push(this.createQuestion3OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question4OptionsArray.length; ii++) {
      this.question4OptionsFormArray.push(this.createQuestion4OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question5OptionsArray.length; ii++) {
      this.question5OptionsFormArray.push(this.createQuestion5OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question6OptionsArray.length; ii++) {
      this.question6OptionsFormArray.push(this.createQuestion6OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question7OptionsArray.length; ii++) {
      this.question7OptionsFormArray.push(this.createQuestion7OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question8OptionsArray.length; ii++) {
      this.question8OptionsFormArray.push(this.createQuestion8OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question9OptionsArray.length; ii++) {
      this.question9OptionsFormArray.push(this.createQuestion9OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question10OptionsArray.length; ii++) {
      this.question10OptionsFormArray.push(this.createQuestion10OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question11OptionsArray.length; ii++) {
      this.question11OptionsFormArray.push(this.createQuestion11OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question12OptionsArray.length; ii++) {
      this.question12OptionsFormArray.push(this.createQuestion12OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question13OptionsArray.length; ii++) {
      this.question13OptionsFormArray.push(this.createQuestion13OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question14OptionsArray.length; ii++) {
      this.question14OptionsFormArray.push(this.createQuestion14OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question15OptionsArray.length; ii++) {
      this.question15OptionsFormArray.push(this.createQuestion15OptionsArray(ii));
    }
    for (let ii = 0; ii < this.selfAssessment.question16OptionsArray.length; ii++) {
      this.question16OptionsFormArray.push(this.createQuestion16OptionsArray(ii));
    }


    /*this.selfAssessmentForm.get("question2OptionsArray").valueChanges.subscribe((data) => {
      console.log("question2OptionsArray Change Event");
      //If option (b) , (c) or (d) is selected, show question 11 about display height. 
      console.log(this.getQuestion2OptionsArrayFormGroup(0).value.optionsValues[0].selected)
      if ((this.getQuestion2OptionsArrayFormGroup(1).value.selected) ||
        (this.getQuestion2OptionsArrayFormGroup(2).value.selected) ||
        (this.getQuestion2OptionsArrayFormGroup(3).value.selected)) {
        this.question11ToDisplay = true;
      }
      else {
        this.question11ToDisplay = false;
      }
    //If (a) or (d) is selected, show question 10 about laptop. 
      if ((this.getQuestion2OptionsArrayFormGroup(0).value.selected) ||
      (this.getQuestion2OptionsArrayFormGroup(4).value.selected)) {
      this.question10ToDisplay = true;
    }
    else {
      this.question10ToDisplay = false;
    }

    //If (c) or (d)  is selected, show question 12 about screens arrangement.
    if ((this.getQuestion2OptionsArrayFormGroup(2).value.selected) ||
    (this.getQuestion2OptionsArrayFormGroup(3).value.selected)) {
    this.question12ToDisplay = true;
  }
  else {
    this.question12ToDisplay = false;
  }

      //Question no 2 (e) Mobile devices
      if ((this.getQuestion2OptionsArrayFormGroup(4).value.selected)) {
        this.mobiledevicesOptionsDivSectionToDisplay = true;
      }
      else {
        this.mobiledevicesOptionsDivSectionToDisplay = false;
      }

    });*/

  }


  //Question 1
  createQuestion1Options3Array(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question1Options3Array[index].name],
      value: [this.selfAssessment.question1Options3Array[index].value],
      selected: [this.selfAssessment.question1Options3Array[index].selected || false],
      optionsValues: this.formBuilder.array([this.createQuestion1Options3ArrayOptionsValues(index, 0), this.createQuestion1Options3ArrayOptionsValues(index, 1)])
    });

  }

  createQuestion1Options3ArrayOptionsValues(index, position): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question1Options3Array[index].optionsValues[position].name],
      value: [this.selfAssessment.question1Options3Array[index].optionsValues[position].value],
      selected: [this.selfAssessment.question1Options3Array[index].optionsValues[position].selected || false]
    });

  }



  createQuestion1OptionsArrayOptionsValues(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question1OptionsArray[index].name],
      value: [this.selfAssessment.question1OptionsArray[index].value],
      selected: [this.selfAssessment.question1OptionsArray[index].selected || false]
    });

  }
  //Question 2
  createQuestion2OptionsArray(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question2OptionsArray[index].name],
      value: [this.selfAssessment.question2OptionsArray[index].value],
      selected: [this.selfAssessment.question2OptionsArray[index].selected || false],
      abbrClass: [this.selfAssessment.question2OptionsArray[index].abbrClass],
      optionsValues: this.formBuilder.array([this.createQuestion2OptionsArrayOptionsValues(index, 0), this.createQuestion2OptionsArrayOptionsValues(index, 1), this.createQuestion2OptionsArrayOptionsValues(index, 2)])
    });

  }

  createQuestion2OptionsArrayOptionsValues(index, position): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question2OptionsArray[index].optionsValues[position].name],
      value: [this.selfAssessment.question2OptionsArray[index].optionsValues[position].value],
      selected: [this.selfAssessment.question2OptionsArray[index].optionsValues[position].selected || false]
    });

  }


  //Question 3
  createQuestion3OptionsArray(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question3OptionsArray[index].name],
      value: [this.selfAssessment.question3OptionsArray[index].value],
      selected: [this.selfAssessment.question3OptionsArray[index].selected || false],
      abbrClass: [this.selfAssessment.question3OptionsArray[index].abbrClass],
      optionsValues: this.formBuilder.array([this.createQuestion3OptionsArrayOptionsValues(index, 0), this.createQuestion3OptionsArrayOptionsValues(index, 1), this.createQuestion3OptionsArrayOptionsValues(index, 2)])
    });

  }

  //Question 4
  createQuestion4OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question4OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 3
  createQuestion5OptionsArray(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question5OptionsArray[index].name],
      value: [this.selfAssessment.question5OptionsArray[index].value],
      selected: [this.selfAssessment.question5OptionsArray[index].selected || false],
      abbrClass: [this.selfAssessment.question5OptionsArray[index].abbrClass],
      imageName: [this.selfAssessment.question5OptionsArray[index].imageName],
      tooltipText: [this.selfAssessment.question5OptionsArray[index].tooltipText],
      optionsValues: this.formBuilder.array([this.createQuestion5OptionsArrayOptionsValues(index, 0), this.createQuestion5OptionsArrayOptionsValues(index, 1), this.createQuestion5OptionsArrayOptionsValues(index, 2)])
    });

  }

  //Question 6
  createQuestion6OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question6OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 7
  createQuestion7OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question7OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 8
  createQuestion8OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question8OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 9
  createQuestion9OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question9OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }
  //Question 10
  createQuestion10OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question10OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 10
  createQuestion11OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question11OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 12
  createQuestion12OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question12OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 13
  createQuestion13OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question13OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 14
  createQuestion14OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question14OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 15
  createQuestion15OptionsArray(index): FormGroup {
    const control = this.selfAssessment.question15OptionsArray[index];
    return this.formBuilder.group({
      name: [control.name],
      value: [control.value],
      selected: [control.selected || false],
      imageName: [control.imageName],
      tooltipText: [control.tooltipText],

    });

  }

  //Question 2
  createQuestion16OptionsArray(index): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question16OptionsArray[index].name],
      value: [this.selfAssessment.question16OptionsArray[index].value],
      selected: [this.selfAssessment.question16OptionsArray[index].selected || false],
      abbrClass: [this.selfAssessment.question16OptionsArray[index].abbrClass],
      optionsValues: this.formBuilder.array([this.createQuestion16OptionsArrayOptionsValues(index, 0), this.createQuestion16OptionsArrayOptionsValues(index, 1), this.createQuestion16OptionsArrayOptionsValues(index, 2)])
    });

  }

  createQuestion16OptionsArrayOptionsValues(index, position): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question16OptionsArray[index].optionsValues[position].name],
      value: [this.selfAssessment.question16OptionsArray[index].optionsValues[position].value],
      selected: [this.selfAssessment.question16OptionsArray[index].optionsValues[position].selected || false]
    });

  }





  createQuestion3OptionsArrayOptionsValues(index, position): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question3OptionsArray[index].optionsValues[position].name],
      value: [this.selfAssessment.question3OptionsArray[index].optionsValues[position].value],
      selected: [this.selfAssessment.question3OptionsArray[index].optionsValues[position].selected || false]
    });

  }




  createQuestion5OptionsArrayOptionsValues(index, position): FormGroup {
    return this.formBuilder.group({
      name: [this.selfAssessment.question5OptionsArray[index].optionsValues[position].name],
      value: [this.selfAssessment.question5OptionsArray[index].optionsValues[position].value],
      selected: [this.selfAssessment.question5OptionsArray[index].optionsValues[position].selected || false]
    });

  }





  get question1OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question1OptionsArray') as FormArray;
  }

  get question1Options3ArrayFormGroup() {
    return this.selfAssessmentForm.get('question1Options3Array') as FormArray;
  }

  get question2OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question2OptionsArray') as FormArray;
  }

  get question3OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question3OptionsArray') as FormArray;
  }

  get question4OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question4OptionsArray') as FormArray;
  }

  get question5OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question5OptionsArray') as FormArray;
  }
  get question6OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question6OptionsArray') as FormArray;
  }
  get question7OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question7OptionsArray') as FormArray;
  }
  get question8OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question8OptionsArray') as FormArray;
  }
  get question9OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question9OptionsArray') as FormArray;
  }
  get question10OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question10OptionsArray') as FormArray;
  }
  get question11OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question11OptionsArray') as FormArray;
  }
  get question12OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question12OptionsArray') as FormArray;
  }
  get question13OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question13OptionsArray') as FormArray;
  }
  get question14OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question14OptionsArray') as FormArray;
  }
  get question15OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question15OptionsArray') as FormArray;
  }
  get question16OptionsArrayFormGroup() {
    return this.selfAssessmentForm.get('question16OptionsArray') as FormArray;
  }

  // get the formgroup under contacts form array
  getQuestion1Options3ArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question1Options3ArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }

  // get the formgroup under question1OptionsArrayFormGroup form array
  getQuestion1OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question1OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }

  getQuestion2OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question2OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion2OptionsArrayOptionsValuesFormGroup(index, position): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.selfAssessment.question5OptionsArray[index].optionsValues[position] as FormGroup;
    return formGroup;
  }


  getQuestion3OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question3OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion4OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question4OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion5OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question5OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion6OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question6OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion7OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question7OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion8OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question8OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion9OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question9OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion10OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question10OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion11OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question11OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion12OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question12OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion13OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question13OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion14OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question14OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }
  getQuestion15OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question15OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }

  getQuestion16OptionsArrayFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.question16OptionsArrayFormGroup.controls[index] as FormGroup;
    return formGroup;
  }

  // Events changeQuestion1OptionsArrayFormGroup form array
  question1ValidationSuccess: boolean = false;
  changeQuestion1OptionsArrayFormGroup(index) {

    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question1OptionsArray.length; ii++) {
      const formGroup = this.question1OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        formGroup.value.selected = true;
        this.question1ValidationSuccess = true;
      }
      else
        formGroup.value.selected = false;
      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }
    if (index == 2)
      this.question1Options3ArrayDivSelected = true;
    else
      this.question1Options3ArrayDivSelected = false;
  }

  // Events changeQuestion1OptionsArrayFormGroup form array
  question2ValidationSuccess: boolean = false;
  question2OptionsValidationSuccess: boolean = false;
  changeQuestion2OptionsArrayFormGroup(index, event) {
    this.question2ValidationSuccess = false;
    this.question2OptionsValidationSuccess = false;
    for (let ii = 0; ii < this.selfAssessment.question2OptionsArray.length; ii++) {
      const formGroup = this.question2OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          //this.question2ValidationSuccess = true;
        }
        
          
        
      }
      
      if(formGroup.value.selected){
      const formControl2 = this.getQuestion2OptionsArrayFormGroup(ii).controls['optionsValues'] as FormGroup;
     
      Object.keys(formControl2.controls).forEach(key => {
        
        if (formControl2.get(key).value['selected'] == true) {
          isChildControlSelected = true;
          this.question2ValidationSuccess = true;;
          console.log(ii+" Inside else formControl.get(key).value['name']" + formControl2.get(key).value['name']);
        }
        
      });
    }
      
      

      const baseFormControl = this.getQuestion2OptionsArrayFormGroup(index) as FormGroup;
      const formControl = this.getQuestion2OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
      var isChildControlSelected = false;
      Object.keys(formControl.controls).forEach(key => {
        if (formControl.get(key).value['selected'] == true) {
          isChildControlSelected = true;
          this.question2OptionsValidationSuccess = true;;
          console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
        }
      });

      console.log(index + " " + event.target.checked + " " + isChildControlSelected);
      //a obtion selected
      if (index == 0) {
        if (event.target.checked && isChildControlSelected) {
         // console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForAOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo2ForAOptionsDivSectionToDisplay = false;
        }

      }

      //b option selected
      if (index == 1) {
        if (event.target.checked && isChildControlSelected) {
         // console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForBOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo2ForBOptionsDivSectionToDisplay = false;
        }

      }

      //c option selected
      if (index == 2) {
        if (event.target.checked && isChildControlSelected) {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForCOptionsDivSectionToDisplay = true;
        }
        else {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo2ForCOptionsDivSectionToDisplay = false;
        }

      }

      //d option
      if (index == 3) {
        if (event.target.checked && isChildControlSelected) {
         // console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForDOptionsDivSectionToDisplay = true;
        }
        else {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo2ForDOptionsDivSectionToDisplay = false;
        }

      }

      //e option
      //this option is used to display report for Mobile
      if (index == 4) {
        if (event.target.checked && isChildControlSelected) {
         // console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForEOptionsDivSectionToDisplay = true;
         //console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
        }
        else {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo2ForEOptionsDivSectionToDisplay = false;
         // console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
        }

      }


      //f option
      //this option is used to display report for Paper documents and pen
      if (index == 5) {
        if (event.target.checked && isChildControlSelected) {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo2ForFOptionsDivSectionToDisplay = true;
         // console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
        }
        else {
          //console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo2ForFOptionsDivSectionToDisplay = false;
          //console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
        }

      }

      //If option (b) , (c) or (d) is selected, show question 11 about display height. 
      //If (a) or (d) is selected, show question 10 about laptop. 
      //If (c) or (d)  is selected, show question 12 about screens arrangement.
      //console.log(this.questionNo2ForAOptionsDivSectionToDisplay + " " + this.questionNo2ForBOptionsDivSectionToDisplay + " " + this.questionNo2ForCOptionsDivSectionToDisplay + " " + this.questionNo2ForDOptionsDivSectionToDisplay + " " + this.questionNo2ForEOptionsDivSectionToDisplay);
      if (this.questionNo2ForAOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
        this.question10ToDisplay = true;
      }
      else {
        this.question10ToDisplay = false;
      }
      if (this.questionNo2ForBOptionsDivSectionToDisplay || this.questionNo2ForCOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
        this.question11ToDisplay = true;
      }
      else {
        this.question11ToDisplay = false;
      }
      if (this.questionNo2ForCOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
        this.question12ToDisplay = true;
      }
      else {
        this.question12ToDisplay = false;
      }


      //console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }
  }

  changeQuestion2OptionsArrayOptionsArrayFormGroup(index, position, controlname) {
    this.question2OptionsValidationSuccess = false;
    const baseFormControl = this.getQuestion2OptionsArrayFormGroup(index) as FormGroup;
    const formControl = this.getQuestion2OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    var isChildControlSelected = false;
    Object.keys(formControl.controls).forEach(key => {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && formControl.get(key).value['name'] == controlname) {
        formControl.get(key).value['selected'] = true;
        isChildControlSelected = true;
        this.question2ValidationSuccess = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
      }       
      else {
        formControl.get(key).value['selected'] = false;
      }


     
      
    });




    //a obtion selected
    if (index == 0) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForAOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo2ForAOptionsDivSectionToDisplay = false;
      }

    }

    //b option selected
    if (index == 1) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForBOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo2ForBOptionsDivSectionToDisplay = false;
      }

    }

    //c option selected
    if (index == 2) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForCOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo2ForCOptionsDivSectionToDisplay = false;
      }

    }

    //d option
    if (index == 3) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForDOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo2ForDOptionsDivSectionToDisplay = false;
      }

    }





    //d option
    if (index == 4) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
      }
      else {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo2ForEOptionsDivSectionToDisplay = false;
        console.log("questionNo2ForEOptionsDivSectionToDisplay=" + this.questionNo2ForEOptionsDivSectionToDisplay);
      }

    }

    //f option
    if (index == 5) {
      if (this.question2OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo2ForFOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question2OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo2ForFOptionsDivSectionToDisplay = false;
      }

    }


    //If option (b) , (c) or (d) is selected, show question 11 about display height. 
    //If (a) or (d) is selected, show question 10 about laptop. 
    //If (c) or (d)  is selected, show question 12 about screens arrangement.

    if (this.questionNo2ForAOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
      this.question10ToDisplay = true;
    }
    else {
      this.question10ToDisplay = false;
    }
    if (this.questionNo2ForBOptionsDivSectionToDisplay || this.questionNo2ForCOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
      this.question11ToDisplay = true;
    }
    else {
      this.question11ToDisplay = false;
    }
    if (this.questionNo2ForCOptionsDivSectionToDisplay || this.questionNo2ForDOptionsDivSectionToDisplay) {
      this.question12ToDisplay = true;
    }
    else {
      this.question12ToDisplay = false;
    }

    //vilas

  }

  getQuestion3OptionsArrayOptionValuesFormGroup(index) {

  }


  question3OptionsValidationSuccess = true;
  changeQuestion3OptionsArrayOptionsArrayFormGroup(index, position, event) {
    const controlname=event.target.value;
    this.question3OptionsValidationSuccess = false;
    this.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay = false;
    this.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay = false;

    this.questionNo3ForDOptionsDivSectionToDisplay=false;
    this.questionNo3ForEOptionsDivSectionToDisplay=false;
    this.questionNo3ForFOptionsDivSectionToDisplay=false;
    const baseFormControl = this.getQuestion3OptionsArrayFormGroup(index) as FormGroup;
    const formControl = this.getQuestion3OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    var isChildControlSelected = false;

    for(let ii=0;ii<6;ii++){
      if (this.createQuestion3OptionsArrayOptionsValues(index,ii).value.name== controlname)
      {
        this.createQuestion3OptionsArrayOptionsValues(index,ii).value['selected'] = true;
        isChildControlSelected = true;
        this.question3OptionsValidationSuccess = true;
      }
      else
      {
        this.createQuestion3OptionsArrayOptionsValues(index,ii).value['selected'] = false;
      }

    }



    


console.log("Index="+index+" controlname="+controlname+" "+isChildControlSelected);

    //a obtion selected
    if (index == 0) {
      if (this.question3OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo3ForAOptionsDivSectionToDisplay = true;
        if (isChildControlSelected && (controlname == 'option314')) {
          this.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay = true;
          this.questionNo3ForDOptionsDivSectionToDisplay=true;

        }
        else if (isChildControlSelected && (controlname == 'option315')) {
          this.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay = true;
          this.questionNo3ForEOptionsDivSectionToDisplay=true;

        }
        else if (isChildControlSelected && (controlname == 'option316')) {
          this.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay = true;
          this.questionNo3ForFOptionsDivSectionToDisplay=true;

        }
      }
      else {
        this.questionNo3ForAOptionsDivSectionToDisplay = false;
      }

    }

    //b option selected
    if (index == 1) {
      if (this.question3OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo3ForBOptionsDivSectionToDisplay = true;
        if (isChildControlSelected && (controlname == 'option324')) {
          this.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay = true;
          this.questionNo3ForDOptionsDivSectionToDisplay=true;

        }
        if (isChildControlSelected && (controlname == 'option325')) {
          this.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay = true;
          this.questionNo3ForEOptionsDivSectionToDisplay=true;

        }
        if (isChildControlSelected && (controlname == 'option326')) {
          this.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay = true;
          this.questionNo3ForFOptionsDivSectionToDisplay=true;

        }
      }
      else {
        console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo3ForBOptionsDivSectionToDisplay = false;
      }

    }

    //c option selected
    if (index == 2) {
      if (this.question3OptionsArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo3ForCOptionsDivSectionToDisplay = true;
        if (isChildControlSelected && (controlname == 'option334')) {
          this.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay = true;
          this.questionNo3ForDOptionsDivSectionToDisplay=true;

        }
        if (isChildControlSelected && (controlname == 'option335')) {
          this.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay = true;
          this.questionNo3ForEOptionsDivSectionToDisplay=true;

        }
        if (isChildControlSelected && (controlname == 'option336')) {
          this.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay = true;
          this.questionNo3ForFOptionsDivSectionToDisplay=true;

        }
      }
      else {
        console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo3ForCOptionsDivSectionToDisplay = false;
      }

    }





  }

  // Events changeQuestion1OptionsArrayFormGroup form array
  // Events changeQuestion1OptionsArrayFormGroup form array
  question3ValidationSuccess: boolean = false;
  changeQuestion3OptionsArrayFormGroup(index, event) {
    this.question3ValidationSuccess = false;
    for (let ii = 0; ii < this.selfAssessment.question3OptionsArray.length; ii++) {
      const formGroup = this.question3OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          this.question3ValidationSuccess = true;
        }
        else {
          formGroup.value.selected = false;
        }
      }


      const baseFormControl = this.getQuestion3OptionsArrayFormGroup(index) as FormGroup;
      const formControl = this.getQuestion3OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
      var isChildControlSelected = false;
      Object.keys(formControl.controls).forEach(key => {
        if (formControl.get(key).value['selected'] == true) {
          isChildControlSelected = true;
          console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
        }
      });

      console.log(index + " " + event.target.checked + " " + isChildControlSelected);
      //a obtion selected
      if (index == 0) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo3ForAOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo3ForAOptionsDivSectionToDisplay = false;
        }

      }

      //b option selected
      if (index == 1) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo3ForBOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo3ForBOptionsDivSectionToDisplay = false;
        }

      }

      //c option selected
      if (index == 2) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo3ForCOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question3OptionsArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo3ForCOptionsDivSectionToDisplay = false;
        }

      }




      //console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }
  }





  /*changeQuestion3OptionsArrayOptionsArrayFormGroup(index, position, event: Event) {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formControl = this.getQuestion3OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    Object.keys(formControl.controls).forEach(key => {
      if (formControl.get(key).value['name'] == (<HTMLInputElement>event.target).value) {
        formControl.get(key).value['selected'] = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
      } else {
        formControl.get(key).value['selected'] = false;
      }
    });
  }*/

  // Events changeQuestion1OptionsArrayFormGroup form array
  question4ValidationSuccess: boolean = false;
  changeQuestion4OptionsArrayFormGroup(index) {
    this.questionNo4ForAOptionsDivSectionToDisplay = false;
    this.questionNo4ForBOptionsDivSectionToDisplay = false;
    this.questionNo4ForCOptionsDivSectionToDisplay = false;


    // this.contactList = this.form.get('contacts') as FormArray;
    this.question4ValidationSuccess = false;
    for (let ii = 0; ii < this.selfAssessment.question4OptionsArray.length; ii++) {
      const formGroup = this.question4OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        formGroup.value.selected = true;
        this.question4ValidationSuccess = true;
      }
      else
        formGroup.value.selected = false;
      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }
    if (index == 0) {
      this.questionNo4ForAOptionsDivSectionToDisplay = true;


    }
    if (index == 1) {
      this.questionNo4ForBOptionsDivSectionToDisplay = true;


    }
    if (index == 2) {
      this.questionNo4ForCOptionsDivSectionToDisplay = true;
    }


  }


  question5OptionValidationSuccess: boolean = false;
  changeQuestion5OptionsArrayOptionsArrayFormGroup(index, position, event: Event) {
    this.questionNo5ForAOptionsDivSectionToDisplay = false;
    this.questionNo5ForBOptionsDivSectionToDisplay = false;
    this.questionNo5ForCOptionsDivSectionToDisplay = false;
    this.question5OptionValidationSuccess = false;
    this.question9ToDisplay = false;
    this.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    const formControl = this.getQuestion5OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    Object.keys(formControl.controls).forEach(key => {
      var targetElementName = (<HTMLInputElement>event.target).value;
      if (formControl.get(key).value['name'] == targetElementName) {
        formControl.get(key).value['selected'] = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
        this.question5OptionValidationSuccess = true;
        console.log("targetElementName= " + targetElementName)
        if (targetElementName == 'option513' || targetElementName == 'option523') {
          this.question9ToDisplay = true;
        }

        if (targetElementName == 'option511' || targetElementName == 'option521') {
          if (targetElementName == 'option511')
            this.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay = true;
          if (targetElementName == 'option521')
            this.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay = true;
        }
        else if (targetElementName == 'option512' || targetElementName == 'option522') {
          if (targetElementName == 'option512')
            this.questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay = true;
          if (targetElementName == 'option522')
            this.questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay = true;
        }
        else if (targetElementName == 'option513' || targetElementName == 'option523') {
          if (targetElementName == 'option513')
            this.questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay = true;
          if (targetElementName == 'option523')
            this.questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay = true;
        }

      } else {
        formControl.get(key).value['selected'] = false;
      }
    });

    if (index == 0) {
      this.questionNo5ForAOptionsDivSectionToDisplay = true;
    }
    if (index == 1) {
      this.questionNo5ForBOptionsDivSectionToDisplay = true;
    }
    if (index == 2) {
      this.questionNo5ForCOptionsDivSectionToDisplay = true;
    }
  }

  // Events changeQuestion1OptionsArrayFormGroup form array
  question5ValidationSuccess: boolean = false;
  changeQuestion5OptionsArrayFormGroup(index) {
    this.questionNo5ForAOptionsDivSectionToDisplay = false;
    this.questionNo5ForBOptionsDivSectionToDisplay = false;
    this.questionNo5ForCOptionsDivSectionToDisplay = false;
    this.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay = false;
    this.questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    this.question5ValidationSuccess = false;
    for (let ii = 0; ii < this.selfAssessment.question5OptionsArray.length; ii++) {
      const formGroup = this.question5OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        formGroup.value.selected = true;
        this.question5ValidationSuccess = true;
      }
      else
        formGroup.value.selected = false;
      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }

    if (index == 0) {
      this.questionNo5ForAOptionsDivSectionToDisplay = true;
      this.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay = true;
    }
    if (index == 1) {
      this.questionNo5ForBOptionsDivSectionToDisplay = true;
      this.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay = true;

    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array
  question6ValidationSuccess: boolean = false;
  changeQuestion6OptionsArrayFormGroup(index, event) {
    this.question6ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question6OptionsArray.length; ii++) {
      const formGroup = this.question6OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo6ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo6ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo6ForCOptionsDivSectionToDisplay = true;
          if (index == 3)
            this.questionNo6ForDOptionsDivSectionToDisplay = true;
          if (index == 4)
            this.questionNo6ForEOptionsDivSectionToDisplay = true;


        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo6ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo6ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo6ForCOptionsDivSectionToDisplay = false;
          if (index == 3)
            this.questionNo6ForDOptionsDivSectionToDisplay = false;
          if (index == 4)
            this.questionNo6ForEOptionsDivSectionToDisplay = false;
        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question6ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }

  question7ValidationSuccess: boolean = false;
  changeQuestion7OptionsArrayFormGroup(index, event) {
    this.question7ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question7OptionsArray.length; ii++) {
      const formGroup = this.question7OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo7ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo7ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo7ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo7ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo7ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo7ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question7ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question8ValidationSuccess: boolean = false;
  changeQuestion8OptionsArrayFormGroup(index, event) {
    this.question8ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question8OptionsArray.length; ii++) {
      const formGroup = this.question8OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo8ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo8ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo8ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo8ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo8ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo8ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question8ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question9ValidationSuccess: boolean = false;
  changeQuestion9OptionsArrayFormGroup(index, event) {
    this.question9ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question9OptionsArray.length; ii++) {
      const formGroup = this.question9OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo9ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo9ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo9ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo9ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo9ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo9ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question9ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question10ValidationSuccess: boolean = false;
  changeQuestion10OptionsArrayFormGroup(index, event) {
    this.question10ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question10OptionsArray.length; ii++) {
      const formGroup = this.question10OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo10ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo10ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo10ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo10ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo10ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo10ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question10ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }

  // Events changeQuestion1OptionsArrayFormGroup form array

  question11ValidationSuccess: boolean = false;
  changeQuestion11OptionsArrayFormGroup(index, event) {
    this.question11ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question11OptionsArray.length; ii++) {
      const formGroup = this.question11OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo11ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo11ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo11ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo11ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo11ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo11ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question11ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question12ValidationSuccess: boolean = false;
  changeQuestion12OptionsArrayFormGroup(index, event) {
    this.questionNo12ForAOptionsDivSectionToDisplay = false;
    this.questionNo12ForBOptionsDivSectionToDisplay = false;
    this.questionNo12ForCOptionsDivSectionToDisplay = false;
    this.question12ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question12OptionsArray.length; ii++) {
      const formGroup = this.question12OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo12ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo12ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo12ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo12ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo12ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo12ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question12ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question13ValidationSuccess: boolean = false;
  changeQuestion13OptionsArrayFormGroup(index, event) {
    this.question13ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question13OptionsArray.length; ii++) {
      const formGroup = this.question13OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo13ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo13ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo13ForCOptionsDivSectionToDisplay = true;
          if (index == 3)
            this.questionNo13ForDOptionsDivSectionToDisplay = true;
          if (index == 4)
            this.questionNo13ForEOptionsDivSectionToDisplay = true;




        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo13ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo13ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo13ForCOptionsDivSectionToDisplay = false;
          if (index == 3)
            this.questionNo13ForDOptionsDivSectionToDisplay = false;
          if (index == 4)
            this.questionNo13ForEOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question13ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }
  // Events changeQuestion1OptionsArrayFormGroup form array

  question14ValidationSuccess: boolean = false;
  changeQuestion14OptionsArrayFormGroup(index, event) {
    this.question14ValidationSuccess = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question14OptionsArray.length; ii++) {
      const formGroup = this.question14OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo14ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo14ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo14ForCOptionsDivSectionToDisplay = true;
          if (index == 3)
            this.questionNo14ForDOptionsDivSectionToDisplay = true;
            


        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo14ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo14ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo14ForCOptionsDivSectionToDisplay = false;
          if (index == 3)
            this.questionNo14ForDOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question14ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }


  // Events changeQuestion1OptionsArrayFormGroup form array
  question1OptionsValidationSuccess: boolean = false;
  changeQuestion1Options3ArrayFormGroup(index, event) {
    this.question1OptionsValidationSuccess = false;
    for (let ii = 0; ii < this.selfAssessment.question1Options3Array.length; ii++) {
      const formGroup = this.question1Options3ArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          this.question1OptionsValidationSuccess = true;
        }
        else {
          formGroup.value.selected = false;
        }
      }


      const baseFormControl = this.getQuestion1Options3ArrayFormGroup(index) as FormGroup;
      const formControl = this.getQuestion1Options3ArrayFormGroup(index).controls['optionsValues'] as FormGroup;
      var isChildControlSelected = false;
      Object.keys(formControl.controls).forEach(key => {
        if (formControl.get(key).value['selected'] == true) {
          isChildControlSelected = true;
          console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
        }
      });

      console.log(index + " " + event.target.checked + " " + isChildControlSelected);
      //a obtion selected
      if (index == 0) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo1ForAOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForAOptionsDivSectionToDisplay = false;
        }

      }

      //b option selected
      if (index == 1) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo1ForBOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo1ForBOptionsDivSectionToDisplay = false;
        }

      }

      //c option selected
      if (index == 2) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo1ForCOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo1ForCOptionsDivSectionToDisplay = false;
        }

      }

      //d option
      if (index == 3) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo1ForDOptionsDivSectionToDisplay = true;
        }
        else {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo1ForDOptionsDivSectionToDisplay = false;
        }

      }

      //e option
      //this option is used to display report for Mobile
      if (index == 4) {
        if (event.target.checked && isChildControlSelected) {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
          this.questionNo1ForEOptionsDivSectionToDisplay = true;
          console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
        }
        else {
          console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
          this.questionNo1ForEOptionsDivSectionToDisplay = false;
          console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
        }

      }


      //f option
      //this option is used to display report for Paper documents and pen
      if (index == 5) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForFOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForFOptionsDivSectionToDisplay = false;
        }

      }

      //g option
      //this option is used to display report for Paper documents and pen
      if (index == 6) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForGOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForGOptionsDivSectionToDisplay = false;
        }

      }

      //h option
      //this option is used to display report for Paper documents and pen
      if (index == 7) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForHOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForHOptionsDivSectionToDisplay = false;
        }

      }

      //i option
      //this option is used to display report for Paper documents and pen
      if (index == 8) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForIOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForIOptionsDivSectionToDisplay = false;
        }

      }

      //j option
      //this option is used to display report for Paper documents and pen
      if (index == 9) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForJOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForJOptionsDivSectionToDisplay = false;
        }

      }

      //k option
      //this option is used to display report for Paper documents and pen
      if (index == 10) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForKOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForKOptionsDivSectionToDisplay = false;
        }

      }

      //l option
      //this option is used to display report for Paper documents and pen
      if (index == 11) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForLOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForLOptionsDivSectionToDisplay = false;
        }

      }

      //m option
      //this option is used to display report for Paper documents and pen
      if (index == 12) {
        if (event.target.checked && isChildControlSelected) {
          this.questionNo1ForMOptionsDivSectionToDisplay = true;
        }
        else {
          this.questionNo1ForMOptionsDivSectionToDisplay = false;
        }

      }







      //console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }
  }


  question1Options3ValidationSuccess: boolean = false;
  changeQuestion1Options3ArrayOptionsArrayFormGroup(index, position, controlname) {
    this.question1Options3ValidationSuccess = false;
    const baseFormControl = this.getQuestion1Options3ArrayFormGroup(index) as FormGroup;
    const formControl = this.getQuestion1Options3ArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    var isChildControlSelected = false;
    Object.keys(formControl.controls).forEach(key => {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && formControl.get(key).value['name'] == controlname) {
        formControl.get(key).value['selected'] = true;
        isChildControlSelected = true;
        this.question1Options3ValidationSuccess = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
      } else {
        formControl.get(key).value['selected'] = false;
      }



    });




    //a obtion selected
    if (index == 0) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForAOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForAOptionsDivSectionToDisplay = false;
      }

    }

    //b option selected
    if (index == 1) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForBOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForBOptionsDivSectionToDisplay = false;
      }

    }

    //c option selected
    if (index == 2) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForCOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForCOptionsDivSectionToDisplay = false;
      }

    }

    //d option
    if (index == 3) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForDOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForDOptionsDivSectionToDisplay = false;
      }

    }





    //d option
    if (index == 4) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForEOptionsDivSectionToDisplay = false;
        console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
      }


    }



    //f option
    if (index == 5) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForFOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForFOptionsDivSectionToDisplay = false;
      }

    }

    //G option
    if (index == 6) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForGOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForGOptionsDivSectionToDisplay = false;
      }

    }
    //h option
    if (index == 7) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForHOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForHOptionsDivSectionToDisplay = false;
      }

    }
    //i option
    if (index == 8) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForIOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForIOptionsDivSectionToDisplay = false;
      }

    }
    //j option
    if (index == 9) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForJOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForJOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 10) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForKOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForKOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 11) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForLOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForLOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 12) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForMOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForMOptionsDivSectionToDisplay = false;
      }

    }





    //vilas

  }


  changeQuestion1Options3ArrayOptionsArrayFormGroupForTextBox(index, position, controlname, v) {
    this.question1Options3ValidationSuccess = false;
    console.log("Value=" + v);
    const baseFormControl = this.getQuestion1Options3ArrayFormGroup(index) as FormGroup;
    const formControl = this.getQuestion1Options3ArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    var isChildControlSelected = false;
    Object.keys(formControl.controls).forEach(key => {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && formControl.get(key).value['name'] == controlname) {
        formControl.get(key).value['selected'] = true;
        formControl.get(key).value['value'] = v;
        isChildControlSelected = true;
        this.question1Options3ValidationSuccess = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected'] + " " + formControl.get(key).value['value']);
      } else {
        formControl.get(key).value['selected'] = false;
      }



    });




    //a obtion selected
    if (index == 0) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForAOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForAOptionsDivSectionToDisplay = false;
      }

    }

    //b option selected
    if (index == 1) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForBOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForBOptionsDivSectionToDisplay = false;
      }

    }

    //c option selected
    if (index == 2) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForCOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForCOptionsDivSectionToDisplay = false;
      }

    }

    //d option
    if (index == 3) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForDOptionsDivSectionToDisplay = true;
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForDOptionsDivSectionToDisplay = false;
      }

    }





    //d option
    if (index == 4) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Selected");
        this.questionNo1ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
      }
      else {
        console.log(this.question1Options3ArrayFormGroup.controls[index].value.name + " Not Selected");
        this.questionNo1ForEOptionsDivSectionToDisplay = false;
        console.log("questionNo1ForEOptionsDivSectionToDisplay=" + this.questionNo1ForEOptionsDivSectionToDisplay);
      }


    }



    //f option
    if (index == 5) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForFOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForFOptionsDivSectionToDisplay = false;
      }

    }

    //G option
    if (index == 6) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForGOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForGOptionsDivSectionToDisplay = false;
      }

    }
    //h option
    if (index == 7) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForHOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForHOptionsDivSectionToDisplay = false;
      }

    }
    //i option
    if (index == 8) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForIOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForIOptionsDivSectionToDisplay = false;
      }

    }
    //j option
    if (index == 9) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForJOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForJOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 10) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForKOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForKOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 11) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForLOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForLOptionsDivSectionToDisplay = false;
      }

    }
    //f option
    if (index == 12) {
      if (this.question1Options3ArrayFormGroup.controls[index].value.selected && isChildControlSelected) {
        this.questionNo1ForMOptionsDivSectionToDisplay = true;
      }
      else {
        this.questionNo1ForMOptionsDivSectionToDisplay = false;
      }

    }





    //vilas

  }



  // Events changeQuestion1OptionsArrayFormGroup form array

  question15ValidationSuccess: boolean = false;
  changeQuestion15OptionsArrayFormGroup(index, event) {
    this.question15ValidationSuccess = false;
    this.questionNo15ForAOptionsDivSectionToDisplay = false;
    this.questionNo15ForBOptionsDivSectionToDisplay = false;
    // this.contactList = this.form.get('contacts') as FormArray;
    for (let ii = 0; ii < this.selfAssessment.question15OptionsArray.length; ii++) {
      const formGroup = this.question15OptionsArrayFormGroup.controls[ii] as FormGroup;
      if (ii == index) {
        if (event.target.checked) {
          formGroup.value.selected = true;
          if (index == 0)
            this.questionNo15ForAOptionsDivSectionToDisplay = true;
          if (index == 1)
            this.questionNo15ForBOptionsDivSectionToDisplay = true;
          if (index == 2)
            this.questionNo15ForCOptionsDivSectionToDisplay = true;



        }
        else {
          formGroup.value.selected = false;
          if (index == 0)
            this.questionNo15ForAOptionsDivSectionToDisplay = false;
          if (index == 1)
            this.questionNo15ForBOptionsDivSectionToDisplay = false;
          if (index == 2)
            this.questionNo15ForCOptionsDivSectionToDisplay = false;

        }
      }
      else { }

      if (formGroup.value.selected) {
        this.question15ValidationSuccess = true;
      }

      console.log(formGroup.value.name + " " + formGroup.value.value + " " + formGroup.value.selected);
    }


  }

  // Events changeQuestion1OptionsArrayFormGroup form array
  question16ValidationSuccess: boolean = false;
  changeQuestion16OptionsArrayFormGroup(index, event) {
    this.question16ValidationSuccess = false;

    this.initializeQuestion16OptionsValue();

    const baseFormControlSitting = this.getQuestion16OptionsArrayFormGroup(0) as FormGroup;
    const baseFormControlStanding = this.getQuestion16OptionsArrayFormGroup(1) as FormGroup;
    const baseFormControlStretching = this.getQuestion16OptionsArrayFormGroup(2) as FormGroup;
    const baseFormControlTakingBreaks = this.getQuestion16OptionsArrayFormGroup(3) as FormGroup;

    if (index == 0) {
      baseFormControlSitting.value.selected = event.target.checked;
      this.question16ValidationSuccess = true;
      
    }
    if (index == 1) {
      baseFormControlStanding.value.selected = event.target.checked;
      this.question16ValidationSuccess = true;
    }
    if (index == 2) {
      baseFormControlStretching.value.selected = event.target.checked;
      this.question16ValidationSuccess = true;
    }
    if (index == 3) {
      baseFormControlTakingBreaks.value.selected = event.target.checked;
      this.question16ValidationSuccess = true;
    }

    //conditions for questionNo16ForFOptionsDivSectionToDisplay
    console.log("baseFormControlSitting.value.selected && baseFormControlStanding.value.selected " + baseFormControlSitting.value.selected + "   " + baseFormControlStanding.value.selected)
    if (baseFormControlSitting.value.selected && baseFormControlStanding.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForFOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForFOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForFOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }

      //Often To Others
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }


      //Usually To Others
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
    }

    else if (baseFormControlStanding.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      if (formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
    }

    else if (baseFormControlSitting.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
    }
    else if (!baseFormControlSitting.value.selected && !baseFormControlStanding.value.selected) {

      this.questionNo16ForCOptionsDivSectionToDisplay = true;
      console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);


    }

    console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

    console.log("baseFormControlStretching.value.selected && baseFormControlTakingBreaks.value.selected " + baseFormControlStretching.value.selected + "   " + baseFormControlTakingBreaks.value.selected)
    if (baseFormControlStretching.value.selected && baseFormControlTakingBreaks.value.selected) {
      const formControlSittingRarely = baseFormControlStretching.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForBOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForABOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForABOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForABOptionsDivSectionToDisplay " + this.questionNo16ForABOptionsDivSectionToDisplay);
      }


      //Often To Others
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForAAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAAOptionsDivSectionToDisplay " + this.questionNo16ForAAOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAOptionsDivSectionToDisplay " + this.questionNo16ForAOptionsDivSectionToDisplay);
      }

    } else if (baseFormControlTakingBreaks.value.selected) {
      //vikas
      if (baseFormControlTakingBreaks.value.selected) {
        const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
        if (formControlStandingRarely.controls[0].value['selected']) {

          this.questionNo16ForBOptionsDivSectionToDisplay = true;
          console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
        }
      }
      else if (baseFormControlTakingBreaks.value.selected) {
        const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
        if (formControlStandingRarely.controls[1].value['selected']) {

          this.questionNo16ForABOptionsDivSectionToDisplay = true;
          console.log("questionNo16ForABOptionsDivSectionToDisplay " + this.questionNo16ForABOptionsDivSectionToDisplay);
        }
      }
    }
    else if (baseFormControlStretching.value.selected) {

      const baseFormControlStretching = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
      if (baseFormControlStretching.controls[0].value['selected']) {

        this.questionNo16ForBOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
      }
      else if (baseFormControlStretching.controls[1].value['selected']) {

        this.questionNo16ForAAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAAOptionsDivSectionToDisplay " + this.questionNo16ForAAOptionsDivSectionToDisplay);
      }


    }


  }


  question16OptionsValidationSuccess: boolean = false;
  changeQuestion16OptionsArrayOptionsArrayFormGroup(index, position, controlname) {
    this.question16OptionsValidationSuccess = false;
    this.initializeQuestion16OptionsValue();

    const baseFormControl = this.getQuestion16OptionsArrayFormGroup(index) as FormGroup;
    const formControl = this.getQuestion16OptionsArrayFormGroup(index).controls['optionsValues'] as FormGroup;
    var isChildControlSelected = false;
    Object.keys(formControl.controls).forEach(key => {
      if (this.question16OptionsArrayFormGroup.controls[index].value.selected && formControl.get(key).value['name'] == controlname) {
        formControl.get(key).value['selected'] = true;
        isChildControlSelected = true;
        this.question16OptionsValidationSuccess = true;
        console.log("formControl.get(key).value['name']" + formControl.get(key).value['selected']);
      } else {
        formControl.get(key).value['selected'] = false;
      }



    });




    const baseFormControlSitting = this.getQuestion16OptionsArrayFormGroup(0) as FormGroup;
    const baseFormControlStanding = this.getQuestion16OptionsArrayFormGroup(1) as FormGroup;
    const baseFormControlStretching = this.getQuestion16OptionsArrayFormGroup(2) as FormGroup;
    const baseFormControlTakingBreaks = this.getQuestion16OptionsArrayFormGroup(3) as FormGroup;

    //conditions for questionNo16ForFOptionsDivSectionToDisplay
    console.log("baseFormControlSitting.value.selected && baseFormControlStanding.value.selected " + baseFormControlSitting.value.selected + "   " + baseFormControlStanding.value.selected)
    if (baseFormControlSitting.value.selected && baseFormControlStanding.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForFOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForFOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForFOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }

      //Often To Others
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }


      //Usually To Others
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForEOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[2].value['selected'] && formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForEOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForEOptionsDivSectionToDisplay " + this.questionNo16ForEOptionsDivSectionToDisplay);
      }
    }

    else if (baseFormControlStanding.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      if (formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      else if (formControlStandingRarely.controls[2].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
    }

    else if (baseFormControlSitting.value.selected) {
      const formControlSittingRarely = baseFormControlSitting.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlStanding.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForCOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForCOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForFOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForDOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected']) {

        this.questionNo16ForDOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForDOptionsDivSectionToDisplay " + this.questionNo16ForDOptionsDivSectionToDisplay);
      }
    }
    else if (!baseFormControlSitting.value.selected && !baseFormControlStanding.value.selected) {

      this.questionNo16ForCOptionsDivSectionToDisplay = true;
      console.log("questionNo16ForCOptionsDivSectionToDisplay " + this.questionNo16ForCOptionsDivSectionToDisplay);


    }

    console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

    console.log("baseFormControlStretching.value.selected && baseFormControlTakingBreaks.value.selected " + baseFormControlStretching.value.selected + "   " + baseFormControlTakingBreaks.value.selected)
    if (baseFormControlStretching.value.selected && baseFormControlTakingBreaks.value.selected) {
      const formControlSittingRarely = baseFormControlStretching.controls['optionsValues'] as FormGroup;
      const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
      console.log("formControlSittingRarely.get('selected') && formControlStandingRarely.get('selected') " + (formControlSittingRarely.controls[0].value['selected']) + "" + formControlStandingRarely.controls[0].value['selected']);

      //Rarely To Others
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForBOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForABOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[0].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForABOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForABOptionsDivSectionToDisplay " + this.questionNo16ForABOptionsDivSectionToDisplay);
      }


      //Often To Others
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[0].value['selected']) {

        this.questionNo16ForAAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAAOptionsDivSectionToDisplay " + this.questionNo16ForAAOptionsDivSectionToDisplay);
      }
      //consdition for questionNo16ForBOptionsDivSectionToDisplay selected
      else if (formControlSittingRarely.controls[1].value['selected'] && formControlStandingRarely.controls[1].value['selected']) {

        this.questionNo16ForAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAOptionsDivSectionToDisplay " + this.questionNo16ForAOptionsDivSectionToDisplay);
      }

    } else if (baseFormControlTakingBreaks.value.selected) {
      //vikas
      if (baseFormControlTakingBreaks.value.selected) {
        const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
        if (formControlStandingRarely.controls[0].value['selected']) {

          this.questionNo16ForBOptionsDivSectionToDisplay = true;
          console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
        }
      }
      else if (baseFormControlTakingBreaks.value.selected) {
        const formControlStandingRarely = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
        if (formControlStandingRarely.controls[1].value['selected']) {

          this.questionNo16ForABOptionsDivSectionToDisplay = true;
          console.log("questionNo16ForABOptionsDivSectionToDisplay " + this.questionNo16ForABOptionsDivSectionToDisplay);
        }
      }
    }
    else if (baseFormControlStretching.value.selected) {

      const baseFormControlStretching = baseFormControlTakingBreaks.controls['optionsValues'] as FormGroup;
      if (baseFormControlStretching.controls[0].value['selected']) {

        this.questionNo16ForBOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForBOptionsDivSectionToDisplay " + this.questionNo16ForBOptionsDivSectionToDisplay);
      }
      else if (baseFormControlStretching.controls[1].value['selected']) {

        this.questionNo16ForAAOptionsDivSectionToDisplay = true;
        console.log("questionNo16ForAAOptionsDivSectionToDisplay " + this.questionNo16ForAAOptionsDivSectionToDisplay);
      }


    }


    //vilas

  }





  onSubmit() {
    console.log(this.selfAssessmentForm.value);
  }


  makePdf() {


    /*doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });*/

    this.isDownloading = true;

    var HTML_Width = this.content.nativeElement.offsetWidth;
    var HTML_Height = this.content.nativeElement.offsetHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    console.log(HTML_Width + " " + HTML_Height);

    html2canvas(this.content.nativeElement).then((canvas) => {



      canvas.getContext('2d');

      console.log(canvas.height + "  " + canvas.width);


      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height)+(top_left_margin*4),canvas_image_width,canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      pdf.save(Date.now().toString() + ".pdf");

      //Generate BLOB object
      var blob = pdf.output("blob");

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

      //Getting URL of blob object
      var blobURL = URL.createObjectURL(blob);

      console.log("blobURL===" + this.fileUrl);
      //pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');

      this.isDownloading = false;
      /*canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = URL.createObjectURL(blob);
        link.click();

        // To save manually somewhere in file explorer
        window.open(blob, 'image.png');
      }, 'image/png');*/

    });

  }


  printPdf() {


    /*doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });*/

    var HTML_Width = this.content.nativeElement.offsetWidth;
    var HTML_Height = this.content.nativeElement.offsetHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    console.log(HTML_Width + " " + HTML_Height);

    html2canvas(this.content.nativeElement).then((canvas) => {



      canvas.getContext('2d');

      console.log(canvas.height + "  " + canvas.width);


      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height)+(top_left_margin*4),canvas_image_width,canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      // pdf.save("HTML-Document.pdf");

      //Generate BLOB object
      var blob = pdf.output("blob");

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

      //Getting URL of blob object
      var blobURL = URL.createObjectURL(blob);

      console.log("blobURL===" + this.fileUrl);
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');

    });

  }
  shareReportToEmailMsg: string;
  shareReportToEmail() {
    console.log("Click To Send Email");
    this.shareReportToEmailMsg = "Report link has been sent to " + CustomValidators.maskEmailAddress(this.firebaseUserModel.email, "*");
    var iinfo = new Iinfo();
    iinfo.email = sessionStorage.getItem("userEmail");;
    iinfo.name = this.firebaseUserModel.name;
    console.log("Click To Send Email2");
    iinfo.pdfLink = "http://" + window.location.hostname + ":" + window.location.port + "/showOfficeAssessmentReport/" + this.selfAssessmentOfficeDTO.id;
    console.log("Click To Send Email3");
    this.subscription = this.sendmailservice.sendEmail(iinfo).
      subscribe(data => {
        let msg = data['message']
        this.validationShareReportPopupDisplay = true;
        console.log("Click To Send Email4");
        // console.log(data, "success");
      }, error => {
        console.error(error, "error");
      });
    console.log("Click To Send Email5");

  }
  sharePdf() {


    /*doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });*/

    var HTML_Width = this.content.nativeElement.offsetWidth;
    var HTML_Height = this.content.nativeElement.offsetHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    console.log(HTML_Width + " " + HTML_Height);

    html2canvas(this.content.nativeElement).then((canvas) => {



      canvas.getContext('2d');

      console.log(canvas.height + "  " + canvas.width);


      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      //pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height)+(top_left_margin*4),canvas_image_width,canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      // pdf.save("HTML-Document.pdf");

      //Generate BLOB object
      var blob = pdf.output("blob");

      const filePath = Date.now().toString();
      const fileRef = this.storage.ref('/SynergyProSharedPdf/' + filePath + '.pdf');
      const task = this.storage.upload('/SynergyProSharedPdf/' + filePath + '.pdf', blob);
      //this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();

          this.downloadURL.subscribe(url => {
            this.pdfshareurl = url;
            console.log("this.pdfshareurl=" + this.pdfshareurl);




            var iinfo = new Iinfo();
            iinfo.email = sessionStorage.getItem("userEmail");;
            iinfo.name = this.firebaseUserModel.name;
            iinfo.pdfLink = this.pdfshareurl;
            this.subscription = this.sendmailservice.sendEmail(iinfo).
              subscribe(data => {
                let msg = data['message']
                alert(msg);
                // console.log(data, "success");
              }, error => {
                console.error(error, "error");
              });




          });

        }))
        .subscribe();

      //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

      //Getting URL of blob object
      //var blobURL = URL.createObjectURL(blob);


      //pdf.autoPrint();
      //window.open(pdf.output('bloburl'), '_blank');

    });

  }

  submitForAssestmentFormForContinue() {
    this.isSubmittedForReport = false;
    this.validationPopupDisplay = false;

  }

  submitForReportAssestmentFormForContinue() {
    this.validationShareReportPopupDisplay = false;


  }


  submittedForReport(): void {
    this.isSubmittedForReport = true;
    var count = 0;
    this.isFinalError = false;



    if (!this.question1ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(1);
    }
    else {
      this.question1ValidationSuccess = true;
    }

    if (!this.question2ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(2);
    } else {
      this.question2ValidationSuccess = true;
    }

    if (!this.question3ValidationSuccess) {

      this.validationPopupDisplay = true;
      //this.question3ValidationSuccess = true;
      this.isFinalError = true;
      console.log(3);
    } else {
      this.question3ValidationSuccess = true;
    }

    if (!this.question4ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(4);
    } else {
      this.question4ValidationSuccess = true;
    }

    if (!this.question5ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(5);
    } else {
      this.question5ValidationSuccess = true;
    }

    if (!this.question6ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(6);
    } else {
      this.question6ValidationSuccess = true;
    }

    if (!this.question7ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(7);
    } else {
      this.question7ValidationSuccess = true;
    }

    if (!this.question8ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(8);
    } else {
      this.question8ValidationSuccess = true;
    }

    if (this.question9ToDisplay && !this.question9ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(9);
    } else {
      this.question9ValidationSuccess = true;
    }

    if (this.question10ToDisplay && !this.question10ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(10);
    } else {
      this.question10ValidationSuccess = true;
    }

    if (this.question11ToDisplay && !this.question11ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(11);
    } else {
      this.question11ValidationSuccess = true;
    }
    if (this.question12ToDisplay && !this.question12ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(12);
    } else {
      this.question12ValidationSuccess = true;
    }

    if (!this.question13ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(13);
    } else {
      this.question13ValidationSuccess = true;
    }

    if (!this.question14ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(14);
    } else {
      this.question14ValidationSuccess = true;
    }

    if (!this.question15ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(15);
    }
    else {
      this.question15ValidationSuccess = true;
    }

    if (!this.question16OptionsValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(161);
    } else {
      this.question16OptionsValidationSuccess = true;
    }

    if (!this.question16ValidationSuccess) {

      this.validationPopupDisplay = true;
      this.isFinalError = true;
      console.log(17);
    } else {
      this.question16ValidationSuccess = true;
    }



    if (!this.isFinalError) {
      this.isFinalError = false;
      this.isSubmittedForReport = true;
      this.validationPopupDisplay = false;

      console.log(this.selfAssessmentForm.value);
      /*this.selfAssessment=JSON.parse(this.selfAssessmentForm.value);
      this.selfAssessment.emailId = sessionStorage.getItem("userEmail");
      this.selfAssessment.id = new Date().getTime().toString();
    this.selfAssessment.$key = new Date().getTime().toString();
      let data = Object.assign({}, this.selfAssessment);
    this.firestore.collection('self-assessment-office-data').add(data);*/
      console.log(this.selfAssessment);
      window.scroll(0, 0);
      this.storeFormdataForReport();
      this.typeSectionHeadingToDisplay();
      this.checkHighMeterCount();

    }





  }


  submittedForBack(): void {

    this.isSubmittedForReport = false;



  }

  typeSectionHeadingToDisplay() {
    let generalRecommendationHeadingClass = document.querySelectorAll('.generalRecommendationHeadingClass').length;
    console.log("generalRecommendationHeadingClass" + generalRecommendationHeadingClass);
    if (generalRecommendationHeadingClass > 0) {
      this.generalRecommendationHeading = true;
    }
    else {
      this.generalRecommendationHeading = false;
    }
    let goodHabbitClassCount = document.querySelectorAll('.goodHabbitClass').length;
    console.log("goodHabbitClassCount" + goodHabbitClassCount);
    if (goodHabbitClassCount > 0) {
      this.goodHabbitClassDiv = true;
    }
    else {
      this.goodHabbitClassDiv = false;
    }

    let KeyAreasofImprotClassCount = document.querySelectorAll('.KeyAreasofImprotClass').length;
    console.log("KeyAreasofImprotClassCount" + KeyAreasofImprotClassCount);
    if (KeyAreasofImprotClassCount > 0) {
      this.KeyAreasofImprotClassDiv = true;
    }
    else {
      this.KeyAreasofImprotClassDiv = false;
    }
  }







  storeFormdataForReport() {

    this.selfAssessmentOfficeDTO = new SelfAssessmentOfficeDTO();

    this.selfAssessmentOfficeDTO.mobiledevicesOptionsDivSectionToDisplay = this.mobiledevicesOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.paperdocumentsandpenOptionsDivSectionToDisplay = this.paperdocumentsandpenOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.cafeOptionsDivSectionToDisplay = this.cafeOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.meetingroomOptionsDivSectionToDisplay = this.meetingroomOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.breakoutareaOptionsDivSectionToDisplay = this.breakoutareaOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForAOptionsDivSectionToDisplay = this.questionNo1ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForBOptionsDivSectionToDisplay = this.questionNo1ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForCOptionsDivSectionToDisplay = this.questionNo1ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForDOptionsDivSectionToDisplay = this.questionNo1ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForEOptionsDivSectionToDisplay = this.questionNo1ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForFOptionsDivSectionToDisplay = this.questionNo1ForFOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForGOptionsDivSectionToDisplay = this.questionNo1ForGOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForHOptionsDivSectionToDisplay = this.questionNo1ForHOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForIOptionsDivSectionToDisplay = this.questionNo1ForIOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForJOptionsDivSectionToDisplay = this.questionNo1ForJOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForKOptionsDivSectionToDisplay = this.questionNo1ForKOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForLOptionsDivSectionToDisplay = this.questionNo1ForLOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForMOptionsDivSectionToDisplay = this.questionNo1ForMOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo1ForNOptionsDivSectionToDisplay = this.questionNo1ForNOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForAOptionsDivSectionToDisplay = this.questionNo2ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForBOptionsDivSectionToDisplay = this.questionNo2ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForCOptionsDivSectionToDisplay = this.questionNo2ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForDOptionsDivSectionToDisplay = this.questionNo2ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForEOptionsDivSectionToDisplay = this.questionNo2ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo2ForFOptionsDivSectionToDisplay = this.questionNo2ForFOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForAOptionsDivSectionToDisplay = this.questionNo3ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForBOptionsDivSectionToDisplay = this.questionNo3ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay = this.questionNo3ForA_And_BSeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay = this.questionNo3ForA_And_BSeleceted_EOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay = this.questionNo3ForA_And_BSeleceted_FOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForCOptionsDivSectionToDisplay = this.questionNo3ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForDOptionsDivSectionToDisplay = this.questionNo3ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForEOptionsDivSectionToDisplay = this.questionNo3ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForFOptionsDivSectionToDisplay = this.questionNo3ForFOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo3ForGOptionsDivSectionToDisplay = this.questionNo3ForGOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo4ForAOptionsDivSectionToDisplay = this.questionNo4ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo4ForBOptionsDivSectionToDisplay = this.questionNo4ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo4ForCOptionsDivSectionToDisplay = this.questionNo4ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForAOptionsDivSectionToDisplay = this.questionNo5ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForBOptionsDivSectionToDisplay = this.questionNo5ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForCOptionsDivSectionToDisplay = this.questionNo5ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForA_ASeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForB_ASeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForA_BSeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForB_BSeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForA_CSeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay = this.questionNo5ForB_CSeleceted_DOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForAOptionsDivSectionToDisplay = this.questionNo6ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForBOptionsDivSectionToDisplay = this.questionNo6ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForCOptionsDivSectionToDisplay = this.questionNo6ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForDOptionsDivSectionToDisplay = this.questionNo6ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForEOptionsDivSectionToDisplay = this.questionNo6ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForFOptionsDivSectionToDisplay = this.questionNo6ForFOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo6ForABCOptionsDivSectionToDisplay = this.questionNo6ForABCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo7ForAOptionsDivSectionToDisplay = this.questionNo7ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo7ForBOptionsDivSectionToDisplay = this.questionNo7ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo7ForCOptionsDivSectionToDisplay = this.questionNo7ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo8ForAOptionsDivSectionToDisplay = this.questionNo8ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo8ForBOptionsDivSectionToDisplay = this.questionNo8ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo8ForCOptionsDivSectionToDisplay = this.questionNo8ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo9ForAOptionsDivSectionToDisplay = this.questionNo9ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo9ForBOptionsDivSectionToDisplay = this.questionNo9ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo9ForCOptionsDivSectionToDisplay = this.questionNo9ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo10ForAOptionsDivSectionToDisplay = this.questionNo10ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo10ForBOptionsDivSectionToDisplay = this.questionNo10ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo10ForCOptionsDivSectionToDisplay = this.questionNo10ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo11ForAOptionsDivSectionToDisplay = this.questionNo11ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo11ForBOptionsDivSectionToDisplay = this.questionNo11ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo11ForCOptionsDivSectionToDisplay = this.questionNo11ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo12ForAOptionsDivSectionToDisplay = this.questionNo12ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo12ForBOptionsDivSectionToDisplay = this.questionNo12ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo12ForCOptionsDivSectionToDisplay = this.questionNo12ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo13ForAOptionsDivSectionToDisplay = this.questionNo13ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo13ForBOptionsDivSectionToDisplay = this.questionNo13ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo13ForCOptionsDivSectionToDisplay = this.questionNo13ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo13ForDOptionsDivSectionToDisplay = this.questionNo13ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo13ForEOptionsDivSectionToDisplay = this.questionNo13ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo14ForAOptionsDivSectionToDisplay = this.questionNo14ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo14ForBOptionsDivSectionToDisplay = this.questionNo14ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo14ForCOptionsDivSectionToDisplay = this.questionNo14ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo14ForDOptionsDivSectionToDisplay = this.questionNo14ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo15ForAOptionsDivSectionToDisplay = this.questionNo15ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo15ForBOptionsDivSectionToDisplay = this.questionNo15ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo15ForCOptionsDivSectionToDisplay = this.questionNo15ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForAOptionsDivSectionToDisplay = this.questionNo16ForAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForBOptionsDivSectionToDisplay = this.questionNo16ForBOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForAAOptionsDivSectionToDisplay = this.questionNo16ForAAOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForABOptionsDivSectionToDisplay = this.questionNo16ForABOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForCOptionsDivSectionToDisplay = this.questionNo16ForCOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForDOptionsDivSectionToDisplay = this.questionNo16ForDOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForEOptionsDivSectionToDisplay = this.questionNo16ForEOptionsDivSectionToDisplay
    this.selfAssessmentOfficeDTO.questionNo16ForFOptionsDivSectionToDisplay = this.questionNo16ForFOptionsDivSectionToDisplay

    this.selfAssessmentOfficeDTO.emailId = sessionStorage.getItem("userEmail");
    this.selfAssessmentOfficeDTO.id = new Date().getTime().toString();
    this.selfAssessmentOfficeDTO.$key = new Date().getTime().toString();
    let data = Object.assign({}, this.selfAssessmentOfficeDTO);
    this.firestore.collection('self-assessment-office-report').add(data);
    console.log(this.selfAssessmentOfficeDTO);
    this.isQuestion6HasMultiSelect();
    this.isQuestion13ABHasMultiSelect();
    this.isQuestion13CDEHasMultiSelect();
    this.isQuestion14ABHasMultiSelect();
    this.posturalIssueFootnoteHeaderCondition()


  }

  checkHighMeterCount() {


    if (this.selfAssessmentOfficeDTO.questionNo1ForAOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForBOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForCOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForDOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForEOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForFOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForGOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForHOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForIOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForJOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForKOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForLOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForMOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo1ForNOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForAOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForBOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForCOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForDOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForEOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo2ForFOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForAOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForBOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForCOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForDOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForEOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForFOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo3ForGOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo6ForAOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo6ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo6ForCOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo6ForDOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo6ForEOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo6ForFOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo6ForABCOptionsDivSectionToDisplay) { }
    if (this.selfAssessmentOfficeDTO.questionNo7ForAOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo7ForBOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo7ForCOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo8ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo8ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo8ForCOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo9ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo9ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo9ForCOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo10ForAOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo10ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo10ForCOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo11ForAOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo11ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo11ForCOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo12ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo12ForBOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo12ForCOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo13ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo13ForBOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo13ForCOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo13ForDOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo13ForEOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo14ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo14ForBOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo14ForCOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo14ForDOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo15ForAOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo15ForBOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForBOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForAAOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForABOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForCOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForDOptionsDivSectionToDisplay) {
      this.meterHighCount = this.meterHighCount + this.HIGHSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForEOptionsDivSectionToDisplay) {
      this.meterLowCount = this.meterLowCount + this.LOWSCORECOUNT;
    }
    if (this.selfAssessmentOfficeDTO.questionNo16ForFOptionsDivSectionToDisplay) {
      this.meterMediumCount = this.meterMediumCount + this.MIDSCORECOUNT;
    }






    console.log("Meter Value=" + this.meterLowCount + " " + this.meterMediumCount + " " + this.meterHighCount);
    if (this.meterHighCount > 1)
      this.meterImage = "high_risk.svg";
    else if (this.meterMediumCount >= 12)
      this.meterImage = "high_risk.svg";
    else if (this.meterMediumCount >= 1 && this.meterMediumCount < 12)
      this.meterImage = "med-risk.png";
    else
      this.meterImage = "med_risk.svg";
  }

  isQuestion6HasMultiSelect(): boolean {

    var questionNo6ForAOptionsDivSectionToDisplayCount = 0;
    if (this.questionNo6ForAOptionsDivSectionToDisplay)
      questionNo6ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo6ForBOptionsDivSectionToDisplay)
      questionNo6ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo6ForCOptionsDivSectionToDisplay)
      questionNo6ForAOptionsDivSectionToDisplayCount++;
    if (questionNo6ForAOptionsDivSectionToDisplayCount > 1)
      return true;
    else
      return false;

  }


  isQuestion13ABHasMultiSelect(): boolean {

    var questionNo13ForAOptionsDivSectionToDisplayCount = 0;
    if (this.questionNo13ForAOptionsDivSectionToDisplay)
      questionNo13ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo13ForBOptionsDivSectionToDisplay)
      questionNo13ForAOptionsDivSectionToDisplayCount++;

    if (questionNo13ForAOptionsDivSectionToDisplayCount > 1)
      return true;
    else
      return false;

  }


  isQuestion14ABHasMultiSelect(): boolean {

    var questionNo14ForAOptionsDivSectionToDisplayCount = 0;
    if (this.questionNo14ForAOptionsDivSectionToDisplay)
      questionNo14ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo14ForBOptionsDivSectionToDisplay)
      questionNo14ForAOptionsDivSectionToDisplayCount++;

    if (questionNo14ForAOptionsDivSectionToDisplayCount > 1)
      return true;
    else
      return false;

  }

  isQuestion14CDHasMultiSelect(): boolean {

    var questionNo14ForCOptionsDivSectionToDisplayCount = 0;
    if (this.questionNo14ForCOptionsDivSectionToDisplay)
      questionNo14ForCOptionsDivSectionToDisplayCount++;
    if (this.questionNo14ForDOptionsDivSectionToDisplay)
      questionNo14ForCOptionsDivSectionToDisplayCount++;

    if (questionNo14ForCOptionsDivSectionToDisplayCount > 1)
      return true;
    else
      return false;

  }


  isQuestion13CDEHasMultiSelect(): boolean {

    var questionNo13ForAOptionsDivSectionToDisplayCount = 0;
    if (this.questionNo13ForCOptionsDivSectionToDisplay)
      questionNo13ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo13ForDOptionsDivSectionToDisplay)
      questionNo13ForAOptionsDivSectionToDisplayCount++;
    if (this.questionNo13ForEOptionsDivSectionToDisplay)
      questionNo13ForAOptionsDivSectionToDisplayCount++;

    if (questionNo13ForAOptionsDivSectionToDisplayCount > 1)
      return true;
    else
      return false;

  }



  initializeQuestion16OptionsValue() {
    this.questionNo16ForAOptionsDivSectionToDisplay = false;
    this.questionNo16ForBOptionsDivSectionToDisplay = false;
    this.questionNo16ForAAOptionsDivSectionToDisplay = false;
    this.questionNo16ForABOptionsDivSectionToDisplay = false;
    this.questionNo16ForCOptionsDivSectionToDisplay = false;
    this.questionNo16ForDOptionsDivSectionToDisplay = false;
    this.questionNo16ForEOptionsDivSectionToDisplay = false;
    this.questionNo16ForFOptionsDivSectionToDisplay = false;
  }

  posturalIssueFootnoteHeaderCondition() {

    if (this.posturalIssueFootnoteHeaderConditionHead())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionEyes())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionNeck())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionNeck())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionShoulder())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionUpperback())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionLowerback())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionElbow())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionForearm())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionWrist())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionHand())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionKnee())
      return true;
    if (this.posturalIssueFootnoteHeaderConditionFoot())
      return true;
  }

  posturalIssueFootnoteHeaderConditionHead() {
    if (this.questionNo15ForBOptionsDivSectionToDisplay && this.questionNo16ForAOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionEyes() {
    if (this.questionNo11ForCOptionsDivSectionToDisplay
      && this.questionNo15ForBOptionsDivSectionToDisplay && (this.questionNo16ForAOptionsDivSectionToDisplay))
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionNeck() {
    if ((this.questionNo16ForDOptionsDivSectionToDisplay || this.questionNo16ForEOptionsDivSectionToDisplay)
      && this.questionNo8ForAOptionsDivSectionToDisplay && this.questionNo9ForAOptionsDivSectionToDisplay
      && this.questionNo10ForCOptionsDivSectionToDisplay && this.questionNo11ForCOptionsDivSectionToDisplay
      && (this.questionNo12ForAOptionsDivSectionToDisplay || this.questionNo12ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionShoulder() {
    if ((this.questionNo16ForDOptionsDivSectionToDisplay || this.questionNo16ForEOptionsDivSectionToDisplay)
      && this.questionNo8ForAOptionsDivSectionToDisplay && this.questionNo9ForAOptionsDivSectionToDisplay
      && this.questionNo10ForCOptionsDivSectionToDisplay && this.questionNo11ForCOptionsDivSectionToDisplay
      && (this.questionNo12ForAOptionsDivSectionToDisplay || this.questionNo12ForBOptionsDivSectionToDisplay)
      && (this.questionNo13ForAOptionsDivSectionToDisplay && this.questionNo13ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionUpperback() {
    if ((this.questionNo16ForDOptionsDivSectionToDisplay || this.questionNo16ForEOptionsDivSectionToDisplay)
      && this.questionNo8ForAOptionsDivSectionToDisplay && this.questionNo9ForAOptionsDivSectionToDisplay
      && this.questionNo10ForCOptionsDivSectionToDisplay && this.questionNo11ForCOptionsDivSectionToDisplay
      && (this.questionNo12ForAOptionsDivSectionToDisplay || this.questionNo12ForBOptionsDivSectionToDisplay)
      && (this.questionNo13ForAOptionsDivSectionToDisplay && this.questionNo13ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false

  }


  posturalIssueFootnoteHeaderConditionLowerback() {
    if ((this.questionNo16ForEOptionsDivSectionToDisplay) && this.questionNo7ForCOptionsDivSectionToDisplay
      && this.questionNo8ForAOptionsDivSectionToDisplay && this.questionNo9ForAOptionsDivSectionToDisplay
      && this.questionNo10ForCOptionsDivSectionToDisplay && (this.questionNo11ForAOptionsDivSectionToDisplay || this.questionNo11ForCOptionsDivSectionToDisplay)
      && (this.questionNo12ForAOptionsDivSectionToDisplay || this.questionNo12ForCOptionsDivSectionToDisplay)
      && (this.questionNo13ForAOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionElbow() {
    if ((this.questionNo8ForAOptionsDivSectionToDisplay || this.questionNo8ForCOptionsDivSectionToDisplay)
      && (this.questionNo9ForAOptionsDivSectionToDisplay || this.questionNo9ForCOptionsDivSectionToDisplay)
      && this.questionNo10ForCOptionsDivSectionToDisplay && (this.questionNo13ForAOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionForearm() {
    if ((this.questionNo8ForAOptionsDivSectionToDisplay || this.questionNo8ForCOptionsDivSectionToDisplay)
      && (this.questionNo9ForAOptionsDivSectionToDisplay || this.questionNo9ForCOptionsDivSectionToDisplay)
      && this.questionNo10ForCOptionsDivSectionToDisplay
      && (this.questionNo13ForAOptionsDivSectionToDisplay)
      && (this.questionNo14ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionWrist() {
    if ((this.questionNo8ForAOptionsDivSectionToDisplay || this.questionNo8ForCOptionsDivSectionToDisplay)
      && (this.questionNo9ForAOptionsDivSectionToDisplay || this.questionNo9ForCOptionsDivSectionToDisplay)
      && this.questionNo10ForCOptionsDivSectionToDisplay
      && (this.questionNo13ForAOptionsDivSectionToDisplay || this.questionNo13ForBOptionsDivSectionToDisplay)
      && (this.questionNo14ForAOptionsDivSectionToDisplay || this.questionNo14ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionHand() {
    if ((this.questionNo8ForAOptionsDivSectionToDisplay || this.questionNo8ForCOptionsDivSectionToDisplay)
      && (this.questionNo9ForAOptionsDivSectionToDisplay || this.questionNo9ForCOptionsDivSectionToDisplay)
      && this.questionNo10ForCOptionsDivSectionToDisplay
      && (this.questionNo13ForAOptionsDivSectionToDisplay || this.questionNo13ForBOptionsDivSectionToDisplay)
      && (this.questionNo14ForAOptionsDivSectionToDisplay || this.questionNo14ForBOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }


  posturalIssueFootnoteHeaderConditionKnee() {
    if ((this.questionNo6ForEOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay
      && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }

  posturalIssueFootnoteHeaderConditionFoot() {
    if ((this.questionNo6ForEOptionsDivSectionToDisplay)
      && this.questionNo16ForAOptionsDivSectionToDisplay
      && this.questionNo16ForEOptionsDivSectionToDisplay)
      return true;
    else
      return false;

  }




  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }



}
