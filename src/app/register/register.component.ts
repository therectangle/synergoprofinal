import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomValidators } from '../shared/custom.validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  user: FirebaseUserModel = new FirebaseUserModel();
  isValidDomainemailId:boolean;
  submitted = false;
  isRegisteredSuccessfully:boolean;
  isRegistrationValidationFailed: boolean;
  isRegistrationFailed:boolean;
  constructor(
    private firestore: AngularFirestore,
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }
  ngOnInit(): void {
   
    this.registerForm.valueChanges.subscribe((data) => {
      //this.registerForm.get("email").setValidators(CustomValidators.emailDomain('dell.com'));
     
        var domainName1='mindlens.com.sg';
        var domainName2='therectangle.agency';
        var domainName3='karuyaki.com';
        var domainName4='gmail.com';
        var email=this.registerForm.get("email").value;

         const domain = email.substring(email.lastIndexOf('@') + 1);


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


          /*if (domain!=null && domain != '' && (domain.toLowerCase() == domainName1.toLowerCase() || domain.toLowerCase() == domainName2.toLowerCase() || domain.toLowerCase() == domainName3.toLowerCase() || domain.toLowerCase() == domainName4.toLowerCase())) {
            this.isValidDomainemailId=true;
            console.log(domain+"Set Null");
          }
          else if (this.registerForm.get("email").touched && domain!=null && domain != '' && (domain.toLowerCase() != domainName1.toLowerCase() || domain.toLowerCase() != domainName2.toLowerCase() || domain.toLowerCase() != domainName3.toLowerCase() || domain.toLowerCase() != domainName4.toLowerCase())) {
            this.isValidDomainemailId=false;

            console.log(domain+"Set Domain");
          }*/
         
    
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

   createForm() {
     this.registerForm = this.fb.group({
      fullName: ['', Validators.required ],
       email: ['', [Validators.required]],
       password: ['',Validators.required],
       orgName: ['',Validators.required]
     });
   }

   tryFacebookLogin(){
     this.authService.doFacebookLogin()
     .then(res =>{
       this.router.navigate(['/selfAssessment']);
     }, err => console.log(err)
     )
   }

   tryTwitterLogin(){
     this.authService.doTwitterLogin()
     .then(res =>{
       this.router.navigate(['/selfAssessment']);
     }, err => console.log(err)
     )
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/selfAssessment']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid || !this.isValidDomainemailId) {
      this.isRegistrationValidationFailed=true;
        return;
    }
    this.isRegistrationValidationFailed=false;
    this.submitted = false;
    sessionStorage.setItem("userEmail",value.email);
    localStorage.setItem("fullName", value.fullName);
    localStorage.setItem("orgName", value.orgName);
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
       this.user.$key=Date.now().toString();
       this.user.name=value.fullName;
       this.user.email=value.email;
       this.user.orgName=value.orgName;
       this.user.provider="SynergyPro";
       let data = Object.assign({}, this.user);
    
    
      this.firestore.collection('user_data').add(data);
      //location.href="/login";
      this.isRegisteredSuccessfully=true;
      //this.logout();

     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
       this.isRegistrationFailed=true;
     })

     
   }

   logout() {
    sessionStorage.setItem("firebaseUserModel",null);
    this.authService.doLogout()
      .then((res) => {
        console.log("Logout From App Component");
       
        
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  isRegistrationFailedPopupClose()
  {
    this.isRegistrationFailed=false;
  }

}
