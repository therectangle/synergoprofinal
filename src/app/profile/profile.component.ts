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
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isPaswordLinkSent:boolean;
isPaswwordNotEntered:boolean;
EmailPaswordLinkSendMsg:string;
  selectedFile: File = null;
  fb;
  filesizeerr:Boolean=false;
  formSubmitted:Boolean=false;
  formSubmittedError:boolean=false;
  downloadURL: Observable<string>;
  requestErgoForm: FormGroup;
  requestErgo = new RequestErgo();
  firebaseUserModel: FirebaseUserModel = new FirebaseUserModel();
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

        'fullName': [this.requestErgo.fullName, [Validators.required]],
        'organisation': [this.requestErgo.organisation, [Validators.required]],
        'workEmail': [this.requestErgo.workEmail, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        'phone': [this.requestErgo.phone, [Validators.required]],
        'address': [this.requestErgo.address, [Validators.required]],
        

  
      });







    }

  ngOnInit() {

    this.firebaseUserModel= JSON.parse(sessionStorage.getItem("firebaseUserModel"));
    console.log(this.firebaseUserModel);
    if(this.firebaseUserModel!=null)
    {
      this.requestErgo.fullName=this.firebaseUserModel.name;
      this.requestErgo.organisation=this.firebaseUserModel.orgName;
      this.requestErgo.workEmail=this.firebaseUserModel.email;
      this.requestErgo.phone=this.firebaseUserModel.phone;
      this.requestErgo.address=this.firebaseUserModel.address;
    



    }
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

  submitForUpdateProfile()
  {
    if(!this.requestErgoForm.invalid){
    const citiesRef = this.firestore.collection('user_data',citiesRef=>citiesRef.where('email', '==', this.requestErgoForm.get("workEmail").value));
    if(citiesRef!=null)
    {
      citiesRef.doc(this.firebaseUserModel.$key).set({
        name:this.requestErgoForm.get("fullName").value,
        orgName:this.requestErgoForm.get("organisation").value,
        email:this.requestErgoForm.get("workEmail").value,
        phone:this.requestErgoForm.get("phone").value,
        address:this.requestErgoForm.get("address").value,
        provider:"SynergyPro",
        $key:this.firebaseUserModel.$key
      });
      this.formSubmitted=true;
    }
  }
  else{
    if(!this.requestErgoForm.get("phone").touched)
    this.requestErgoForm.get("phone").markAsTouched;
    if(!this.requestErgoForm.get("address").touched)
    this.requestErgoForm.get("address").markAsTouched;
    this.requestErgoForm.markAsDirty();
    this.formSubmittedError=true;
  }
  }

  formSubmittedErrorButtonHide()
  {
    this.formSubmittedError=false;
  }

  logout() {
    sessionStorage.setItem("firebaseUserModel",null);
    this.authService.doLogout()
      .then((res) => {
        console.log("Logout From App Component");
       
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  submitForResetPassword(emailid)
  {
    if(emailid==null || emailid=='')
    {
      this.isPaswwordNotEntered=true;
    }
    else{
      this.authService.ForgotPassword(emailid);
      this.isPaswordLinkSent=true;
      this.isPaswwordNotEntered=false;
      this.EmailPaswordLinkSendMsg=" Email with a link to reset password was sent to"+ CustomValidators.maskEmailAddress(emailid,"*");
    }
  }
  closeForgotPasswordOk(){
    this.isPaswwordNotEntered=false;
  }

}
