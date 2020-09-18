import { Component, Query } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';

import { FirebaseUserModel } from '../core/user.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {
successMessage:string="";
  loginForm: FormGroup;
  errorMessage: string = '';
  isValidDomainemailId:boolean;
  isValidDomainemailIdPopup:boolean;
  isValidDomainemailIdUser:boolean;
  //firebaseUserModel:FirebaseUserModel=new FirebaseUserModel();
  private clientRef: DocumentReference;
  clients: Observable<any[]>;
  firebaseUserModel: FirebaseUserModel;
  submitted:boolean;
  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }



  ngOnInit(): void {
   
    this.loginForm.get("email").valueChanges.subscribe((data) => {
      //this.registerForm.get("email").setValidators(CustomValidators.emailDomain('dell.com'));
     
        var domainName1='mindlens.com.sg';
        var domainName2='therectangle.agency';
        var domainName3='karuyaki.com';
        var domainName4='gmail.com';
        var domainName5='synergo.com.sg';
        var email=this.loginForm.get("email").value;

         const domain = email.substring(email.lastIndexOf('@') + 1);
          //console.log(domain);

          const subscriptionEmailRef = this.firestore.collection('domain-allowed', citiesRef => citiesRef.where('domain', '==', domain));
      var getDoc = subscriptionEmailRef.get().toPromise().then(doc => {
        if (doc.size <= 0) {
          //console.log('No such document!');
          this.isValidDomainemailId=false;

            //console.log(domain+"Set Domain");
        } else {
          this.isValidDomainemailId=true;
          //console.log(domain+"Set Null");
        }
      })
        .catch(err => {
          console.log('Error getting document', err);
        });  



          /*if (domain!=null && domain != '' && (domain.toLowerCase() == domainName1.toLowerCase() || domain.toLowerCase() == domainName2.toLowerCase() || domain.toLowerCase() == domainName3.toLowerCase() || domain.toLowerCase() == domainName4.toLowerCase() || domain.toLowerCase() == domainName5.toLowerCase())) {
            this.isValidDomainemailId=true;
            console.log(domain+"Set Null");
          }
          else if (this.loginForm.get("email").touched && domain!=null && domain != '' && (domain.toLowerCase() != domainName1.toLowerCase() || domain.toLowerCase() != domainName2.toLowerCase() || domain.toLowerCase() != domainName3.toLowerCase() || domain.toLowerCase() != domainName4.toLowerCase() || domain.toLowerCase() != domainName5.toLowerCase())) {
            this.isValidDomainemailId=false;

            console.log(domain+"Set Domain");
          }*/
         
    
    });
  }
  

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/selfAssessment']);
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/selfAssessment']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/selfAssessment']);
    })
  }

  async tryLogin(value){

    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
   
/*if(!this.isValidDomainemailId)
{

  this.isValidDomainemailIdPopup=true;
  return;
}*/

    
this.isValidDomainemailIdPopup=false;
     this.authService.doLogin(value)
    .then(res => {
      sessionStorage.setItem("userEmail",value.email);
      const citiesRef = this.firestore.collection('user_data',citiesRef=>citiesRef.where('email', '==', value.email));
    
      this.clients = citiesRef.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as FirebaseUserModel;
          data.$key = a.payload.doc.id;
         
          return data;
        })
      })

      this.clients.subscribe(data=>{

        data.forEach(obj=>{
          this.firebaseUserModel=obj;
          console.log("JSON.stringify(data)="+JSON.stringify(this.firebaseUserModel));
          sessionStorage.setItem("firebaseUserModel",JSON.stringify(this.firebaseUserModel));
        });

      });
      this.router.navigate(['/home']);
      //location.href="home";
    }, err => {
      console.log(err);
      this.isValidDomainemailIdPopup=false;
      this.isValidDomainemailIdUser=true;
      this.errorMessage = err.message;
    })
  }

  clickToClosePopup(){
      this.isValidDomainemailIdUser=false;

  }
}
