import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelfAssessment } from '../shared/self-assessment.model';
import { SelfAssessmentService } from '../shared/self-assessment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent implements OnInit {
  ids: Array<String> = ['one', 'two', 'three', 'four', 'sittingBackDivSection']
  selfAssessmentList: SelfAssessment[];
  @ViewChild('content') content: ElementRef;
  clients: Observable<any[]>;
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
  questionNumberFor9SectionA: boolean = false;
  questionNumberFor9SectionB: boolean = false;
  validationPopupDisplay: boolean = false;
  meterLowCount: number = 0;
  meterMediumCount: number = 0;
  meterHighCount: number = 0;
  fullName: string = "";
  meterImage: string = "low-risk.png";
  fileUrl;
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
  isDownloading: boolean=false;
  makePdf() {


    /*doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });*/
    this.isDownloading=true;
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
      //window.open(pdf.output('bloburl'), '_blank');
      this.isDownloading=false;

     /* canvas.toBlob(function (blob) {
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
    this.shareReportToEmailMsg = "Report link has been sent to " + CustomValidators.maskEmailAddress(this.firebaseUserModel.email, "*");
    var iinfo = new Iinfo();
    iinfo.email = sessionStorage.getItem("userEmail");;
    iinfo.name = this.firebaseUserModel.name;
    iinfo.pdfLink = "http://" + window.location.hostname + ":" + window.location.port + "/showReport/" + this.selfAssessment.id;
    this.subscription = this.sendmailservice.sendEmail(iinfo).
      subscribe(data => {
        let msg = data['message']
        this.validationShareReportPopupDisplay = true;

        // console.log(data, "success");
      }, error => {
        console.error(error, "error");
      });


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


  private navigationToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }


  ngOnInit() {

    console.log("Init In Self Assestment");
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user.name);

      }


      var fullNameLocal = localStorage.getItem("fullName");
      if (fullNameLocal) {
        this.fullName = fullNameLocal;
      }
      else {
        this.fullName = "Guest User";
      }
    })

    /*var selfAssessment=new SelfAssessment(); 
    //selfAssessment.id="101";
    selfAssessment.selection_type="selection_type";
    selfAssessment.hazardHazards="hazardHazards";
    var res = {
      "values": { "key1": "Value1", "key2": "value2" }
    };
    selfAssessment.itemHeader=new Map<string,string>();
    selfAssessment.itemHeader.set("image","image.jpg");
    selfAssessment.option="option";
   // selfAssessment.recommendationRenderingComponentsBonusTips=new Map<string,string>();
    //selfAssessment.recommendationRenderingComponentsProductRecommendation=new Map<string,string>();
    //selfAssessment.recommendationRenderingComponentsRecommendationProduct_DIY=new Map<string,string>();
    //selfAssessment.recommendationRenderingComponentsTitle=new Map<string,string>();
    selfAssessment.selection_type="selection_type";
    selfAssessment.sequence=1;
    selfAssessment.severity_rating="2";
    selfAssessment.type="type";

    let data = Object.assign({}, selfAssessment);
    
    if (selfAssessment.id == null)
      this.firestore.collection('answers').add(data);
    
  */



    /* this.service.getSelfAssessments().subscribe(actionArray => {
       this.list = actionArray.map(item => {
         return {
           id: item.payload.doc.id,
           ...item.payload.doc.data()
         } as SelfAssessment;
       })
     });*/


  }


  submitForAssestmentFormForContinue() {
    this.isSubmittedForReport = false;
    this.validationPopupDisplay = false;

  }

  submitForReportAssestmentFormForContinue() {
    this.validationShareReportPopupDisplay = false;


  }

  submittedForReport(): void {


    if (this.selfAssessment.callsVirtualMeetings1Group == '')
    {
      this.selfAssessment.callsVirtualMeetings1=null;
    }
    
    
    if(this.selfAssessment.computerWork1Group == '')
    {
      this.selfAssessment.computerWork1=null;
    }

    if(this.selfAssessment.paperWork1Group == '')
    {
      this.selfAssessment.paperWork1=null;
    }
    

    this.question1Error = false;
    this.question2Error = false;
    this.question3Error = false;
    this.question4Error = false;
    this.question5Error = false;
    this.question6Error = false;
    this.question7Error = false;
    this.question8Error = false;
    this.question9Error = false;

    var isFinalError = false;
    if ((this.selfAssessment.laptop1 == '')
      && (this.selfAssessment.computer1 == '')
      && (this.selfAssessment.mobile1 == '')) {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question1Error = true;
      isFinalError = true;
    }
    if ((this.selfAssessment.laptop1Group == '')
      && (this.selfAssessment.computer1Group == '')
      && (this.selfAssessment.mobile1Group == '')) {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question1Error = true;
      isFinalError = true;
    }
   
    if (this.selfAssessment.callsVirtualMeetings1Group == null && this.selfAssessment.computerWork1Group == null &&
      this.selfAssessment.paperWork1Group == null) {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question2Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.callsVirtualMeetings1Group == '' && this.selfAssessment.computerWork1Group == '' &&
      this.selfAssessment.paperWork1Group == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question2Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.perchedForward == '' && this.selfAssessment.leaningForward == '' &&
      this.selfAssessment.slouching == '' && this.selfAssessment.sittingBack == '' && this.selfAssessment.offTheFloorRestingOnCasters == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question3Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.question4Options == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question4Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.question5Options == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question5Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.laptop1 && this.selfAssessment.question6Options == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question6Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.computer1 && this.selfAssessment.question7Options == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question7Error = true;
      isFinalError = true;
    }
    if (this.selfAssessment.question8Options == '') {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question8Error = true;
      isFinalError = true;
    }
    if ((this.selfAssessment.sitting == '') && (this.selfAssessment.standing == '') &&
      (this.selfAssessment.stretching == '') && (this.selfAssessment.takingBreaks == '')) {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question9Error = true;
      isFinalError = true;

    }
    if ((this.selfAssessment.sittingGroup == '') && (this.selfAssessment.standingGroup == '') &&
      (this.selfAssessment.stretchingGroup == '') && (this.selfAssessment.takingBreaksGroup == '')) {
      //alert("Please Fill1");
      this.validationPopupDisplay = true;
      this.question9Error = true;
      isFinalError = true;

    }

    if (isFinalError != true) {
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


      


    }//closing of else part


  }



  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }


  test() {
    console.log("testfuncrtion");
    alert(123);
  }


  chnageOnQuestions1() {


    if ((this.selfAssessment.computer1 && this.selfAssessment.computer1Group != '') && (this.selfAssessment.laptop1 && this.selfAssessment.laptop1Group != '')) {
      this.questionNumberFor7 = 7;
      this.questionNumberFor8 = 8;
      this.questionNumberFor9 = 9;


    }

    else if ((this.selfAssessment.computer1 && this.selfAssessment.computer1Group != '') || (this.selfAssessment.laptop1 && this.selfAssessment.laptop1Group != '')) {

      this.questionNumberFor7 = 6;
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
      this.meterImage = "high_risk.svg";
    else if (this.meterMediumCount >= 8)
      this.meterImage = "high_risk.svg";
    else if (this.meterMediumCount >= 1 && this.meterMediumCount < 8)
      this.meterImage = "med_risk.svg";
    else
      this.meterImage = "med_risk.svg";
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

   navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}

  scroll(location: string, wait: number = 100): void {
    const element = document.querySelector('#' + location);
    alert(element);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }, wait)
    }

  }

}

