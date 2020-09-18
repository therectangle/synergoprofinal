import { Component, HostListener,ViewEncapsulation, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseUserModel } from '../core/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  clients: Observable<any[]>;
  firebaseUserModel:string;
  selected :any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location, private firestore: AngularFirestore
  ) {}

@HostListener('window:scroll', [])
onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
     console.log(scrollOffset);
    if (scrollOffset >= 120) {
        document.querySelectorAll('.controllable').forEach((c) => {
            c.classList.add('scroll-header');
        });
    } else {
        document.querySelectorAll('.controllable').forEach((c) => {
            c.classList.remove('scroll-header');
        });
    }
}

navclick(){
      console.log("hiii");
       document.querySelectorAll('.main-nav').forEach((c) => {
            c.classList.toggle('open');
        });
         document.querySelectorAll('.nav-icon1').forEach((c) => {
            c.classList.toggle('open');
        });
       
       //document.querySelectorAll('.nav-icon1').add('open');
    }
    parentLi(cl){

      this.selected = cl; 
       document.querySelectorAll('.'+cl).forEach((c) => {
            c.classList.toggle('active');
        });
    }
  ngOnInit() {
console.log("Version 5.2");
    var urlCurrent=window.location.href;
    urlCurrent=urlCurrent.substring(urlCurrent.lastIndexOf("/")+1);
    if(urlCurrent!=null && urlCurrent.length>0){
    console.log("urlCurrent="+urlCurrent);
    this.selected = urlCurrent; 
    }

    document.querySelectorAll('.main-nav>ul>li').forEach((c) => {
      console.log(".main-nav>ul>li"+(c.innerHTML));
  });

    var email=sessionStorage.getItem("userEmail");
    if(email==null || email=='null' || email=='')
    {
      this.logout();
    }
    

    this.firebaseUserModel=sessionStorage.getItem("firebaseUserModel");
    if(this.firebaseUserModel=='null'){
      
      const citiesRef = this.firestore.collection('user_data',citiesRef=>citiesRef.where('email', '==',email));
    
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
    }
    console.log((this.firebaseUserModel=='null')+"this.firebaseUserModel="+this.firebaseUserModel);
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

  select(item) {

  
    this.selected = item; 
};
isActive(item) {
    return this.selected === item;
};

}
