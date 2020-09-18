import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { SelfAssessment } from '../shared/self-assessment.model';
import { SelfAssessmentService } from '../shared/self-assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import * as jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestErgo } from '../shared/request-ergo.model';
import { RequestErgoService } from '../shared/request-ergo.service';
import { map, finalize } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request-ergo',
  templateUrl: './request-ergo.component.html',
  styleUrls: ['./request-ergo.component.scss']
})
export class RequestErgoComponent implements OnInit {
  selectedFile: File = null;
  fb;
  filesizeerr:Boolean=false;
  formSubmitted:Boolean=false;
  downloadURL: Observable<string>;
  requestErgoForm: FormGroup;
  requestErgo = new RequestErgo();
  firebaseUserModel: FirebaseUserModel = new FirebaseUserModel();
  isRemote:boolean=false;
  isOnSite:boolean=false;
  address:boolean=false;
  imgupload:boolean=false;
  @ViewChild('content') content: ElementRef;
  constructor(private service: RequestErgoService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore, 
    private formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,private sanitizer: DomSanitizer) { 

      this.requestErgoForm = this.formBuilder.group({

        'assessmentType': [this.requestErgo.assessmentType, [Validators.required]],
        'fullName': [this.requestErgo.fullName, [Validators.required]],
        'organisation': [this.requestErgo.organisation, [Validators.required]],
        'workEmail': [this.requestErgo.workEmail, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        'phone': [this.requestErgo.phone, [Validators.required]],
        'address': [this.requestErgo.address, [Validators.required]],
        'reasonForAssetment': [this.requestErgo.reasonForAssetment, [Validators.required]],
        'areaOfPainHeadSelected': [this.requestErgo.areaOfPainHeadSelected, [Validators.required]],
        'areaOfPainHeadValue': [this.requestErgo.areaOfPainHeadValue, [Validators.required]],
        'areaOfPainEyesSelected': [this.requestErgo.areaOfPainEyesSelected, [Validators.required]],
        'areaOfPaininEyesValue': [this.requestErgo.areaOfPaininEyesValue, [Validators.required]],
        'areaOfPainNeckSelected': [this.requestErgo.areaOfPainNeckSelected, [Validators.required]],
        'areaOfPainNeckValue': [this.requestErgo.areaOfPainNeckValue, [Validators.required]],
        'areaOfPainUpperBackSelected': [this.requestErgo.areaOfPainUpperBackSelected, [Validators.required]],
        'areaOfPainUpperBackValue': [this.requestErgo.areaOfPainUpperBackValue, [Validators.required]],
        'areaOfPainLowerBackSelected': [this.requestErgo.areaOfPainLowerBackSelected, [Validators.required]],
        'areaOfPainLowerBackValue': [this.requestErgo.areaOfPainLowerBackValue, [Validators.required]],
        'areaOfPainShouldersSelected': [this.requestErgo.areaOfPainShouldersSelected, [Validators.required]],
        'areaOfPainShouldersValue': [this.requestErgo.areaOfPainShouldersValue, [Validators.required]],
        'areaOfPainForearmsSelected': [this.requestErgo.areaOfPainForearmsSelected, [Validators.required]],
        'areaOfPainForearmsValue': [this.requestErgo.areaOfPainForearmsValue, [Validators.required]],
        'areaOfPainWristsSelected': [this.requestErgo.areaOfPainWristsSelected, [Validators.required]],
        'areaOfPainWritsValue': [this.requestErgo.areaOfPainWritsValue, [Validators.required]],
        'areaOfPainHandsSelected': [this.requestErgo.areaOfPainHandsSelected, [Validators.required]],
        'areaOfPainHandsValue': [this.requestErgo.areaOfPainHandsValue, [Validators.required]],
        'areaOfPainKneesSelected': [this.requestErgo.areaOfPainKneesSelected, [Validators.required]],
        'areaOfPainKneesValue': [this.requestErgo.areaOfPainKneesValue, [Validators.required]],
        'areaOfPainFeetSelected': [this.requestErgo.areaOfPainFeetSelected, [Validators.required]],
        'areaOfPainFeetValue': [this.requestErgo.areaOfPainFeetValue, [Validators.required]],
        'areaOfPainOthersSelected': [this.requestErgo.areaOfPainOthersSelected, [Validators.required]],
        'areaOfPainOthersValue': [this.requestErgo.areaOfPainOthersValue, [Validators.required]],
        'prefferedDatesTime': [this.requestErgo.prefferedDatesTime, [Validators.required]],
        'additionalDetails': [this.requestErgo.additionalDetails, [Validators.required]],

  
      });







    }

  ngOnInit() {
    this.address=false;
    this.imgupload=false;

    this.firebaseUserModel= JSON.parse(sessionStorage.getItem("firebaseUserModel"));
    console.log(this.firebaseUserModel);
    if(this.firebaseUserModel!=null)
    {
      this.requestErgo.fullName=this.firebaseUserModel.name;
      this.requestErgo.organisation=this.firebaseUserModel.orgName;
      this.requestErgo.workEmail=this.firebaseUserModel.email;
    



    }

    if(this.route.snapshot.params.id==1){
    this.isRemote=true;
    this.requestErgo.assessmentType="Remote";
    this.imgupload=true;
    }
    if(this.route.snapshot.params.id==2){
    this.isOnSite=true;
    this.address=true;
    this.requestErgo.assessmentType="On-Site";
    }
    console.log("this.route.snapshot.params.id="+this.route.snapshot.params.id+" "+this.isRemote+" "+this.isOnSite);
    

  }

  onRequestErgoSubmit()
  {
    let data = Object.assign({}, this.requestErgo);
    //alert(data);
    if (this.requestErgo!= null)
      this.firestore.collection('request-ergo').add(data);
      this.formSubmitted=true;
      //this.requestErgo.clear(); 


  }

  hide() {
    this.formSubmitted = false;
  }

  assessmentype(spr) {
    alert("test" + spr);
    if(spr == "Remote"){
      this.imgupload=true;
      this.address=false;
    }
    if(spr == "On-Site"){
      this.imgupload=false;
      this.address=true;
    }
  }

  files: any = [];

  uploadFile(event) {
    var n = Date.now();
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      //this.files.push(element.name)
      console.log(element.size);
      this.filesizeerr=false;
        if(element.size < 1048576){
           this.filesizeerr=false;
      var n = Date.now();
      const file =element;
      const filePath = `SynergyProRequestErgoFiles/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`SynergyProRequestErgoFiles/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.fb = url;
              }
              console.log("this.fb "+this.fb);
              this.files.push(this.fb)
              this.requestErgo.images.push(this.fb);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log("Lovely "+url);
            
          }
        });




    }else{
      this.filesizeerr=true;
    } 
    } 
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

}
