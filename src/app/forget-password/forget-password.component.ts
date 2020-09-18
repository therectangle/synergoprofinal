import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { CustomValidators } from '../shared/custom.validators';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit {
isPaswordLinkSent:boolean;
isPaswwordNotEntered:boolean;
EmailPaswordLinkSendMsg:string;
isForgetPasswordError:boolean;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }


  submitForResetPassword(emailid)
  {
    if(emailid==null || emailid=='')
    {
      this.isPaswwordNotEntered=true;
    }
    else{

      this.authService.getafAuthObject().sendPasswordResetEmail(emailid)
      .then(() => {
        //window.alert('Password reset email sent, check your inbox.');
        this.isPaswordLinkSent=true;
        this.isPaswwordNotEntered=false;
        this.EmailPaswordLinkSendMsg=" Email with a link to reset password was sent to"+ CustomValidators.maskEmailAddress(emailid,"*");
      }).catch((error) => {
        console.log(error);
        this.isForgetPasswordError=true;
        this.EmailPaswordLinkSendMsg=""+error;
      })

    }






      
    
  }
  closeForgotPasswordOk(){
    this.isPaswwordNotEntered=false;
  }

  closeForgotPasswordEmailPaswordLinkSendMsg(){
    this.isForgetPasswordError=false;
    this.EmailPaswordLinkSendMsg="";
  }
  

}