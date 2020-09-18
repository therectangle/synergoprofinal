import { Component, OnInit } from '@angular/core';
import { Subscribed } from '../shared/subscribed.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscriptionEmail: string = "";
  isPaswordLinkSent: boolean;
  isDanger: boolean;
  isEmailAlreadySubscribed:boolean;
  validationPopupDisplay:string="";
  subscribed: Subscribed = new Subscribed();
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    //this.isPaswordLinkSent=true;
  }
  hide() {
    this.isPaswordLinkSent = false;
  }
  hideDanger() {
    this.isDanger = false;
  }

  submitForSubscribe() {
    console.log(this.subscriptionEmail);




    if (this.subscriptionEmail != '') {
      const subscriptionEmailRef = this.firestore.collection('user_data', citiesRef => citiesRef.where('email', '==', this.subscriptionEmail));
      var getDoc = subscriptionEmailRef.get().toPromise().then(doc => {
        if (doc.size <= 0) {
          console.log('No such document!');
          console.log(subscriptionEmailRef);
          this.subscribed.email = this.subscriptionEmail;
          this.subscribed.sendDate = new Date();
          let data = Object.assign({}, this.subscribed);
          this.firestore.collection('subscribtion-emails').add(data);
          //alert("Your Email has been Subscribed With Us");
          this.isPaswordLinkSent = true;
          this.isEmailAlreadySubscribed=false;
        } else {
          console.log('Document data:', doc.docs);
          this.isEmailAlreadySubscribed=true;
          this.isPaswordLinkSent = false;
        }
      })
        .catch(err => {
          console.log('Error getting document', err);
        });





    } else {
      console.log("hiii1111111");
      this.isDanger = true;
    }


  }

  hideIsEmailAlreadySubscribed(){
    this.isEmailAlreadySubscribed=false;
  }

}
