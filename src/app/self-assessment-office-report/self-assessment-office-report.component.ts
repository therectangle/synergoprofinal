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
import { SelfAssessmentOfficeDTO } from '../shared/self-assessment-office-report-dto';

@Component({
  selector: 'app-self-assessment-office-report',
  templateUrl: './self-assessment-office-report.component.html',
  styleUrls: ['./self-assessment-office-report.component.scss']
})
export class SelfAssessmentOfficeReportComponent implements OnInit {
  selfAssessmentOfficeDTO:SelfAssessmentOfficeDTO;
  clients: Observable<any[]>;
  firebaseUserModel: FirebaseUserModel;
  selfAssessmentList: SelfAssessment[];
  @ViewChild('content') content: ElementRef;
  selfAssessmentForm: FormGroup;  //declaring our form variable
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
  questionNo3ForDOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForEOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForFOptionsDivSectionToDisplay: boolean = false;
  questionNo3ForGOptionsDivSectionToDisplay: boolean = false;


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

  }
  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.loadData();
    
  }


  loadData()
  {
    const citiesRef = this.firestore.collection('self-assessment-office-report',citiesRef=>citiesRef.where('id', '==', this.route.snapshot.params.id));
    
    this.clients = citiesRef.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as FirebaseUserModel;
        data.$key = a.payload.doc.id;
       
        return data;
      })
    })

    this.clients.subscribe(data=>{

      data.forEach(obj=>{
        this.selfAssessmentOfficeDTO=obj;
        console.log("JSON.stringify(selfAssessment)="+JSON.stringify(this.selfAssessmentOfficeDTO));
        
        this.	questionNo1ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForAOptionsDivSectionToDisplay	;
        this.	questionNo1ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForBOptionsDivSectionToDisplay	;
        this.	questionNo1ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForCOptionsDivSectionToDisplay	;
        this.	questionNo1ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForDOptionsDivSectionToDisplay	;
        this.	questionNo1ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForEOptionsDivSectionToDisplay	;
        this.	questionNo1ForFOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForFOptionsDivSectionToDisplay	;
        this.	questionNo1ForGOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForGOptionsDivSectionToDisplay	;
        this.	questionNo1ForHOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForHOptionsDivSectionToDisplay	;
        this.	questionNo1ForIOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForIOptionsDivSectionToDisplay	;
        this.	questionNo1ForJOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForJOptionsDivSectionToDisplay	;
        this.	questionNo1ForKOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForKOptionsDivSectionToDisplay	;
        this.	questionNo1ForLOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForLOptionsDivSectionToDisplay	;
        this.	questionNo1ForMOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForMOptionsDivSectionToDisplay	;
        this.	questionNo1ForNOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo1ForNOptionsDivSectionToDisplay	;
                  
                  
        this.	questionNo2ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForAOptionsDivSectionToDisplay	;
        this.	questionNo2ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForBOptionsDivSectionToDisplay	;
        this.	questionNo2ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForCOptionsDivSectionToDisplay	;
        this.	questionNo2ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForDOptionsDivSectionToDisplay	;
        this.	questionNo2ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForEOptionsDivSectionToDisplay	;
        this.	questionNo2ForFOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo2ForFOptionsDivSectionToDisplay	;
                  
        this.	questionNo3ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForAOptionsDivSectionToDisplay	;
        this.	questionNo3ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForBOptionsDivSectionToDisplay	;
        this.	questionNo3ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForCOptionsDivSectionToDisplay	;
        this.	questionNo3ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForDOptionsDivSectionToDisplay	;
        this.	questionNo3ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForEOptionsDivSectionToDisplay	;
        this.	questionNo3ForFOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForFOptionsDivSectionToDisplay	;
        this.	questionNo3ForGOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo3ForGOptionsDivSectionToDisplay	;
                  
                  
        this.	questionNo6ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForAOptionsDivSectionToDisplay	;
        this.	questionNo6ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForBOptionsDivSectionToDisplay	;
        this.	questionNo6ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForCOptionsDivSectionToDisplay	;
        this.	questionNo6ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForDOptionsDivSectionToDisplay	;
        this.	questionNo6ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForEOptionsDivSectionToDisplay	;
        this.	questionNo6ForFOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForFOptionsDivSectionToDisplay	;
                  
                  
        this.	questionNo6ForABCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo6ForABCOptionsDivSectionToDisplay	;
                  
        this.	questionNo7ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo7ForAOptionsDivSectionToDisplay	;
        this.	questionNo7ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo7ForBOptionsDivSectionToDisplay	;
        this.	questionNo7ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo7ForCOptionsDivSectionToDisplay	;
        this.	questionNo8ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo8ForAOptionsDivSectionToDisplay	;
        this.	questionNo8ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo8ForBOptionsDivSectionToDisplay	;
        this.	questionNo8ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo8ForCOptionsDivSectionToDisplay	;
        this.	questionNo9ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo9ForAOptionsDivSectionToDisplay	;
        this.	questionNo9ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo9ForBOptionsDivSectionToDisplay	;
        this.	questionNo9ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo9ForCOptionsDivSectionToDisplay	;
        this.	questionNo10ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo10ForAOptionsDivSectionToDisplay	;
        this.	questionNo10ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo10ForBOptionsDivSectionToDisplay	;
        this.	questionNo10ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo10ForCOptionsDivSectionToDisplay	;
        this.	questionNo11ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo11ForAOptionsDivSectionToDisplay	;
        this.	questionNo11ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo11ForBOptionsDivSectionToDisplay	;
        this.	questionNo11ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo11ForCOptionsDivSectionToDisplay	;
        this.	questionNo12ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo12ForAOptionsDivSectionToDisplay	;
        this.	questionNo12ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo12ForBOptionsDivSectionToDisplay	;
        this.	questionNo12ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo12ForCOptionsDivSectionToDisplay	;
        this.	questionNo13ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo13ForAOptionsDivSectionToDisplay	;
        this.	questionNo13ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo13ForBOptionsDivSectionToDisplay	;
        this.	questionNo13ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo13ForCOptionsDivSectionToDisplay	;
        this.	questionNo13ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo13ForDOptionsDivSectionToDisplay	;
        this.	questionNo13ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo13ForEOptionsDivSectionToDisplay	;
        this.	questionNo14ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo14ForAOptionsDivSectionToDisplay	;
        this.	questionNo14ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo14ForBOptionsDivSectionToDisplay	;
        this.	questionNo14ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo14ForCOptionsDivSectionToDisplay	;
        this.	questionNo14ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo14ForDOptionsDivSectionToDisplay	;
        this.	questionNo15ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo15ForAOptionsDivSectionToDisplay	;
        this.	questionNo15ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo15ForBOptionsDivSectionToDisplay	;
        this.	questionNo15ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo15ForCOptionsDivSectionToDisplay	;
        this.	questionNo16ForAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForAOptionsDivSectionToDisplay	;
        this.	questionNo16ForBOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForBOptionsDivSectionToDisplay	;
        this.	questionNo16ForAAOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForAAOptionsDivSectionToDisplay	;
        this.	questionNo16ForABOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForABOptionsDivSectionToDisplay	;
        this.	questionNo16ForCOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForCOptionsDivSectionToDisplay	;
        this.	questionNo16ForDOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForDOptionsDivSectionToDisplay	;
        this.	questionNo16ForEOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForEOptionsDivSectionToDisplay	;
        this.	questionNo16ForFOptionsDivSectionToDisplay	=	this.selfAssessmentOfficeDTO.	questionNo16ForFOptionsDivSectionToDisplay	;
      
        
      
        this.isSubmittedForReport = !this.isSubmittedForReport;
        window.scroll(0, 0);  
  
  
      
      });
    });
  }
  
}
