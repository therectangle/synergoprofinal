import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { UserService } from './core/user.service';
import { AuthService } from './core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  firebaseUserModel:string;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit() {
    this.firebaseUserModel=sessionStorage.getItem("firebaseUserModel");
    console.log("this.firebaseUserModel="+this.firebaseUserModel);
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

}
