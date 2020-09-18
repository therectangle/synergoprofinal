import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { SelfAssessment } from '../shared/self-assessment.model';
import { SelfAssessmentService } from '../shared/self-assessment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import * as jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { SendMailServiceService } from '../shared/send-mail-service.service';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.scss']
})
export class ShowReportComponent implements OnInit {
  clients: Observable<any[]>;
  firebaseUserModel: FirebaseUserModel;
  selfAssessmentList: SelfAssessment[];
  @ViewChild('content') content: ElementRef;
  selfAssessmentForm: FormGroup;  //declaring our form variable
  selfAssessment = new SelfAssessment();
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
  questionNumberFor9SectionA:boolean=false;
  questionNumberFor9SectionB:boolean=false;
  validationPopupDisplay: boolean = false;
  meterLowCount: number = 0;
  meterMediumCount: number = 0;
  meterHighCount: number = 0;
  fullName: string = "";
  meterImage: string="low-risk.png";
  fileUrl;


  //to Show error Highlight Box Over Each Questions
  question1Error:boolean=false;
  question2Error:boolean=false;
  question3Error:boolean=false;
  question4Error:boolean=false;
  question5Error:boolean=false;
  question6Error:boolean=false;
  question7Error:boolean=false;
  question8Error:boolean=false;
  question9Error:boolean=false;
  downloadURL: any;
  pdfshareurl: any;
  public subscription: Subscription;
  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route:ActivatedRoute,private formBuilder: FormBuilder
  ) {

    this.selfAssessmentForm = this.formBuilder.group({

      'laptop1': [this.selfAssessment.laptop1, [Validators.required]],
      'computer1': [this.selfAssessment.computer1, [Validators.required]],
      'mobile1': [this.selfAssessment.mobile1, [Validators.required]],

      'laptop1Group': [this.selfAssessment.laptop1Group, [Validators.required]],
      'computer1Group': [this.selfAssessment.computer1Group, [Validators.required]],
      'mobile1Group': [this.selfAssessment.mobile1Group, [Validators.required]],

      'paperWork1': [this.selfAssessment.paperWork1, [Validators.required]],
      'computerWork1': [this.selfAssessment.computerWork1, [Validators.required]],
      'callsVirtualMeetings1': [this.selfAssessment.callsVirtualMeetings1, [Validators.required]],

      'perchedForward': [this.selfAssessment.perchedForward],
      'leaningForward': [this.selfAssessment.leaningForward],
      'slouching': [this.selfAssessment.slouching],
      'sittingBack': [this.selfAssessment.sittingBack],
      'offTheFloorRestingOnCasters': [this.selfAssessment.offTheFloorRestingOnCasters],
      'question4Options': [this.selfAssessment.question4Options, [Validators.required]],


      'question5Options': [this.selfAssessment.question5Options, [Validators.required]],


      'question6Options': [this.selfAssessment.question6Options, [Validators.required]],


      'question7Options': [this.selfAssessment.question7Options, [Validators.required]],


      'question8Options': [this.selfAssessment.question8Options, [Validators.required]],




      'paperWork1Group': [this.selfAssessment.paperWork1Group, [Validators.required]],
      'computerWork1Group': [this.selfAssessment.computerWork1Group, [Validators.required]],
      'callsVirtualMeetings1Group': [this.selfAssessment.callsVirtualMeetings1Group, [Validators.required]],

      'sitting': [this.selfAssessment.sitting, [Validators.required]],
      'standing': [this.selfAssessment.standing, [Validators.required]],
      'stretching': [this.selfAssessment.stretching, [Validators.required]],
      'takingBreaks': [this.selfAssessment.takingBreaks, [Validators.required]],

      'sittingGroup': [this.selfAssessment.sittingGroup, [Validators.required]],
      'standingGroup': [this.selfAssessment.standingGroup, [Validators.required]],
      'stretchingGroup': [this.selfAssessment.stretchingGroup, [Validators.required]],
      'takingBreaksGroup': [this.selfAssessment.takingBreaksGroup, [Validators.required]],


    });
    
  }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.loadData();
    
  }


  loadData()
  {
    const citiesRef = this.firestore.collection('self-assessment',citiesRef=>citiesRef.where('id', '==', this.route.snapshot.params.id));
    
    this.clients = citiesRef.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as FirebaseUserModel;
        data.$key = a.payload.doc.id;
       
        return data;
      })
    })

    this.clients.subscribe(data=>{

      data.forEach(obj=>{
        this.selfAssessment=obj;
        console.log("JSON.stringify(selfAssessment)="+JSON.stringify(this.selfAssessment));
        

        
      
        this.isSubmittedForReport = !this.isSubmittedForReport;
        window.scroll(0, 0);
  
  
  
  
        // this.selfAssessment.id="23423423424";
        this.selfAssessment.emailId = sessionStorage.getItem("userEmail");
        this.selfAssessment.id = new Date().getTime().toString();
        this.selfAssessment.$key = new Date().getTime().toString();
        let data = Object.assign({}, this.selfAssessment);
        this.firestore.collection('self-assessment').add(data);
  
        //if ((!this.selfAssessment.perchedForward || !this.selfAssessment.leaningForward) && this.selfAssessment.slouching) {
  
  
          if (this.selfAssessment.mobile1Group != '') {
            this.generalRecommendationHeading = true;
          }
  
          if (this.selfAssessment.callsVirtualMeetings1Group != '') {
            this.tipsforplaceswhereyouworkHeading=true;
          }
          if (this.selfAssessment.computerWork1 != '' && this.selfAssessment.computerWork1Group != '') {
            this.generalRecommendationHeading = true;
          }
          if (this.selfAssessment.paperWork1 != '' && this.selfAssessment.paperWork1Group != '') {
            this.generalRecommendationHeading = true;
          }
  
        
  
        if (this.selfAssessment.callsVirtualMeetings1 != '' && this.selfAssessment.callsVirtualMeetings1Group != '') {
          this.tipsforplaceswhereyouworkHeading = true;
        }
        //alert("Please Fill1");
  
        
        if ((this.selfAssessment.perchedForward)) {
          this.meterHighCount = this.meterHighCount + 3 //
          this.keyAreaOfImprovementHeading = true;
        }
        if (this.selfAssessment.leaningForward) {
          this.meterHighCount = this.meterHighCount + 3 //
          this.keyAreaOfImprovementHeading = true;
        }
        if (this.selfAssessment.slouching) {
          this.meterMediumCount = this.meterMediumCount + 2; //
          this.keyAreaOfImprovementHeading = true;
        }      
        if (this.selfAssessment.sittingBack != '') {
          this.currentGoodPracticesHeading = true;
          this.meterLowCount++;
        }
        if (this.selfAssessment.offTheFloorRestingOnCasters != '') {
          this.meterMediumCount = this.meterMediumCount + 2; //
          this.keyAreaOfImprovementHeading = true;
        }
  
        //Question 4
        if (this.selfAssessment && this.selfAssessment.question4Options == "question4Option1") {
          this.keyAreaOfImprovementHeading = true;
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
  
        if (this.selfAssessment.question4Options == 'question4Option2') {
          this.keyAreaOfImprovementHeading = true;
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
  
  
        if (this.selfAssessment.question4Options == 'question4Option3') {
          this.meterLowCount = this.meterLowCount++;
          this.keyAreaOfImprovementHeading = true;
        }
        /* if (this.selfAssessment.question5Options == 'question5Option1') {
           this.keyAreaOfImprovementHeading = true;
           this.meterMediumCount=this.meterMediumCount+2;
         }*/
  
        //Question 5
        if (this.selfAssessment.question5Options == 'question5Option1') {
          this.currentGoodPracticesHeading = true;
          this.meterLowCount++;
        }
  
        if (this.selfAssessment.question5Options == 'question5Option2') {
          this.keyAreaOfImprovementHeading = true;
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        if (this.selfAssessment.question5Options == 'question5Option3') {
          this.keyAreaOfImprovementHeading = true;
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
  
        //Question 6
  
        if (this.selfAssessment.laptop1 != '' && this.selfAssessment.question6Options == 'question6Option1') {
          this.keyAreaOfImprovementHeading = true;
          this.meterHighCount = this.meterHighCount + 3; ///
        }
        if (this.selfAssessment.laptop1 != '' && this.selfAssessment.question6Options == 'question6Option2') {
          this.keyAreaOfImprovementHeading = true;
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        if (this.selfAssessment.laptop1 != '' && this.selfAssessment.question6Options == 'question6Option3') {
          this.currentGoodPracticesHeading = true;
          this.meterLowCount++;
        }
  
  
        //Question 7
        if (this.selfAssessment.computer1 != '' && this.selfAssessment.question7Options == 'question7Option1') {
          this.keyAreaOfImprovementHeading = true;
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
  
        if (this.selfAssessment.computer1 != '' && this.selfAssessment.question7Options == 'question7Option2') {
          this.keyAreaOfImprovementHeading = true;
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        if (this.selfAssessment.computer1 != '' && this.selfAssessment.question7Options == 'question7Option3') {
          this.currentGoodPracticesHeading = true;
          this.meterLowCount++;
        }
  
        //Question 8
        if (this.selfAssessment.question8Options == 'question8Option1') {
          this.keyAreaOfImprovementHeading = true;
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
        if (this.selfAssessment.question8Options == 'question8Option2') {
          this.currentGoodPracticesHeading = true;
          this.meterLowCount++; //
        }
  
  
        //Condition For Question 9
        if (this.selfAssessment.sitting != '' && this.selfAssessment.sittingGroup == 'Rarely') {
          this.meterLowCount++;
        }
        else if (this.selfAssessment.sitting != '' && this.selfAssessment.sittingGroup == 'Often') {
          this.meterMediumCount = this.meterMediumCount + 2;//
  
        }
        else if (this.selfAssessment.sitting != '' && this.selfAssessment.sittingGroup == 'Usually') {
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        //Condition For Question 9
        if (this.selfAssessment.standing != '' && this.selfAssessment.standingGroup == 'Rarely') {
          this.meterLowCount++;
        }
        else if (this.selfAssessment.standing != '' && this.selfAssessment.standingGroup == 'Often') {
          this.meterMediumCount = this.meterMediumCount + 2;
        }
        else if (this.selfAssessment.standing != '' && this.selfAssessment.standingGroup == 'Usually') {
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        //Condition For Question 9
        if (this.selfAssessment.stretching != '' && this.selfAssessment.stretchingGroup == 'Rarely') {
          this.meterMediumCount = this.meterMediumCount + 2;//
  
        }
        else if (this.selfAssessment.stretching != '' && this.selfAssessment.stretchingGroup == 'Often') {
          this.meterMediumCount = this.meterMediumCount + 2;
        }
        else {
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        //Condition For Question 9
        if (this.selfAssessment.takingBreaks != '' && this.selfAssessment.takingBreaksGroup == 'Rarely') {
          this.meterMediumCount = this.meterMediumCount + 2; //
        }
        else if (this.selfAssessment.takingBreaks != "" && this.selfAssessment.takingBreaksGroup == 'Often') {
          this.meterMediumCount = this.meterMediumCount + 2;
        }
        else {
          this.meterHighCount = this.meterHighCount + 3; ///
        }
  
        // alert(this.selfAssessment.stretching+" "+this.selfAssessment.stretchingGroup)
        // alert(this.selfAssessment.takingBreaks+" "+this.selfAssessment.takingBreaksGroup)
  
        if (((this.selfAssessment.stretching != '' && this.selfAssessment.stretchingGroup == 'Often') ||
          (this.selfAssessment.takingBreaks != '' && this.selfAssessment.takingBreaksGroup == 'Often'))) {
  
             // this.keyAreaOfImprovementHeading = true;
          this.currentGoodPracticesHeading = true;
          this.questionNumberFor9SectionA = true;
          this.questionNumberFor9SectionB = false;
        }
        else {
         
          this.keyAreaOfImprovementHeading = true;
          this.questionNumberFor9SectionB = true;
          this.questionNumberFor9SectionA = false;
        }
  
  
        //alert(this.questionNumberFor9SectionA+" "+this.questionNumberFor9SectionB);
  
  
  
  
  
        /*if ((this.selfAssessment.stretching && this.selfAssessment.stretchingGroup == 'Often') ||
          (this.selfAssessment.takingBreaks && this.selfAssessment.takingBreaksGroup == 'Often')) {
          this.currentGoodPracticesHeading = true;
        }*/
  
  
  
  
  
        this.checkHighMeterCount();
  
  
  
  
       
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
  









      });

    });
  }

 


  test() {
    console.log("testfuncrtion");
    alert(123);
  }


  chnageOnQuestions1() {
    
    
    if ((this.selfAssessment.computer1  && this.selfAssessment.computer1Group != '') && (this.selfAssessment.laptop1  && this.selfAssessment.laptop1Group != '')) {
      this.questionNumberFor8 = 8;
      this.questionNumberFor9 = 9;


    }
    else if ((this.selfAssessment.computer1  && this.selfAssessment.computer1Group != '') || (this.selfAssessment.laptop1  && this.selfAssessment.laptop1Group != '')) {


      this.questionNumberFor8 = 7;
      this.questionNumberFor9 = 8;


    }
   
    else {
      this.questionNumberFor8 = 6;
      this.questionNumberFor9 = 7;

    }
  }



  checkHighMeterCount() {
    console.log("Meter Value=" + this.meterLowCount + " " + this.meterMediumCount + " " + this.meterHighCount);
      if (this.meterHighCount > 1)
          this.meterImage = "high-risk.png";
      else if (this.meterMediumCount >=8)
          this.meterImage = "high-risk.png";
        else if (this.meterMediumCount>=1 && this.meterMediumCount<8)
          this.meterImage = "med-risk.png";
        else
          this.meterImage = "low-risk.png";
    }


  checkMediumMeterCount() {
    if (this.meterMediumCount >= 19 && this.meterMediumCount <= 35)
      return true;
  }


  checkLowMeterCount() {
    if (this.meterHighCount <= 18)
      return true;
  }


  getCurrentDateAndTime() {
    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date + ' ' + time;
    return dateTime;
  }

  scroll(location: string, wait: number=100): void {
    const element = document.querySelector('#' + location);
    alert(element);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
      }, wait)
    }
  
}

}
